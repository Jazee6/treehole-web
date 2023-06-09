import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from "axios";
import {getToken} from "./utils/auth";
import {createDiscreteApi} from "naive-ui";
import i18n from './locale'

if (import.meta.env.VITE_API_BASE_URL) {
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

const {message, loadingBar} = createDiscreteApi(
    ['message', 'loadingBar']
)

axios.interceptors.request.use((config) => {
    loadingBar.start()
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    message.error("Request Error")
    loadingBar.error()
    return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
    const res = response.data;
    if (res.code !== 0) {
        message.error(res.message)
        loadingBar.error()
        return Promise.reject(res);
    }
    loadingBar.finish()
    return res;
}, (error) => {
    message.error(error.response.statusText)
    loadingBar.error()
    return Promise.reject(error);
});

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
