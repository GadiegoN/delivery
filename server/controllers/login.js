const DataAccess = require('../db/dataAccess')
const db = new DataAccess()

const ReadCommandSql = require('../common/readCommandSql')
const readCommandSql = new ReadCommandSql()

const UserAccessToken = require('../common/accessProtection')
const Access = new UserAccessToken()

const crypto = require('crypto')

const controllers = () => {
    const login = async (req) => {
        // var email =req.body.email
        var password = req.body.password

        var commandSql = await readCommandSql.restornaStringSql('login', 'login')
        var userDb = await db.Query(commandSql, req.body)

        if(userDb != undefined && userDb.length > 0) {

            var password_hash = crypto.createHmac('sha256', password).digest('hex')

            if(password_hash.toLowerCase() != userDb[0].password.toLowerCase()) {
                return {
                    status: 'error',
                    message: 'Usuário ou senha incorretos.'
                }
            }

            var accessToken = Access.generateAccessToken(userDb[0])

            return {
                status: 'success',
                AccessToken: accessToken,
                name: userDb[0].name,
                email: userDb[0].email,
                logo: userDb[0].logo,
            }

        } else {
            return {
                status: 'error',
                message: 'Usuário ou senha incorretos.'
            }
        }
    }

    return Object.create({
        login
    })


}

module.exports = Object.assign({ controllers })