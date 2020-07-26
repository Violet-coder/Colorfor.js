'use strict';
const log = console.log
log('Express server')

const express = require('express')

const app = express()

app.use(express.static(__dirname + '/pub'))

const port = process.env.PORT || 5000
app.listen(5000, () =>{
    log(`Listening on port ${port}...`)
})