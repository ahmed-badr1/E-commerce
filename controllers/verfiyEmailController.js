import { fetchData } from "../models/verfiyEmailModel.js";
import fetchDataForgot from "../models/forgotPassModel.js";

const formName = document.querySelector('.verify');
const askCode = document.querySelector('.ask-code');


async function confirmEmail(event) {
  try {
    event.preventDefault();
    const mailBody = new FormData();
    mailBody.append('Email', window.localStorage.getItem("mail"));
    mailBody.append('Code', event.target.code.value);

    const requestInfo = {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: mailBody
    }

    const {response, result} = await fetchData(requestInfo);

    if (!response.ok) {
      const error = {
        'msg': result.Message || '',
        'errors': result.Errors || '',
      }
      throw error
    } else {
      const prevPage = localStorage.getItem('previousPage');
      if (prevPage === 'register') {
        window.open('index.html', '_self')
      } else if (prevPage === 'password-forgot') {
        localStorage.setItem('code', event.target.code.value)
        window.open('password-reset.html', '_self')
      }
      localStorage.removeItem('previousPage');
    }

  } catch (error) {
    const errorMsg = document.querySelector(".error");
    errorMsg.innerHTML = '';
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


// Function will excute whend Resend Code Button is Click
async function resendCode() {
  const mailBody = new FormData();
  mailBody.append('Email', window.localStorage.getItem("mail"));
  
  const requestInfo = {
    method: "POST",
    body: mailBody
  }

  const {response, result} = await fetchDataForgot(requestInfo);

  if (response.ok) {
    const successMsg = document.querySelector(".success");
    successMsg.innerHTML = '';
    if (result.Message) {
      const successHead = document.createElement('p');
      successHead.append(result.Message);
      successMsg.appendChild(successHead);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // LiFE Function To hash mail
  (
    function () {
      let mail = window.localStorage.getItem("mail");
      const place = document.querySelector(".mail-hash");
      const apperIndex = mail.split("").findIndex(ele => ele === "@");
      let mailArr = mail.split("").map(function (ele, i, arr) {
        return (i === 0 || i === (apperIndex - 1) || i === (apperIndex + 1) || i === apperIndex || (i >= arr.lastIndexOf(".") - 1)) ? ele : "*";
      })
      place.append(mailArr.join(""))
    }
  )();

  // Resend Code Event
  askCode.addEventListener('click', resendCode)

  formName.addEventListener('submit', confirmEmail)
})
