document.addEventListener("DOMContentLoaded", function(event) {
    company.event.init()
});

var company = {}
var COMPANY_DATA = {}

company.event = {
    init: () => {
        app.method.validateToken()
        app.method.uploadCompanyData()

        var tooltipList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipList.map(function (e) {
            new bootstrap.Tooltip(e)
        })

        company.method.openTab('about')

    }
}

company.method = {
    openTab: (tab) => {
        Array.from(document.querySelectorAll(".tab-content")).forEach(e => e.classList.remove('active'))
        Array.from(document.querySelectorAll(".tab-item")).forEach(e => e.classList.add('hidden'))
        
        document.querySelector("#tab-" + tab).classList.add('active')
        document.querySelector("#" + tab).classList.remove('hidden')

        switch(tab) {
            case 'about':
                company.method.getCompanyData()
                break;
            
            case 'address':
                company.method.getCompanyData()
                break;
            
            case 'schedule':
                company.method.getSchedule()
                break;

            default:
                break
        }


    },

    getCompanyData: () => {
        app.method.get('/company/about', 
        (response) => {
            if(response.status == "error") {
                app.method.message(response.message)
                return
            }

            let company = response.data[0]
            COMPANY_DATA = company

            if(company.logo != null && company.logo != '') {
                document.getElementById("img-company").style.backgroundImage = `
                    url('../public/images/company/${company.logo}')
                `
                document.getElementById("img-company").style.backgroundSize = '70%'
                document.getElementById("btn-edit-logo").classList.add('hidden')
                document.getElementById("btn-remove-logo").classList.remove('hidden')
            } else {
                document.getElementById("img-company").style.backgroundImage = `
                url('../public/images/default.jpg')
            `
            document.getElementById("img-company").style.backgroundSize = 'cover'
            document.getElementById("btn-edit-logo").classList.remove('hidden')
            document.getElementById("btn-remove-logo").classList.add('hidden')
            }
        },
        (error) => {
            console.log("error", error)
        }
        )
    },

    getSchedule: () => {

    }
}