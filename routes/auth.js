const {Customer,Employee,Role} = require('../models')
const router = require('express').Router()
const jwt =require('jsonwebtoken')
const config = require('config')
router.post('/customers/login',async(req,res)=>{
    const {email} = req.body
    try{
        const customer = await Customer.findOne({where:{email}})
        if(!customer)
        return res.status(400).send('Email not found.')

        const token = customer.generateAuthToken(customer.id)        
        return res.header('x-auth-token',token).send('Logged in.')
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})

router.post('/employees/login',async(req,res)=>{
    const {email} = req.body
    try{
        const employee = await Employee.findOne({where:{email}})
        if(!employee)
        return res.status(400).send('Email not found.')

        const role=await Role.findOne({where:{id:employee.id_role}})

        const token = Employee.generateAuthToken(employee.id,role.name)        
        return res.header('x-auth-token',token).send('Logged in.')
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
module.exports = router