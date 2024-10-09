import { fetchData } from "../models/resetPassModel.js";

const passReset = document.querySelector('.form-reset');

async function resetPass(event) {
  try {
    event.preventDefault();
    const resetBody = new FormData();
    resetBody.append('Email', localStorage.getItem('mail'));
    resetBody.append('Code', localStorage.getItem('code'));
    resetBody.append('NewPassword', event.target.Password.value);
    document.querySelector(".error").innerHTML = '';

    if (event.target.Password.value !== event.target.ConfirmPassword.value) {
      document.querySelector(".error").innerHTML = `<p>Password Not Confirmed</p>`
      return;
    }

    const requestInfo = {
      method: "POST",
      body: resetBody
    }

    const {response, result} = await fetchData(requestInfo);

    if (!response.ok) {
      const error = {
        'msg': result.Message,
        'errors': result.Errors,
      }
      throw error;
    } else {
      const successMsg = document.querySelector(".success");
      successMsg.innerHTML = '';
      if (result.Message) {
        const successHead = document.createElement('p');
        successHead.append(result.Message);
        successMsg.appendChild(successHead);
      }
      setTimeout(() => {
        window.location.replace('login.html');
      }, 700);
    }
  } catch (error) {
    const errorMsg = document.querySelector(".error")
    if (error.msg) {
      const errorHead = document.createElement('p');
      errorHead.append(error.msg);
      errorMsg.appendChild(errorHead)
    }
    if (error.errors) {
      for (let err of error.errors) {
        const reason = document.createElement('p')
        reason.append(err);
        errorMsg.appendChild(reason);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  passReset.addEventListener('submit', resetPass);

  // Show Password
  const togglePassword = document.querySelectorAll("img[alt^=toggle]");
  console.log(togglePassword);
  togglePassword.forEach((field) => {
    console.log(togglePassword);
    field.addEventListener('click', () => {
      const passField = field.previousElementSibling;
      const type = passField.getAttribute('type') === 'password' ? 'text' : 'password';
      passField.setAttribute('type', type);
      
    })
  })
})