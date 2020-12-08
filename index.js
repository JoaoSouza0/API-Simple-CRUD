const http = require('http'); // importando o modulo http nativo do node
const url = require('url')
const routes = require('./routes')
const bodyParser = require('./helpers/bodyParser')

const server = http.createServer((request, response) => { //criando o server

    const parsedUrl = url.parse(request.url, true)

    console.log(`Request: ${request.method} | EndPoint: ${parsedUrl.pathname} `) //mostrando o metodos htpp e o endpoint

    let { pathname } = parsedUrl

    const splitEndPoint = pathname.split('/').filter(Boolean)
    let id = null

    if (splitEndPoint.length > 1) {

        pathname = `/${splitEndPoint[0]}/:id`
        id = splitEndPoint[1]
    }

    const isRoute = routes.find((requestObj) => {
        return requestObj.endpoint === pathname && request.method === requestObj.method
    })

    if (isRoute) { // verificando o endpoint
        request.params = { id }

        request.query = parsedUrl.query

        response.send = (statusCode, body) => {

            response.writeHead(statusCode, { 'Content-Type': 'application/json' }); //escrevendo a mensagem de sucesso e o mostrando que o header é json
            response.end(JSON.stringify(body)) //convertendo o json para string

        }

        if (['POST', 'PUT', 'PATH'].includes(request.method)) {

            bodyParser(request, () => isRoute.handle(request, response))

        } else {

            isRoute.handle(request, response)
        }
    } else {

        response.writeHead(404, { 'Content-Type': 'application/json' }); //escrevendo mensagem de erro e mostrando o header
        response.end(`Cannot find ${request.method} | ${parsedUrl.pathname} `) // mensagem de não encontrando o metodo http no endpoint

    }

})

server.listen(3000, () => { console.log('Server started at http://localhost:3000') }) //iniciando o server na porta 3000