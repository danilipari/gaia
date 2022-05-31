import {createApp} from 'vue';
import Toast, { PluginOptions } from "vue-toastification";
import App from "./App.vue";
import store from './store/index';
import router from './router/index';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faUser, faFlag } from "@fortawesome/free-solid-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { GlobalCmComponent } from "codemirror-editor-vue3";
import JsonCSV from 'vue-json-csv';


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

library.add(faPhone, faUser, faFlag, fas, fab, far);

const optionsAlert = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

const optionsToast: PluginOptions = {
  transition: "Vue-Toastification__slideBlurred",
  maxToasts: 25,
  newestOnTop: true,
  timeout: 2500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
};

import "vue-toastification/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);

/* PLUGINS */
import _ from 'lodash';

app.component('downloadCsv', JsonCSV)

app.config.globalProperties.$store = store

app.use(_);
app.use(store);
app.use(GlobalCmComponent);
app.use(VueSweetalert2, optionsAlert);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(Toast, optionsToast);
app.use(router);
app.mount("#app");

