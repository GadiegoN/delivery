const ct = require('../controllers/company')

module.exports = (server) => {
    server.get("/company/about", async (req, res) => {
        const result = await ct.controllers().getAllData(req)
        res.send(result)
    })
}