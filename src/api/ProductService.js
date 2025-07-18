
import axiosInstance from '@/config/http.config'


const baseURLv1 = process.env.VUE_APP_URL_BASE_BACKEND;




export function listProductApi( ) {
    return axiosInstance.get(`${baseURLv1}/productos/activos`);
  }

  export function createProductApi(formdata) {
    return axiosInstance.post(`${baseURLv1}/productos`, formdata);
  }

   export function updateProductApi(formdata, id) {
    return axiosInstance.put(`${baseURLv1}/productos/${id}`, formdata);
  }


     export function listByProductApi(formdata, id) {
    return axiosInstance.get(`${baseURLv1}/productos/${id}`, formdata);
  }


  

  