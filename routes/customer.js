const {Customer,Project} =require('../models')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = require('express').Router()
const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  });
router.post('/customers',upload.single('photo'),async(req,res)=>{
    const {first_name,last_name,phone,email,age,gender,company_name}=req.body
    try{
    const {error} = Customer.validateCustomer(req.body)
    if(error)
    return res.status(400).send(error.details[0].message)
    let customer =await Customer.findOne({where:{email}})
    if(customer)
    return res.status(400).json('Email already registered')
    const photo = req.file ? req.file.buffer : null;
    customer = await Customer.create({first_name,last_name,phone,gender,age,email,company_name,photo})
    const token = customer.generateAuthToken(customer.id)
    return res.header('x-auth-token',token).json(customer)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
router.get('/customers',async(req,res)=>{
    try{
        const customers = await Customer.findAll()
        return res.json(customers)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
router.put('/customers',[upload.single('photo')],async(req,res)=>{
    const {first_name,last_name,phone,email,age,gender,company_name}=req.body
    const token = req.header('x-auth-token')
    try{
        const {error} = Customer.validateEditingCustomer(req.body)
        if(error)
        return res.status(400).send(error.details[0].message)
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
        const customer = await Customer.findOne({where:{id:decoded.id}})
        if(!customer)
        return res.status(400).send('Customer was not found.')
        if(first_name)
        customer.first_name=first_name
        if(last_name)
        customer.last_name=last_name
        if(age)
        customer.age=age
        if(gender)
        customer.gender=gender
        if(email)
        customer.email=email
        if(phone)
        customer.phone=phone
        if(company_name)
        customer.company_name=company_name
        if(req.file)
        customer.photo =req.file.buffer
        await customer.save()
        return res.json(customer)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
router.delete('/customers/:id',async(req,res)=>{
    try{
        const customer = await Customer.findOne({where:{id:req.params.id}})
        if(!customer)
        return res.status(400).send('Customer was not found.')
        await customer.destroy()
        res.send('Customer deleted.')
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

//get customer project.
router.get('/customers/project',async(req,res)=>{
    const token = req.header('x-auth-token')
    try{
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
        const customer = await Customer.findOne({where:{id:decoded.id}})
        if(!customer)
        return res.status(400).send('Customer was not found.')
        const projects = await Project.findAndCountAll(
            {
            where:{id_customer:customer.id},
            }
            )
        if(projects.count==0)
        return res.status(400).send(`You don't have any projects yet.`)
        return res.json(projects.rows)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
//Customer buys project
router.post('/customer/project/buy',async(req,res)=>{
    const {projectId,customer_email} = req.body
    try{
        const customer = await Customer.findOne({where:{email:customer_email}})
        if(!customer)
        return res.status(400).send('The customer with the given email was not found.')
        const project = await Project.findOne({where:{id:projectId,id_customer:null}})
        if(!project)
        return res.status(400).send('The requested project was not found or not available.')
        project.id_customer = customer.id
        await project.save()
        return res.json(project)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})

module.exports = router