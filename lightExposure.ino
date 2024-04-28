#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

const int lightSensorPin = A6; // Connect your light sensor to A6
unsigned long startTime = 0;
unsigned long exposureTime = 0;
bool isExposing = false;
const int lightThreshold = 20;

void setup() {
  Serial.begin(9600);
  pinMode(lightSensorPin, INPUT);

  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Check the address of your display
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }

  display.display();

  // Clear the buffer
  display.clearDisplay();
  display.setTextSize(1); // Normal 1:1 pixel scale
  display.setTextColor(SSD1306_WHITE); // Draw white text
  display.setCursor(0,0); // Start at top-left corner
  display.print("Light Exposure:");
  display.display();
}

void loop() {
  int sensorValue = analogRead(lightSensorPin);

  if (sensorValue > lightThreshold) {
    if (!isExposing) {
      startTime = millis();
      isExposing = true;
    }
  } else {
    if (isExposing) {
      exposureTime += millis() - startTime;
      isExposing = false;
    }
  }

  // Convert exposure time from milliseconds to minutes
  float exposureTimeInMinutes = exposureTime / 60000.0;

  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("Light Exposure:");
  display.print(sensorValue);
  display.setCursor(0, 10);
  display.print("Exposure Time: ");
  display.print(exposureTimeInMinutes);
  display.print(" minutes");
  display.display();

  delay(1000);
}
