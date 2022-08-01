### DESCRIPTION
This is a test app created as a requirement of [Digima Asia](https://digimasia.com/).


### DISCLAIMER
- I use Windows OS, **so the app was tested on android only (android 11) and the install/deployment will focus on using Windows and Android**. For other OS, please read the [official docs - setup][RN install].
- As per created time, the lastest release version of React Native version was 0.69.
But due to the new architecture (Fabric and Turbomodule with c++ shadow node) which introduced since 0.68 
still have some problems in Windows (path limit, ndk/agp version, hermes version),
even when I already turn off the new architecture,
so **I use version 0.67 for this project**.


### INSTALLATION
#### Prerequisites
The prerequisites software that need to be installed were:
- [NodeJS][Nodejs] minimum version 12.
- [JDK (Java Development Kit)][JDK] minimum version 11.
- Android SDK with API 30, or other Android version you want to test (the easiest way: download [Android Studio][Android Studio] and install with recommended settings).
- Android NDK version 21.4.7075529 (must exact), you can install it inside Android Studio.

#### Setting Up Windows Environment Variables
- Search `Edit the system envinronment variables` in Windows.
- Open `System Properties - Advanced - Envinronment Variables`.
- In User Variables create `New` with variable: `ANDROID_HOME` and value: `path to your Android Studio/Sdk`.
- Still in User Variables, create `New` with variable: `JAVA_HOME` and value: `path to Java/jdk`.
- Edit `path` and create `New` inside it, create this 3: with `%ANDROID_HOME%`, `%ANDROID_HOME%\platform-tools`, `%JAVA_HOME$\bin`.
- Click ok to save.

#### Create Android Studio AVD (Android Virtual Device) to use the Android Emulator 
In Android Studio, search `AVD Manager` (usually inside three dots menu), then create a new AVD with your emulator preference (or just the default one).

#### Clone Git
Open `terminal (cmd/powershell)` then type:
> git clone https://github.com/Hadipranowo/TestAppForDigimaAsia.git

#### Install NPM (Node Package Manager for Javascript) Dependencies
In root directory of cloned git, run this in `terminal`:
> npm install

If you want to know more about the setup, or using ios, please read the [official docs - setup][RN install].


### DEPLOYMENT
#### Development Mode
In root folder, make sure you already run `npm install`, after that in terminal, run command:
> npm run android

Now an emulator will run the app if you already create an AVD.

If you want to know more about the setup, or using ios, please read the [official docs - setup][RN install].

If you want to run with real device, there are more step to do, please read the [official docs - device][RN debug device].

#### Production Mode
The easiest one is to build an unsigned apk, from root project, type this command in terminal:
> cd android && .\gradlew assembleRelease && cd ..

The apk will appear in `root/android/app/build/outputs/apk/release/apk-release.apk`.

If you want to publish it to the store, read more about [publish to google play store (android)][RN android store] and [publish to apple app store (ios)][RN ios store] in the official docs.


<!-- REFERENCE LINK -->
[RN install]: https://reactnative.dev/docs/0.67/environment-setup
[RN android store]: https://reactnative.dev/docs/0.67/signed-apk-android
[RN ios store]: https://reactnative.dev/docs/0.67/publishing-to-app-store
[RN debug device]: https://reactnative.dev/docs/0.67/running-on-device
[NodeJS]: https://nodejs.org/en/
[JDK]: https://www.oracle.com/java/technologies/downloads/
[Android Studio]: https://developer.android.com/studio