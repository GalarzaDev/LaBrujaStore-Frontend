

import axiosInstance from '@/config/http.config'


const baseURLv1 = process.env.VUE_APP_URL_BASE_BACKEND;




export function createShoppingApi(payload) {
    return axiosInstance.post(`${baseURLv1}/compras`, payload);
}


export function createDetailShoppingApi(payload) {
    return axiosInstance.post(`${baseURLv1}/detalles-compra`, payload);
}

export function listUserShoppingApi(id) {
    return axiosInstance.get(`${baseURLv1}/compras/usuario/${id}`);
}