int redledPin = 4;
int blueledPin = 3;
int yellowledPin = 2;
int greenledPin = 1;

void setup() {
  Serial.begin(9600); // initializes the serial port with a baud rate of 9600
  pinMode(redledPin,OUTPUT);
  pinMode(blueledPin,OUTPUT);
  pinMode(yellowledPin,OUTPUT);
  pinMode(greenledPin,OUTPUT);
}
void loop() {
  digitalWrite(redledPin, HIGH);
  delay(1000); //delay of 1 second
  digitalWrite(redledPin, LOW);
  delay(3000); //delay of 1 second
  digitalWrite(blueledPin, HIGH);
  delay(1000); //delay of 1 second
  digitalWrite(blueledPin, LOW);
  delay(3000); //delay of 1 second
  digitalWrite(yellowledPin, HIGH);
  delay(1000); //delay of 1 second
  digitalWrite(yellowledPin, LOW);
  delay(3000); //delay of 1 second
  digitalWrite(greenledPin, HIGH);
  delay(1000); //delay of 1 second
  digitalWrite(greenledPin, LOW);
  delay(3000); //delay of 1 second
}
