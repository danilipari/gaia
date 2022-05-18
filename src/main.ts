import {createApp} from 'vue'
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

library.add(faPhone, faUser, faFlag, fas, fab, far);

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);

/* PLUGINS */
import _ from 'lodash';

app.config.globalProperties.$store = store


app.use(_);
app.use(store);
app.use(GlobalCmComponent);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");

