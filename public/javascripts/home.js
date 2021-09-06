document.addEventListener("DOMContentLoaded", () => {
    const levels = document.querySelectorAll(".levels div");
    var loginmodal = document.querySelector(".login-modal");
    var pleaseloginmodal = document.querySelector(".please-login");
    var pl_close = document.querySelector(".pl-div button");
    var loginbtn = document.querySelector(".login-icon");

    let token = localStorage.getItem("token");
    let username;
    var username_fi = document.querySelector(".user-name");
    if (token) {
        loginbtn.style.display = "none";
        username_fi.style.display = "block";
        fetch("/users/token", {
                method: "GET",
                headers: {
                    "x-access-token": token,
                },
            })
            .then((data) => {
                return data.json();
            })
            .then((response) => {
                console.log(response.user);
                username = response.user.username;
                username_fi.innerHTML = username;
            });
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
            let user = {
                username: payload.customFieldInputValues["username(5-9 character)"],
                user_id: payload.user_id,
                email: payload.identifier,
            };

            fetch("/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                })
                .then((res) => res.text())
                .then((data) => {
                    localStorage.setItem("token", data);
                    location.reload();
                });
        },
    };
    var sawo = new Sawo(config);
    sawo.showForm();
    loginbtn.addEventListener("click", () => {
        loginmodal.style.display = "flex";
    });

    loginmodal.style.display = "none";

    // level clicks
    pl_close.addEventListener("click", () => {
        pleaseloginmodal.style.display = "none";
    });

    for (let i = 0; i < levels.length; i++) {
        const level = levels[i];

        level.addEventListener("click", () => {
            if (!token) {
                pleaseloginmodal.style.display = "flex";
            } else {
                window.location.href = "/play/" + level.className;
            }
        });
    }

    window.onclick = function(event) {
        if (event.target == loginmodal) {
            loginmodal.style.display = "none";
        } else if (event.target == pleaseloginmodal) {
            pleaseloginmodal.style.display = "none";
        }
    };
});