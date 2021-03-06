# surfaceScanner

ReactNative App built to allow regular people to scan 3d objects.

### Prerequisites

In order to run this project, make sure you have the following tools installed and up-to-date with the most recent available version

* [Node](https://nodejs.org/en/download/) - The server environment used
* [npm](https://www.npmjs.com/get-npm) - Package manager

### Installing
Cloning repository

```
git init
git clone https://github.com/cs394-s19/surfaceScanner.git
```

Installing required packages
```
npm install
```

Installing the Expo CLI
```
npm install -g expo-cli
```

Running the project
```
expo start
```

## Built With

* [ReactNative](https://facebook.github.io/react-native/) - The web framework used
* [Expo](https://expo.io/learn) - The toolchain used to build ReactNative apps fast

## Server

This application depends on the existence of a server somewhere to handle the back-end of requests. The code for the server can be found [here](https://github.com/cs394-s19/surface-scanner-backend). We recommend running it on a quick hosting service such as [Heroku](https://www.heroku.com). Be sure to update the address of your server in the `screens/Connection.js` file.

## Limitations and Bugs
This software is still in alpha and remains largely a proof-of-concept.
* There are inconsistencies in appearance and performance between Android and iOS devices.
* Some obscure error messages occasionally appear while using the camera.
* The sinusoidal image patterns that appear on the scanning device's screen are not exactly consistent with the patterns that should be shown for proper scanning.
* The app is not yet capable of rendering the 3D object generated by the server.
* Sliders for image adjustment are not yet functional.

## Supported Platforms
The [server](https://github.com/cs394-s19/surface-scanner-backend) requires use of Node.JS and Python. This app runs on either iOS or Android, and development should work on any platform supported by [Expo](https://expo.io/).

## Authors

* **Spencer Colton**
* **Deok Filho** 
* **John Nguyen** 
* **Chenbo Tang** 
* **Yibo Pan** 
* **Gresham Reichert** 

See also the list of [contributors](https://github.com/cs394-s19/surfaceScanner/contributors) who participated in this project.

## Acknowledgments

* Thank you to [Chris Riesbeck](https://github.com/criesbeck) for the awesome class that this has been.

