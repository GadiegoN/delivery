document.addEventListener("DOMContentLoaded", function(event) {
    login.event.init()
});

var login = {};

login.event = {
    init: () => {
        document.querySelector("#btnLogin").onclick = () => {
            login.method.validateLogin()
        }
    }
};

login.method = {
    validateLogin: () => {
        let email = document.querySelector("#txtEmailLogin").value.trim();
        let password = document.querySelector("#txtPasswordLogin").value.trim();

        if(email.length == 0) {
            alert("Por favor, informe seu email.")
            document.querySelector("#txtEmailLogin").focus()
            return;
        }

        if(password.length == 0) {
            alert("Por favor, informe sua senha.")
            document.querySelector("#txtPasswordLogin").focus()
            return;
        }

        login.method.login(email, password);
    },

    login: (email, password) => {

        var data = {
            email: email,
            password: password
        }

        app.method.post("/login", JSON.stringify(data),
            (response) => {

                console.log(response);

            },
            (error) => {
                console.log(error);
            }, true
        )

    }
};