document.addEventListener("DOMContentLoaded", function(event) {
    home.event.init()
});

var home = {};

home.event = {
    init: () => {
        app.method.validateToken()

        app.method.uploadCompanyData()
    }
};