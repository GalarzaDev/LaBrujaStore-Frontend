

import axiosInstance from '@/config/http.config'


const baseURLv1 = process.env.VUE_APP_URL_BASE_BACKEND;




export function listCategoryApi(token ) {
    return axiosInstance.get(`${baseURLv1}/productos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }