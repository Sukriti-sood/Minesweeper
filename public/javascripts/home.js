document.addEventListener("DOMContentLoaded", () => {
    const levels = document.querySelectorAll(".levels div");
    var loginmodal = document.querySelector(".login-modal");
    var pleaseloginmodal = document.querySelector(".please-login");
    var pl_close = document.querySelector(".pl-div button");
    const payload = sessionStorage.getItem("payload");

    loginmodal.style.display = "none";
    for (var i = 0; i < levels.length; i++) {
        var level = levels[i];

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