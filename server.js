const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()

console.log(`Starting the server in ${process.env.NODE_ENV} mode`)

const router = express.Router()
router.use('/static', express.static(__dirname + '/static'))
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use((req, res, next) => {
    if (!req.secure && process.env.NODE_ENV == "production") {
        res.redirect('https://' + req.headers.host + req.url)
    } else {
        next()
    }
})

app.use(process.env.URL_PREFIX || "", router);

app.listen(port, () => {
    console.log(`Mglur app listening on address http://127.0.0.1:${port}`)
})
