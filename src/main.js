import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import config from './utils/config'
import './assets/css/icon.css'
const app = createApp(App)
installElementPlus(app)
app
    .use(config)
    .use(store)
    .use(router)
    .mount('#app')