const {sequelize} = require('./models')
const config = require('config')
const express = require('express')
const app = express()

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}
require('./startup/logging')();
require('./startup/routes')(app);


app.listen({port:3000},async()=>{
    //console.log('Server running on port 3000')
    logger.info('Server running on port', process.env.PORT)
    await sequelize.sync()
    logger.info('database synced')
})