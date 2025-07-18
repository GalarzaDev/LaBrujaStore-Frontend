
import axiosInstance from '@/config/http.config'


const baseURLv1 = process.env.VUE_APP_URL_BASE_BACKEND;


   export function getPromocionCodeApi( code) {
    return axiosInstance.get(`${baseURLv1}/promociones/codigo/${code}`);
  }


  

  

  