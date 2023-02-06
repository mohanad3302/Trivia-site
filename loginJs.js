const users = [
    {
        UserName : "mohanad",
        Email : "mohand@gmail.com",
        password : "1234"
    },
    {
        UserName : "khaled",
        Email : "khaled@gmail.com",
        password : "1234"
    },
    {
        UserName : "nawar",
        Email : "nawar@gmail.com",
        password : "1234"
    }
]

// const fs = require("fs");
// fs.readFile("users.txt", (err, data) => {
//     if (err) throw err;
//     input = data.toString();

//     lines = input.split('\r\n');

//     for (i = 0 ; i < lines.length ; i++){
//       const user = new Object();
//       words = lines[i].split(',');
//       user.UserName = words[0];
//       user.Email= words[1];
//       user.password = words[2];
//       users.push(user);
//     }
// });


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        var username = document.getElementById("UserNameLogin").value;
        var password = document.getElementById("passwordLogin").value;
        flag = false ;
        for ( i =0 ; i < users.length ; i++){
            if (username == users[i].UserName && password == users[i].password){
                flag = true;
                break ;
            }
        }
    
        if (flag == true){
            window.location.replace("home.html");
        }
        else {
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }

    });

    signupFlag = false ;
    createAccountForm.addEventListener("submit" ,e=>{
        e.preventDefault();
        var username = document.getElementById("signupUsername").value;
        var email = document.getElementById("signupUEmailAddress").value;
        var password = document.getElementById("signupPassword").value;
        var passwordConfirm = document.getElementById("signupPasswordConfirm").value;

        if (username.length >= 10 && password.length >= 6 && passwordConfirm == password) {
            signupFlag = true
        }
        else {
            signupFlag = false ;
        }

        if (signupFlag == true){
            const user = {
                UserName : username,
                Email : email,
                password : password
            }
            users.push(user);
            createAccountForm.classList.add("form--hidden");
            loginForm.classList.remove("form--hidden");
        }
    })

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }

            if (e.target.id === "signupPassword" && e.target.value.length > 0 && e.target.value.length < 6) {
                setInputError(inputElement, "password must be at least 6 characters in length");
            }

            if ((e.target.id === "signupPasswordConfirm" && e.target.value != document.getElementById("signupPassword").value )) {
                setInputError(inputElement, "plase check passord , passwords doen't match");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

function signupValidation (){

}
