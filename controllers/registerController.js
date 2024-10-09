import { fetchData } from "../models/registerModel.js";

const form = document.querySelector('.form-register');

function prepareRequestInfo(method, json=true) {
  let requestInfo = {
    method: method,
  }
  let formData = new FormData(form);
  if (json) {
    formData = JSON.stringify(Object.fromEntries(formData.entries()));
    requestInfo['headers'] = {'Content-Type': 'application/json'}
  }
  requestInfo['body'] = formData;

  return requestInfo;
}

async function sendData(requestInfo) {
  try {
    const {response, result} = await fetchData(requestInfo);

    if (!response.ok) {
      const error = {
        'msg': result.Message || 'Error',
        'errors': result.Errors || [],
      };

      throw error

    } else {
      localStorage.setItem('mail', form.Email.value);
      localStorage.setItem('previousPage', 'register')
      location.replace('verify-email.html');
    }
  } catch (error) {
    const errorMsg = document.querySelector(".error");
    errorMsg.innerHTML = '';

    if (error.msg) {
      const errorHead = document.createElement('p');
      errorHead.append(error.msg);
      errorMsg.appendChild(errorHead)
    }

    if (error.errors.length > 0) {
      for (let err of error.errors) {
        const reason = document.createElement('p')
        reason.append(err);
        errorMsg.appendChild(reason);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const requestInfo = prepareRequestInfo('POST');
    sendData(requestInfo);
  });

  // Show Password
  const togglePassword = document.querySelectorAll("img[alt^=toggle]");
  togglePassword.forEach((field) => {
    field.addEventListener('click', () => {
      const passField = field.previousElementSibling;
      const type = passField.getAttribute('type') === 'password' ? 'text' : 'password';
      passField.setAttribute('type', type);
      
    })
  })

});