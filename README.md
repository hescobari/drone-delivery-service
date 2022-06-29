# Coding Challenge - Drone Delivery Service
This is simple a node-js app to assign deliveries trips to an squad of drones.

## Summary
### Algorithm
This solution is based in assign from bigger to smaller delivery weights using all available drones, giving priority to the bigger drones by each trip.

### Approach
This solution give priority to the bigger drones to make deliveries because bigger drones can to load more articles in only one trip.  
The smaller drones are used with a low priority but they are used.

## Requirements
### Text Editor
To open/execute the source code and run it use the following text editor:
[Visual Studio](https://code.visualstudio.com/)
### Node JS
To run this app is necessary to have [node-js](https://nodejs.org/es/download/) installed.

## Installation
To install this app please execute the following command from the root folder:
```
npm install
```
## Configuration
This app reads the input files from the **examples** folder located in the root folder of this app. Please put your input files in this folder.  
The following is an input file format example:

```
[DroneA], [1750], [DroneB], [2000], [DroneC], [900]
[LocationA], [600]
[LocationB], [550]
[LocationC], [570]
[LocationD], [750]
[LocationE], [1000]
[LocationF], [230]
[LocationG], [250]
[LocationH], [280]
[LocationI], [370]
[LocationJ], [450]
[LocationK], [530]
[LocationL], [620]
[LocationM], [750]
[LocationN], [830]
[LocationO], [920]
[LocationP], [1090]
[LocationQ], [620]
[LocationR], [710]
[LocationS], [830]
[LocationT], [200]
[LocationU], [1010]
[LocationV], [620]
[LocationW], [750]
[LocationX], [830]
[LocationY], [920]
[LocationZ], [1090]
```
## Run App
Run this app with the following command:
```
node index.js
```