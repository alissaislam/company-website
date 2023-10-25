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


app.listen({port:process.env.PORT},async()=>{
    //console.log('Server running on port 3000')
    logger.info('Server running on port', process.env.PORT)
    await sequelize.authenticate()
    logger.info('database synced')
})