var app = {};

app.event = {

}

app.method = {
    get: (url, callbackSuccess, callbackError, login = false) => {
        try {
            if(app.method.validateToken(login)) {
                let xhr = new XMLHttpRequest()
                xhr.open('GET', url)
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8")
                xhr.setRequestHeader("Authorization", app.method.getValueStorage('token'))

                xhr.onreadystatechange = function () {
                    if(this.readyState == 4) {
                        if(this.status == 200) {
                            return callbackSuccess(JSON.parse(xhr.responseText))
                        } else {
                            if(xhr.status == 401) {
                                app.method.logout()
                            }

                            return callbackError(JSON.parse(xhr.responseText))
                        }
                    }
                }

                xhr.send()
            }
        } catch (error) {
            return callbackError(error)
        }
    },

    post: (url, data, callbackSuccess, callbackError, login = false) => {
        try {
            if(app.method.validateToken(login)) {
                let xhr = new XMLHttpRequest()
                xhr.open('POST', url)
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8")
                xhr.setRequestHeader("Authorization", app.method.getValueStorage('token'))

                xhr.onreadystatechange = function () {
                    if(this.readyState == 4) {
                        if(this.status == 200) {
                            return callbackSuccess(JSON.parse(xhr.responseText))
                        } else {
                            if(xhr.status == 401) {
                                app.method.logout()
                            }

                            return callbackError(JSON.parse(xhr.responseText))
                        }
                    }
                }

                xhr.send(data)
            }
        } catch (error) {
            return callbackError(error)
        }
    },

    validateToken: (login = false) => {
        var currentToken = app.method.getValueStorage('token')

        if((currentToken == undefined || currentToken === null || currentToken == "" || currentToken == "null") && !login) {
            window.location.href = '/dashboard/login.html'

            return false
        }

        return true
    },

    storageValueSection: (value, current) => {
        localStorage[current] = value
    },

    getValueStorage: (current) => {
        return localStorage[current]
    },

    logout: () => {
        localStorage.clear()
        window.location.href = '/dashboard/login.html'
    },

    message: (text, color = 'red', time = 3500) => {
        let conteiner = document.querySelector('#container-message')

        if(conteiner.childElementCount > 3) {
            return
        }

        let id = Math.floor(Date.now() * Math.random())

        let msg = `<div id="msg-${id}" class="toast ${color}">${text}</div>`

        conteiner.innerHTML += msg

        setTimeout(() => {
            document.querySelector(`#msg-${id}`).remove()
        }, time)
    },

    uploadCompanyData: () => {
        document.querySelector('.company-name').innerHTML = app.method.getValueStorage('name')
        document.querySelector('.company-email').innerHTML = app.method.getValueStorage('email')

        let logotipo = app.method.getValueStorage('logo')

        if(logotipo != undefined && logotipo != null && logotipo != 'null' && logotipo != '') {
            document.querySelector('.company-logo').src = '/public/images/company/' + logotipo
        } else {
            document.querySelector('.company-logo').src = '/public/images/default.jpg'
        }
    }
}
