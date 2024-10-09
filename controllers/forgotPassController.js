import { fetchData } from "../models/forgotPassModel.js";

const mailCheck = document.querySelector('.form-pass');



async function checkMail(event) {
  try {
    event.preventDefault();
    const mailBody = new FormData();
    mailBody.append('Email', event.target.Email.value);

    const requestInfo = {
      method: "POST",
      body: mailBody
    }

    const {response, result} = await fetchData(requestInfo);


    if (!response.ok) {
      const error = {
        'msg': result.Message,
        'errors': result.Errors,
      }
      throw error;
    } else {
      localStorage.setItem('mail', event.target.Email.value);
      localStorage.setItem('previousPage', 'password-forgot');
      location.replace('verify-email.html');
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
  
  mailCheck.addEventListener('submit', checkMail);
})
