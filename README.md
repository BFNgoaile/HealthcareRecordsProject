# Healthcare Records Project
The mobile application was developed using Ionic Framework, a mobile development framework that uses HTML, CSS, Javascript and Cordova/Capacitor to power mobile apps. Google Firebase (AngularFire, AngularFire Auth & AngularFire Store) was used as the Database and to manage the Authentication. 

Folder Structure
The main functionality of the application can be found in the App folder located at HealthcareRecordsProject/src/app. The folders inside the App folder are structured as follows:
Auth: All authentication logic is stored in this folder
Pages: All pages that are accessed in a logged in state can be found in this folder
Services: All data and state management is stored in the services folder. This approach has been selected to have one separate point of managing the data and state. This helps us focus only on views on the actual pages
