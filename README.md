# DDD Workshop notes for NodeBots Session

This repository contains helpful information for installation and code
examples for the NodeBots session. Note that in the session whilst we'll be working
with some servos and some LEDs, we unfortunately won't be able to build full
bots due to the time. 

## Objective

The objective of this session is to achieve the following:

* Develop an understanding of the nodebots / johnny-five hardware stack.
* Have a dev environment fully capable of running that stack.
* Develop a network enabled device that can interact with a web service and
actuate back into the real world.

## Equipment

If you want to bring your own equipment then that is fine but we will have
kits available. To follow the examples you'll need to have:

* Arduino Uno or Nano.
* LM355 or LM35 temperature sensor.
* breadboard and jumper wires.
* Standard Servo.
* RGB and some standard LEDs.

## Installation

Before the session ensure you install the following:

* [Arduino IDE](http://arduino.cc)
* [NodeJS](http://nodejs.org)

Clone this repo and install node dependencies:

```
git clone git@github.com:ajfisher/dddworkshop.git && cd dddworkshop
npm install
```

If you're on Mac or Windows, you'll need to install the drivers for the arduino
board. [They are in the drivers folder](/drivers).

If you're on Linux, you don't need to do anything - the kernel drivers are already
there if you're using any kernal from the last several years.

## Repo layout

In this repository are several examples that compliment the workshop. There are 
three major areas:

* Hello, Hardware World
* Information Radiators
* Physical Sensors

Each of these folders contains sections underneath them specific to the 
example being used as illustrated below;

```
|--- 1_hello_world
|  
|--- 2_info_radiator
|  |--- twitter
|  |--- gmail
|  |--- weather
|  |--- offline
|
|--- 3_sensors
|  |--- temperature
|  |--- light
```

Within each example is a `README` file which will contain the steps you need
to follow to replicate the example including the circuit diagram. From there
you can then run the appropriate example code as indicated in the `README`

## Going further

* Get more API details about [johnny five](http://johnny-five.io)
* Discover more about electronics via [Node ARDX](http://node-ardx.org)
* If you got a Scientist Kit (the big one) [there is a dedicated repo](http://github.com/nodebotsau/scientist-kit)
* Sign up to [NodeBots Nights](http://www.meetup.com/Melbourne-NodeBots-Nights/)


