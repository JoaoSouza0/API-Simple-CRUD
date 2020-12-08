const useController = require('./Controllers/useController')

module.exports = [
    {
        endpoint: '/users',
        method:'GET',
        handle: useController.listUsers
    },
    {
        endpoint: '/users/:id',
        method:'GET',
        handle: useController.getUserById
    },
    {
        endpoint: '/users',
        method:'POST',
        handle: useController.saveUser
    },
    {
        endpoint: '/users/:id',
        method:'PUT',
        handle: useController.updateUser
    },
    {
        endpoint: '/users/:id',
        method:'DELETE',
        handle: useController.deleteUser
    }
]