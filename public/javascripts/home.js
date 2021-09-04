document.addEventListener("DOMContentLoaded", () => {
    const levels = document.querySelectorAll(".levels div");
    var loginmodal = document.querySelector(".login-modal");
    var pleaseloginmodal = document.querySelector(".please-login");
    var pl_close = document.querySelector(".pl-div button");
    const payload = sessionStorage.getItem("payload");
    var loginbtn = document.querySelector(".login-icon");
    var username_fi = document.querySelector(".user-name");
    if (payload) {
        const payload_obj = JSON.parse(payload);
        loginbtn.style.display = "none";
        username_fi.style.display = "block";
        username_fi.innerHTML =
            payload_obj.customFieldInputValues["username(5-9 character)"];
    }
    var config = {
        // should be same as the id of the container created on 3rd step
        containerID: "sawo-container",
        // can be one of 'email' or 'phone_number_sms'
        identifierType: "email",
        // Add the API key copied from 2nd step
        apiKey: "63ba166e-bfa4-4ef8-a067-96de2b47ed45",
        // Add a callback here to handle the payload sent by sdk
        onSuccess: (payload) => {
            // Storing the payload in sessionStorage
            console.log(payload);
            loginmodal.style.display = "none";
            loginbtn.style.display = "none";
            username_fi.style.display = "block";
            username_fi.innerHTML =
                payload.customFieldInputValues["username(5-9 character)"];
            sessionStorage.setItem("payload", JSON.stringify(payload));
            // Redirecting to "/success"
        },
    };
    var sawo = new Sawo(config);
    sawo.showForm();
    loginbtn.addEventListener("click", () => {
        loginmodal.style.display = "flex";
    });

    loginmodal.style.display = "none";
    for (let i = 0; i < levels.length; i++) {
        const level = levels[i];

        if (!payload) {
            level.addEventListener("click", () => {
                pleaseloginmodal.style.display = "flex";
            });
        }
    }

    pl_close.addEventListener("click", () => {
        pleaseloginmodal.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target == loginmodal) {
            loginmodal.style.display = "none";
        } else if (event.target == pleaseloginmodal) {
            pleaseloginmodal.style.display = "none";
        }
    };
});