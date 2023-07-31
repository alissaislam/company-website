const {State} = require('../models')
const router = require('express').Router()
router.post('/states',async(req,res)=>{
    const {name} = req.body
    try{
    const state = await State.create({name})
    return res.json(state)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
router.get('/states',async(req,res)=>{
    try{
        const states = await State.findAll()
        return res.json(states)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
module.exports = router