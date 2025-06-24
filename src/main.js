import './assets/main.css'
// import "vue-toastification/dist/index.css";
// import { Toaster, toast } from "@steveyuowo/vue-hot-toast";
// import "@steveyuowo/vue-hot-toast/vue-hot-toast.css";
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
// import Toast from "vue-toastification";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createNotivue } from 'notivue'

import 'notivue/notification.css' // Only needed if using built-in notifications
import 'notivue/animations.css'

const notivue = createNotivue({
  position: "bottom-right",
  limit: 1,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 3000,
    },
  },
})
import FloatingVue from 'floating-vue';
import "floating-vue/dist/style.css";
import '@fortawesome/fontawesome-free/css/all.css'

// Verifica se a URL contém o parâmetro ?clearStorage=true
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('clearStorage') && urlParams.get('clearStorage') === 'true') {
  console.log('Clear storage parameter detected. Clearing localStorage...');
  localStorage.clear();
}

const app = createApp(App)

app.use(router)
// app.use(Toast)
// app.use(Toaster)
// app.use(toast)
app.use(notivue);
app.use(VueSweetalert2);
app.use(FloatingVue)
app.mount('#app')