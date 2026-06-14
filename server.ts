import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("enernova.db");
console.log("Database connected: enernova.db");

// Initialize database
try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      roof_type TEXT,
      energy_usage TEXT,
      location TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS sensor_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lux REAL,
      voltage REAL,
      cleaning_status TEXT DEFAULT 'idle',
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Insert default admin if not exists (password: admin123)
    INSERT OR IGNORE INTO admin_users (username, password) VALUES ('admin', 'admin123');
  `);
  console.log("Database tables initialized");
} catch (err) {
  console.error("Database initialization failed:", err);
}

// Migration: Add customer_id to applications if it doesn't exist
try {
  db.exec("ALTER TABLE applications ADD COLUMN customer_id TEXT UNIQUE");
  console.log("Migration: customer_id column added/verified");
} catch (error) {
  // Column likely already exists
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Simple Auth Middleware
  const authenticateAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization;
    if (token === "mock-jwt-token") {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized access" });
    }
  };

  // API Routes
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    try {
      const user = db.prepare("SELECT * FROM admin_users WHERE username = ? AND password = ?").get(username, password);
      if (user) {
        res.json({ success: true, token: "mock-jwt-token" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Customer Portal Verification
  app.post("/api/portal/login", (req, res) => {
    const { customerId } = req.body;
    try {
      const app = db.prepare("SELECT * FROM applications WHERE customer_id = ?").get(customerId);
      if (app) {
        res.json({ success: true, application: app });
      } else {
        res.status(404).json({ error: "Invalid Customer ID" });
      }
    } catch (error) {
      res.status(500).json({ error: "Verification failed" });
    }
  });

  // Generic Settings (Backend Local Storage)
  app.get("/api/settings/:key", (req, res) => {
    try {
      const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(req.params.key) as { value: string };
      res.json({ value: row ? JSON.parse(row.value) : null });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch setting" });
    }
  });

  app.post("/api/settings", authenticateAdmin, (req, res) => {
    const { key, value } = req.body;
    try {
      db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(key, JSON.stringify(value));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save setting" });
    }
  });

  app.post("/api/applications", (req, res) => {
    const { name, email, phone, roofType, energyUsage, location } = req.body;
    try {
      const stmt = db.prepare(
        "INSERT INTO applications (name, email, phone, roof_type, energy_usage, location) VALUES (?, ?, ?, ?, ?, ?)"
      );
      const result = stmt.run(name, email, phone, roofType, energyUsage, location);
      res.json({ id: result.lastInsertRowid, success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit application" });
    }
  });

  app.get("/api/admin/stats", authenticateAdmin, (req, res) => {
    try {
      const totalApps = db.prepare("SELECT COUNT(*) as count FROM applications").get() as { count: number };
      const pendingApps = db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'pending'").get() as { count: number };
      const totalEnquiries = db.prepare("SELECT COUNT(*) as count FROM enquiries").get() as { count: number };
      
      res.json({
        totalApplications: totalApps.count,
        pendingApplications: pendingApps.count,
        totalEnquiries: totalEnquiries.count,
        recentActivity: [
          { label: "New Application", value: totalApps.count },
          { label: "Pending Review", value: pendingApps.count }
        ]
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/admin/applications", authenticateAdmin, (req, res) => {
    try {
      const apps = db.prepare("SELECT * FROM applications ORDER BY created_at DESC").all();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.patch("/api/admin/applications/:id", authenticateAdmin, (req, res) => {
    const { status, customerId } = req.body;
    const { id } = req.params;
    try {
      if (status && customerId) {
        db.prepare("UPDATE applications SET status = ?, customer_id = ? WHERE id = ?").run(status, customerId, id);
      } else if (status) {
        db.prepare("UPDATE applications SET status = ? WHERE id = ?").run(status, id);
      } else if (customerId) {
        db.prepare("UPDATE applications SET customer_id = ? WHERE id = ?").run(customerId, id);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update application" });
    }
  });

  app.delete("/api/admin/applications/:id", authenticateAdmin, (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM applications WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete application" });
    }
  });

  // ESP32 Integration Endpoints
  app.post("/api/sensors/data", (req, res) => {
    const { lux, voltage } = req.body;
    try {
      // Automatic cleaning logic: High Lux (>5000) and Low Voltage (<12)
      let cleaningStatus = 'idle';
      if (lux > 5000 && voltage < 12) {
        cleaningStatus = 'cleaning';
      }

      const stmt = db.prepare("INSERT INTO sensor_data (lux, voltage, cleaning_status) VALUES (?, ?, ?)");
      stmt.run(lux, voltage, cleaningStatus);
      res.json({ success: true, cleaningStatus });
    } catch (error) {
      res.status(500).json({ error: "Failed to save sensor data" });
    }
  });

  app.get("/api/sensors/latest", (req, res) => {
    try {
      const data = db.prepare("SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1").get();
      res.json(data || { lux: 0, voltage: 0, cleaning_status: 'idle' });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest sensor data" });
    }
  });

  app.post("/api/sensors/command", authenticateAdmin, (req, res) => {
    const { command } = req.body; // 'start_cleaning' or 'stop_cleaning'
    try {
      const latest = db.prepare("SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1").get() as any;
      const status = command === 'start_cleaning' ? 'cleaning' : 'idle';
      db.prepare("INSERT INTO sensor_data (lux, voltage, cleaning_status) VALUES (?, ?, ?)")
        .run(latest?.lux || 0, latest?.voltage || 0, status);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to send command" });
    }
  });

  app.get("/api/sensors/command", (req, res) => {
    try {
      const data = db.prepare("SELECT cleaning_status FROM sensor_data ORDER BY timestamp DESC LIMIT 1").get() as any;
      res.json({ command: data?.cleaning_status === 'cleaning' ? 'start' : 'stop' });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch command" });
    }
  });

  app.post("/api/enquiries", (req, res) => {
    const { name, email, message } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO enquiries (name, email, message) VALUES (?, ?, ?)");
      stmt.run(name, email, message);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit enquiry" });
    }
  });

  // Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error("Vite server creation failed:", e);
    }
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EnerNova Server running on http://localhost:${PORT}`);
  });
}

startServer();
