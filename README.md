# Healthcare Records Project
The mobile application was developed using Ionic Framework, a mobile development framework that uses HTML, CSS, Javascript and Cordova/Capacitor to power mobile apps. Google Firebase (AngularFire, AngularFire Auth & AngularFire Store) was used as the Database and to manage the Authentication.

Running the project<br>
Open the project in Terminal and run 'npm install'. This command will install all required dependencies that are required to run the project. After all these are installed, run 'ng serve'

Folder Structure<br>
The main functionality of the application can be found in the App folder located at HealthcareRecordsProject/src/app. The folders inside the App folder are structured as follows:<br>
Auth: All authentication logic is stored in this folder<br>
Pages: All pages that are accessed in a logged in state can be found in this folder<br>
Services: All data and state management is stored in the services folder. This approach has been selected to have one separate point of managing the data and state. This helps us focus only on views on the actual pages<br>
Guards: Located at App/Auth/Auth.guard.ts. This file is used to check whether the user is logged in or not. This logic is then used in the routing file (app-routing.module.ts) to protect from being accessible from a logged out sate
