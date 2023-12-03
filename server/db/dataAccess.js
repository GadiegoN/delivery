var mysql = require('mysql')

module.exports = class DataAccess {
    async Query(SqlQuery, params) {
        try {
            var SqlQueryUp = SqlQuery
            var fallback
            var connection = mysql.createConnection(global.config.database)

            if(params && params != undefined) {
                let p = params

                for(let key in p) {
                    if(p.hasOwnProperty(key)) {
                        let field = key
                        let value = p[key]

                        SqlQueryUp = SqlQueryUp.replace('@' + field, `'${value}'`)
                    }
                }
            }

            connection.connect()

            await new Promise( (resolve, reject) => {
                    connection.query(SqlQueryUp, function (error, results, fields) {
                        if(error) {
                            reject()
                            throw error
                        }

                        fallback = results

                        resolve()
                    })
                }
            )

            connection.end()

            return fallback

        } catch (error) {
            console.log(error)
            return error
        }
    }
}