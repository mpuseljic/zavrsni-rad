import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/storage";
import { getAuth } from "firebase/auth";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});

var firebaseConfig = {
  apiKey: "AIzaSyC-zqO4K_a2r4ITMfETsK_UxA5JVMsYpuY",
  authDomain: "ready-set-gym.firebaseapp.com",
  projectId: "ready-set-gym",
  storageBucket: "ready-set-gym.appspot.com",
  messagingSenderId: "496201983543",
  appId: "1:496201983543:web:e435248c3a912b410b01b2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let storage = firebase.storage();

const app = createApp(App);
const auth = getAuth(app);

app.use(router).use(vuetify).use(pinia).mount("#app");

export { firebase, db, storage, auth };
