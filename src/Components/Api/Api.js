import axios from 'axios';

const api = axios.create({
  baseURL: 'http://workers-back.tadi.uz/api',
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token === undefined) {
//       const refreshToken = localStorage.getItem('refreshToken');
//       axios.post('https://smartsafeschoolback.tadi.uz/api/users/token/refresh/', {
//           'refresh': refreshToken
//         })
//       .then((result) => {
//         const { token } = result.data.access;

//         localStorage.setItem('token', token);

//         config.headers.Authorization = `Bearer ${token}`;
//       }).catch((error) => {
//         localStorage.clear()
// 		window.location.reload()
//         console.log(error);
//       });
//     } else {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   async (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem('refreshToken');
//       axios.post('https://smartsafeschoolback.tadi.uz/api/users/token/refresh/', {
//           'refresh': refreshToken
//         })
//       .then((result) => {
//         const { token } = result.data.access;

//         localStorage.setItem('token', token);
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return api(originalRequest);

//       }).catch((error) => {
//         localStorage.clear()
// 		window.location.reload()
//         console.log(error);
//       });
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
