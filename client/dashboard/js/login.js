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
            app.method.message("Por favor, informe seu email.")
            document.querySelector("#txtEmailLogin").focus()
            return;
        }

        if(password.length == 0) {
            app.method.message("Por favor, informe sua senha.")
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

                if(response.status == 'error') {
                    app.method.message(response.message)
                    return
                }

                if(response.status == 'success') {
                    app.method.storageValueSection(response.AccessToken, "token")
                    app.method.storageValueSection(response.name, "name")
                    app.method.storageValueSection(response.email, "email")
                    app.method.storageValueSection(response.logo, "logo")

                    window.location.href = "/dashboard/home.html"
                }

            },
            (error) => {
                console.log(error);
            }, true
        )

    }
};