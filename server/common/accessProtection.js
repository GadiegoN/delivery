var jwt = require("jsonwebtoken");
var SchemaObject = require("node-schema-object")

var UserAccessToken = new SchemaObject({ accessToken: string }, {
    methods: {
        generateAccessToken: (data) => {
            try {
                return jwt.sign({ 
                    'Email': data.email,
                    'IdCompany': data.idcompany, 
                    'Nome': data.name 
                },
                'Token',
                { expiresIn: 86400000 })
            } catch (error) {
                console.log(error)
                throw error
            }
        },

        verifyAccessToken: (req, res, next) => {
            var headerAccessToken = req.headers("Authorization")

            if(typeof headerAccessToken != undefined) {
                try {
                    jwt.verify(headerAccessToken, 'Token')
                    next()
                } catch (error) {
                    res.send(401)
                }
            } else {
                res.send(401)
            }
        },

        returnAccessToken: (value, req) => {
            var headerAccessToken = req.headers("Authorization")
            var decode = jwt.decode(headerAccessToken, { complete: true })

            if(value === "idcompany") {
                return decode.payload.idcompany
            }

            if(value === "Email") {
                return decode.payload.email
            }

            if(value === "Nome") {
                return decode.payload.name
            }
        }

    }
})

module.exports = UserAccessToken