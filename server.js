const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()


const router = express.Router()
router.use('/static', express.static(__dirname + '/static'))
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(process.env.URL_PREFIX || "", router);

app.listen(port, () => {
    console.log(`Mglur app listening on port ${port}`)
})
