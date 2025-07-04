
import axiosInstance from '@/config/http.config'


const baseURL= process.env.VUE_APP_BASE_SPRIN;


export function findAllPredefinedAnswers(token ) {
    return axiosInstance.get(`${baseURL}/predefined-answers/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }