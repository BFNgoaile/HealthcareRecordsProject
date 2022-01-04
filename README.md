# Healthcare Records Project
The mobile application was developed using Ionic Framework, a mobile development framework that uses HTML, CSS, Javascript and Cordova/Capacitor to power mobile apps. Google Firebase (AngularFire, AngularFire Auth & AngularFire Store) was used as the Database and to manage the Authentication.

Running the project<br>
Open the project in Terminal and run 'npm install'. This command will install all required dependencies that are required to run the project. After all these are installed, run 'ng serve'

Folder Structure<br>
The main functionality of the application can be found in the App folder located at HealthcareRecordsProject/src/app. The folders inside the App folder are structured as follows:<br>
Auth: All authentication logic is stored in this folder<br>
Pages: All pages that are accessed in a logged in state can be found in this folder<br>
Services: All data and state management is stored in the services folder. This approach has been selected to have one separate point of managing the data and state. This helps us focus only on views on the actual pages<br>
Guards: Located at App/Auth/Auth.guard.ts. This file is used to check whether the user is logged in or not. This logic is then used in the routing file (app-routing.module.ts) to protect from being accessible from a logged out state<br>
Global Variables: These are the kind of information that will never change and is required globally throughout the project. This has been stored inside the environments folder (App/Environments) to store our Firebase unique credentials that allow us to connect to our Firebase instance.<br>

Page Structure<br>
An example of a page would be App/Home. This folder contains only one page within the mobile application and has six files with the following extensions<br>
home-routing.module.ts: This file is used to manage any routing that may be required to be done from this page. For example if we have a subpage that we want to go to from this page we could declare it from here<br>
home.module.ts: This file is used to declare/register any modules that are needed for use in this page. Even through recommended to declare modules inside app-module.ts globally, it is still possible to declare at page level<br>
home.page.html: This is used to present the content on the screen. This could be text, images, etc<br>
home.pages.scss: This is a SASS file that is used to style the HTML in the previous file<br>
home.page.spec.ts: This is a file used to do unit testing for the home page<br>
home.page.ts: This is where all the functional logic of the page is done
