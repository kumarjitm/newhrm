import {removeWindowClass} from '@app/utils/helpers';
import axios from 'axios';
import { Gatekeeper } from 'gatekeeper-client-sdk';
import { loginUrl } from './urls';


export const loginByAuth = async (email: string, password: string) => {
  const obj ={email,password};
  const response = await axios.post(loginUrl,obj);
    if(response.data.statusCode==1){
      const token=(response.data.data.access_token);
      const now=new Date().getTime();
      localStorage.setItem('token',token);
      localStorage.setItem("userId",response.data.data.userId);
      localStorage.setItem("expiresIn",response.data.data.expiresIn);
      localStorage.setItem("setTime",`${now}`);
      removeWindowClass('login-page');
      removeWindowClass('hold-transition');
      return (response.data)
    }
  return (response.data);
};

export const registerByAuth = async (email: string, password: string) => {
  const token = await Gatekeeper.registerByAuth(email, password);
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};

// export const loginByGoogle = async () => {
//   const token = await Gatekeeper.loginByGoogle();
//   localStorage.setItem('token', token);
//   removeWindowClass('login-page');
//   removeWindowClass('hold-transition');
//   return token;
// };

// export const registerByGoogle = async () => {
//   const token = await Gatekeeper.registerByGoogle();
//   localStorage.setItem('token', token);
//   removeWindowClass('register-page');
//   removeWindowClass('hold-transition');
//   return token;
// };

// export const loginByFacebook = async () => {
//   const token = await Gatekeeper.loginByFacebook();
//   localStorage.setItem('token', token);
//   removeWindowClass('login-page');
//   removeWindowClass('hold-transition');
//   return token;
// };

// export const registerByFacebook = async () => {
//   const token = await Gatekeeper.registerByFacebook();
//   localStorage.setItem('token', token);
//   removeWindowClass('register-page');
//   removeWindowClass('hold-transition');
//   return token;
// };
