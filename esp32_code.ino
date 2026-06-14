/*
  EnerNova Solar Panel Cleaning System - ESP32 Code
  Connects to: https://ais-dev-gah4mskldpmoup4bwr53gs-207677546615.asia-southeast1.run.app
  
  Hardware:
  - ESP32
  - BH1750 (I2C: SDA=21, SCL=22)
  - Voltage Sensor (Analog Pin 34)
  - DC Motor Driver (PWM Pin 25, Dir Pin 26)
*/

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <BH1750.h>

// WiFi Credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Server URL
const char* serverUrl = "https://ais-dev-gah4mskldpmoup4bwr53gs-207677546615.asia-southeast1.run.app";

// Pins
const int voltagePin = 34;
const int motorPwmPin = 25;
const int motorDirPin = 26;

BH1750 lightMeter;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  
  if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
    Serial.println(F("BH1750 initialized"));
  } else {
    Serial.println(F("Error initializing BH1750"));
  }

  pinMode(motorPwmPin, OUTPUT);
  pinMode(motorDirPin, OUTPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // 1. Read Sensors
    float lux = lightMeter.readLightLevel();
    int rawVolt = analogRead(voltagePin);
    float voltage = (rawVolt * 3.3 / 4095.0) * 5.0; // Adjust multiplier based on your voltage divider

    Serial.printf("Lux: %.2f, Voltage: %.2fV\n", lux, voltage);

    // 2. Send Data to Server
    sendSensorData(lux, voltage);

    // 3. Get Command from Server
    checkCommands();
  }
  delay(5000); // Wait 5 seconds
}

void sendSensorData(float lux, float voltage) {
  HTTPClient http;
  String url = String(serverUrl) + "/api/sensors/data";
  http.begin(url);
  http.addHeader("Content-Type", "application/json");

  StaticJsonDocument<200> doc;
  doc["lux"] = lux;
  doc["voltage"] = voltage;
  String json;
  serializeJson(doc, json);

  int httpResponseCode = http.POST(json);
  if (httpResponseCode > 0) {
    Serial.println("Data sent successfully");
  } else {
    Serial.print("Error sending data: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}

void checkCommands() {
  HTTPClient http;
  String url = String(serverUrl) + "/api/sensors/command";
  http.begin(url);

  int httpResponseCode = http.GET();
  if (httpResponseCode == 200) {
    String payload = http.getString();
    StaticJsonDocument<200> doc;
    deserializeJson(doc, payload);
    const char* command = doc["command"]; // "start" or "stop"

    if (String(command) == "start") {
      startCleaning();
    } else {
      stopCleaning();
    }
  }
  http.end();
}

void startCleaning() {
  Serial.println("Action: START CLEANING");
  digitalWrite(motorDirPin, HIGH);
  analogWrite(motorPwmPin, 200); // Adjust speed
}

void stopCleaning() {
  Serial.println("Action: STOP CLEANING");
  analogWrite(motorPwmPin, 0);
}
