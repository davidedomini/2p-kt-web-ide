import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { basicSetup } from 'codemirror'
import VueCodemirror from 'vue-codemirror'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from 'primevue/button'
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import Slider from 'primevue/slider';
import './assets/main.css'


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
app.component('InputText', InputText);
app.component('PasswordComp', Password);
app.component('Message', Message);
app.component('Slider', Slider);

app.mount('#app');
