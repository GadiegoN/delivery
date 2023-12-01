var config = {
    dev: {
        url: 'http://localhost/',
        port: 3003,
        environment: 'DEV',
        database: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'Platina45',
            database: 'pizzaria'
        }
    }
}

exports.get = function get(environment) {
    if (environment.toLowerCase() === 'dev') {
        return config.dev
    }
}