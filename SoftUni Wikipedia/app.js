const express = require('express')
const config = require('./config/config')
const app = express()

let env = 'development'

require('./config/database')(config[env])

require('./config/express')(app, config[env])

require('./config/passport')()

require('./config/routes')(app)

let port = 3000;
app.listen(port);
console.log("Server istening on port: " + port);
