import axios from 'axios'
import { useAuthStore } from './stores/auth'
import router from './router'

axios.defaults.baseURL = 'http://159.89.224.148'

axios.interceptors.request.use(config => {
    const authStore = useAuthStore()
    if (authStore.token) {
        config.headers['Authorization'] = `Bearer ${authStore.token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response && error.response.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
    }
    return Promise.reject(error)
})

export default axios
