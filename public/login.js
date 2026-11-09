const token = localStorage.getItem('token');

if (token) {
  window.location.replace('index.html');
}

const formDOM = document.querySelector('.form');
const formSubmitBtn = formDOM.querySelector('.btn');
const formErrorDOM = formDOM.nextElementSibling;

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  formErrorDOM.textContent = '';
  formSubmitBtn.disabled = true;
  const formData = new FormData(e.currentTarget);
  const values = Object.fromEntries(formData.entries());
  try {
    const { data } = await axios.post('/api/v1/auth/login', values);
    localStorage.setItem('token', data.token);
    window.location.replace('index.html');
  } catch (error) {
    formErrorDOM.textContent = error.response.data.message;
  }
  formSubmitBtn.disabled = false;
});
