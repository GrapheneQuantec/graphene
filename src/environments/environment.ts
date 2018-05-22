// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
  	apiKey: "AIzaSyDwdwqH9dWwtnkzQxk0d1YoD7ACnsz9eRU",
    authDomain: "graphenecompendium.firebaseapp.com",
    databaseURL: "https://graphenecompendium.firebaseio.com",
    projectId: "graphenecompendium",
    storageBucket: "graphenecompendium.appspot.com",
    messagingSenderId: "1054916327155"
  }
};
