const DataAccess = require('../db/dataAccess')
const db = new DataAccess()

const ReadCommandSql = require('../common/readCommandSql')
const readCommandSql = new ReadCommandSql()

const UserAccessToken = require('../common/accessProtection')
const Access = new UserAccessToken()

const controllers = () => {
    const getAllData = async (req) => {
        try {
            var commandSql = await readCommandSql.restornaStringSql('getAllData', 'company')
            var result = await db.Query(commandSql)

            return {
                status: 'success',
                data: result
            }

        } catch (error) {
            console.log(error)
            return {
                status: 'error',
                message: 'Falha ao obter dados da empresa.'
            }
        }
    }

    return Object.create({
        getAllData
    })


}

module.exports = Object.assign({ controllers })