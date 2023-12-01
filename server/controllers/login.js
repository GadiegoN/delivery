const controllers = () => {
    const login = async (req) => {
        return { retorno: "Ok"}
    }

    return Object.create({
        login
    })


}

module.exports = Object.assign({ controllers })