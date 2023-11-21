global.config = require('./config').get('dev')

const restify = require('restify')
const path = require('path')
const recursiveReaddir = require('recursive-readdir')

const server = restify.createServer({
    name: 'Delivery',
    version: '0.0.1'
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.urlEncodedBodyParser())

const pathFiles = path.resolve(path.resolve('./').concat('/server/routes'))

recursiveReaddir(pathFiles, ['!*.js'], (err, files) => {
    if(err) {
        console.log(err)
        process.exit(1)
    }

    files.forEach(element => { require(element)(server) })
})

server.use(
    function nocache(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Pragma", "no-cache");

        next();
    }
)

server.on('restifyError', function(req, res, err, calback) {
    err.toJSON = function custonToJSON() {
        return {
            Erro: 'Página não encontrada :('
        }
    }

    return calback()
})

module.exports = Object.assign({ server, restify, config })