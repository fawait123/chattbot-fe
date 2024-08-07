import axios from "axios";
import Cookie from 'cookiejs'



// export const baseURL = "http://127.0.0.1:3000"
export const baseURL = "https://api.teledentpregnancy.com"
const doRequest = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + Cookie.get('token')
    }
})

// Add a request interceptor
doRequest.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
doRequest.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if (error.response && error.response.status == 401) {
        Cookie.remove('token')
        Cookie.remove('user')
        window.location.href = "/login"
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default doRequest