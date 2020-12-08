let users = require('../mocks/index') //importando o mocks com os usuarios

module.exports = {

    listUsers(request, response) {

        const { order } = request.query

        users.sort((a, b) => {

            if (order === 'desc') {

                return a.id < b.id ? 1 : -1
            }

            return a.id > b.id ? 1 : -1
        })
        response.send(200, users)

    },
    getUserById(request, response) {

        const { id } = request.params

        const user = users.find((item) => {

            return item.id === +id
        })

        if (!user) {
            return response.send(400, { "user": `Not Found ${id}` })
        }

        response.send(200, user)
    },
    saveUser(request, response) {
        const { body } = request

        const lastUser = users[users.length - 1].id
        const newUser = {
            id: lastUser + 1,
            ...body
        }
        users.push(newUser)
        response.send(200, newUser)
    },
    updateUser(request, response) {
        let { id } = request.params
        const { name } = request.body

        id = Number(id)

        const rigthuser = users.find((item) => {

            return item.id === id
        })

        if (!rigthuser) {
            return response.send(400, { "user": `Not Found ${rigthuser}` })
        }

        users = users.map((item) => {

            if (item.id == id) {
                return {
                    id,
                    name
                }
            }
            return item
        })

        response.send(200, users)
    },
    deleteUser(request, response) {
        let { id } = request.params

        id = Number(id)

        const rigthuser = users.find((item) => {

            return item.id === id
        })

        if (!rigthuser) {
            return response.send(400, { "user": `Not Found ${rigthuser}` })
        }

        users = users.filter((item) => {

            return item.id != id
        })

        response.send(200, users)
    },

}