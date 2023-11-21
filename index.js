const { server, restify, config } = require('./server/server')

server.get('/*', restify.plugins.serveStatic({
    directory: './client',
    default: 'index.html'
}))

server.listen(config.port, () => {
    console.log(`Environment: ${config.environment} | URL: ${config.url} | PORT: ${config.port}`)
})