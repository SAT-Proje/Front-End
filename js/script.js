const hearts = document.querySelectorAll('.fa-heart');

for (let i=0; i<hearts.length; i++) {
    hearts[i].addEventListener('mouseover',() => {
        let classValue = hearts[i].className;
        classValue = classValue.replace(new RegExp("fa-regular", "g"), "");
        classValue += " fa-solid";
        hearts[i].className = classValue;
    });
    hearts[i].addEventListener('mouseout',() => {
        let classValue = hearts[i].className;
        classValue = classValue.replace(new RegExp("fa-solid", "g"), "");
        classValue += " fa-regular";
        hearts[i].className = classValue;
    });
}

function submitLoginForm(e){
    e.preventDefault();
    alert("Form submitted successfully!");
    mail = document.getElementById("login-email").value;
    password = document.getElementById("login-password").value;

    handleLogin(mail, password);

}

function submitRegisterForm(e){
    e.preventDefault();
    alert("Form submitted successfully!");
    mail = document.getElementById("register-email").value;
    username = document.getElementById("register-username").value;
    password = document.getElementById("register-password").value;

    handleRegister(mail, username, password);

}

handleLogin = (mail, password) => {
    console.log("Login: " + mail + " " + password);
}

handleRegister = (mail, username, password) => {
    console.log("Register: " + mail + " " + username + " " + password);
}

