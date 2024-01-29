import axios from "axios";
import { logout } from "../store/user/userActions";

export const setupInterceptors =(navigate,dispatch)=>{

  axios.interceptors.request.use(function (request) {
    const token = localStorage.getItem('token')
    if(token) {
      request.headers.Authorization = `Bearer ${token}`
    }

    return request
  })

  // axios.interceptors.response.use(function (response) {
  //   return response;
  // }, function (error) {
    
  //   const redirectToLoginCodes = [400,401,403]
  //   console.log(error.response.status, "vodvuuiu")
  //   if (redirectToLoginCodes.includes(error.response.status)){
  //     dispatch(logout())
  //   }
  //   return Promise.reject(error);
  // })
}

export default axios;