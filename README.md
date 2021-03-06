﻿# Weather Excercise App

A weather application built using Apache Cordova, Ionic Framework, and AngularJS Framework. Currently supporting Android.

## Important!
To learn more about Tools for Apache Cordova with Visual Studio, visit this [link](https://taco.visualstudio.com/).

## Table of Contents
 - [Requirements](#requirements)
 - [Getting Started](#getting-started)
 - [File Structure of App](#file-structure-of-app)

## Requirements
1. node.js
2. Cordova and Ionic - npm install cordova ionic
3. TypeScript - npm install typescript
4. Gulp - npm install gulp
5. Bower - npm install bower

## Getting Started

With VS Code:
* Clone this repository.
* Run `npm install` from the project root.
* Run `bower install` from the project root.
* Add android / iOS / windows platform to your project by running `ionic platform add <platform name>` in a terminal from your project root.
* Build the project by running gulp tsc and then `ionic build <platform name>`
* Deploy to device or emulator by running `ionic run <platform name>` or `ionic emulate <platform name>`
* Success

** Note: To improve your Cordova development workflow, install [VS Code Cordova extension](https://marketplace.visualstudio.com/items?itemName=vsmobile.cordova-tools). 
* Launch the VS Code Command Palette – (Ctrl+Shift+P on Windows, Cmd+Shift+P on Mac) – and type the following command and hit Enter: 
> ext install cordova-tools

With Visual Studio:
* Clone this repository.
* Open the WeatherApp.sln in Visual Studio.
* Open Task Runner window by pressing Ctrl+Alt+Bkspce. 
** Note: It is important that the task runner window be open in VS while building the project. You can also use "gulp watch" task to enable live reload in browser based debugging scenarios.    
* Install npm packages by going to your Solution Explorer -> Dependencies -> npm and clicking on 'Restore Packages'. 
* Once packages are restored, build the project and deploy it on Ripple or an android emulator.  
* Success


## File Structure of App

```
WeatherAppExercise/
├── README.md/                                 * This File
├── gitignore/                                 * git ignore file
├── WeatherApp/                                * Weather App folder
	├── WeatherApp.sln/                        * Visual studio project solution
	├── WeatherApp/                            * root of main project
		│
		├── hooks/                             * Cordova Hooks
		│
		├── node_modules/                      * Node dependencies
		|
		├── platforms/                         * Cordova generated native platform code
		|
		├── plugins/                           * Cordova native plugins go
		|
		├── scss/                              * ionic scss style sheet
		|
		├── resources/                         * Images for splash screens and icons
		|
		├── www/                               * Folder that contains the code that runs
		│   │   
		│   ├── js/                            * Main JS files folder
		│   │    └── app.js					   * Main AngularJS entry point
		│   ├── directives/                    * Holds the controllers and HTML templates
		│   │    └── controllers			   * AngularJS controllers
		│   │    └── partials			       * HTML directive templates 
		│   ├── css/                           * Compiled CSS
		│   │
		│   ├── img/                           * App images
		│   │
		│   ├── lib/                           * Dependencies from bower install 
		│   │
		│   └── index.html                     * Main entry point
		|
		├── .editorconfig                      * Defines coding styles between editors
		├── config.xml                         * Cordova configuration file
		├── gulpfile.js                        * Contains gulp tasks for compiling ts files, scss files and more..
		├── ionic.config.json                  * Ionic configuration file
		├── package.json                       * Javascript dependencies
		├── bower.json                         * Javascript dependencies
		├── taco.json                          * Tools for Apache Cordova configuration file
		├── WeatherApp.jsproj        
		├── WeatherApp.jsproj.user     
```

