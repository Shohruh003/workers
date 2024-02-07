import axios from 'axios';
const api = axios.create({
    baseURL: 'http://workers-back.tadi.uz/api',
  });
  
  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3NzM0MzQ2LCJpYXQiOjE3MDczMDIzNDYsImp0aSI6ImE1M2RiNWI1MGY0ZDRjYzliMDg0NTBhOTBiMmI0MzQ3IiwidXNlcl9pZCI6MX0.CF7UJIChB2TrNH-r2tiU3vyp5Wa5ddstsfSe8Yg07ug`;

      return config;
    },
    async (error) => {
          return Promise.reject(error);
        }
  )
// const api = axios.create({
//   baseURL: 'https://mycorse.onrender.com/http://workers-back.tadi.uz/api',
// });

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
