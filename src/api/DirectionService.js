
import axiosInstance from '@/config/http.config'


const baseURLv1 = process.env.VUE_APP_URL_BASE_BACKEND;




  export function createDirectionApi(payload) {
    return axiosInstance.post(`${baseURLv1}/direcciones`, payload);
  }


   export function allDirectionApi() {
    return axiosInstance.get(`${baseURLv1}/direcciones`);
  }


   export function updateDirectionApi(payload, id) {
    return axiosInstance.put(`${baseURLv1}/direcciones/${id}`, payload);
  }


     export function listByDirectionApi(id) {
    return axiosInstance.get(`${baseURLv1}/direcciones/usuario/${id}`);
  }


  

  