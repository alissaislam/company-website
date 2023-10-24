const { response } = require('express')

const router = require('express').Router()

router.get('/',async(req,res)=>{
   return res.send('welcom');
})
// router.get('/customers',async(req,res)=>{
//    try{
//        const customers = await Customer.findAll()
//        return res.json(customers)
//    }catch(err){
//        console.log(err)
//        res.status(500).send(err)
//    }
// })

module.exports = router