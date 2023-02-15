import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { basicSetup } from 'codemirror'
import VueCodemirror from 'vue-codemirror'
import Button from 'primevue/button'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Menubar from 'primevue/menubar';
import './assets/main.css'
import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.use(VueCodemirror, {
    // optional default global options
    autofocus: true,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: 'Code goes here...',
    extensions: [basicSetup]
    // ...
  })

app.component('Button', Button)
app.component('Menubar', Menubar)

app.mount('#app');
