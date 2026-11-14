const api = axios.create({ baseURL: '/api/v1' });

api.interceptors.request.use(function (config) {
  if (config.url.startsWith('/tasks')) {
    const token = localStorage.getItem('token');
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.replace('login.html');
    }
    throw error;
  },
);

export default api;
