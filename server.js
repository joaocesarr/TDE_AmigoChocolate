// // server.js
// var jsonServer = require('json-server')
// var server = jsonServer.create()
// var router = jsonServer.router('db.json')
// var middlewares = jsonServer.defaults()

// server.use(middlewares)

// server.use(jsonServer.bodyParser)
// server.use(function (req, res, next) {
//     if (req.method === 'POST') {
//         // Converts POST to GET and move payload to query params
//         // This way it will make JSON Server that it's GET request
//         req.method = 'GET'
//         req.query = {
//             "SALDO": 100
//           }
//     }
//     // Continue to JSON Server router
//     next()
// })

// // If you need to scope this behaviour to a particular route, use this
// server.post('/comments', function (req, res, next) {
//     req.method = 'GET'
//     req.query = req.body
//     next()
// })

// server.use(router)
// server.listen(3000, function () {
//     console.log('JSON Server is running')
// })