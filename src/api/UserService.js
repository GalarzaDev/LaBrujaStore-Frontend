
import axiosInstance from '@/config/http.config'


const baseURLv1 = process.env.VUE_APP_URL_BASE_BACKEND;




export function loginUserApi(payload) {
  console.log('URL base:', baseURLv1);

  return axiosInstance.post(`${baseURLv1}/usuarios/login`, payload);
}


export function createUserApi(payload) {
  console.log('URL base:', baseURLv1);

  return axiosInstance.post(`${baseURLv1}/usuarios`, payload);
}