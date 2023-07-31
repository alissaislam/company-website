const router = require('express').Router()
const {Customer,Project,State,Pay_plan,Offer,Project_offer,Technology,Project_technology, sequelize, Sequelize} = require('../models')
const project = require('../models/project')
const Op = Sequelize.Op
router.post('/projects',async(req,res)=>{
    const {stateId,pay_planId,name,type,progress,cost} = req.body
    try{
        // const customer = await Customer.findOne({where:{id:customerId}})
        const state = await State.findOne({where:{id:stateId}})
        if(!state){
            return res.status(400).send('State not found')
        }
        const pay_plan = await Pay_plan.findOne({where:{id:pay_planId}})
        if(!pay_plan){
            return res.status(400).send('State not found')
        }
        const project = await Project.create({
            name,
            type,
            progress,
            cost,
            id_customer:null,
            id_state:state.id?state.id:null,
            id_pay_plan:pay_plan.id?pay_plan.id:null,
        })
        return res.json(project)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
//get all projects
router.get('/projects',async(req,res)=>{
    try{
        const projects = await Project.findAll({
            include:[
                {
                    model:Customer,
                    as:'customer',
                    attributes:['id','email','phone']
                },
                {
                    model:State,
                    as:'state',
                    attributes:['name']
                },
                {
                    model:Pay_plan,
                    as:'pay_plan',
                    attributes:['description']
                },
                {
                    model:Offer,
                    through:Project_offer,
                },{
                    model:Technology,
                    through:Project_technology
                }
            ],
        })
        return res.json(projects)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
router.get('/projects/available',async(req,res)=>{
    try{
        const projects = await Project.findAndCountAll({where:{id_customer:null}})
        if(projects.count==0)
        return res.send('Project was not found or not available')
        return res.json(projects.rows)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
//add project offer
router.post('/project/offer',async(req,res)=>{
    const {projectId,offerId} = req.body
    try{
        const project = await Project.findOne({where:{id:projectId}})
        if(!project)
        return res.status(400).send('Project was not found.')
        const offer = await Offer.findOne({where:{id:offerId}})
        if(!offer)
        return res.status(400).send('Offer was not found.')
        const project_offer = await Project_offer.create({id_project:projectId,id_offer:offerId})
        return res.json(project_offer)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
router.get('/project/offer',async(req,res)=>{
    try{
        const project_offer = await Project_offer.findAll()
        return res.json(project_offer)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
router.post('/project/technology',async(req,res)=>{
    const {projectId,technologyId} = req.body
    try{
    const project = await Project.findOne({where:{id:projectId}})
    if(!project)
    return res.status(400).send('Project was not found.')
    const technology = await Technology.findOne({where:{id:technologyId}})
    if(!technology)
    return res.status(400).send('Technology was not found.')
    const project_technology = await Project_technology.create({
        id_project:projectId,id_technology:technologyId
    })
    return res.send(project_technology)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})

//edit projects 
router.put('/projects',async(req,res)=>{
    const {projectId,customerId,pay_planId,stateId,type,name,progress,cost} = req.body
    try{
        const project = await Project.findOne({where:{id:projectId}})
        if(!project)
        return res.status(400).send('The project with the given id was not found.')
        
        if(customerId){
        const customer = await Customer.findOne({where:{id:customerId}})
        if(!customer)
        return res.status(400).send('The customer with the given id was not found.')
        project.id_customer=customer.id
        }
        if(pay_planId){
        const pay_plan = await Pay_plan.findOne({where:{id:pay_planId}})
        if(!pay_plan)
        return res.status(400).send('The pay plan with the given id was not found.')
        project.id_pay_plan = pay_plan.id
        }
        if(stateId){
        const state = await State.findOne({where:{id:stateId}})
        if(!state)
        return res.status(400).send('The state with the given id was not found.')
        project.id_state = state.id
        }
        if(name)
        project.name = name
        if(type)
        project.type = type
        if(progress)
        project.progress = progress
        if(cost)
        project.cost = cost
        
        await project.save()
        return res.send(project)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
router.get('/getProfit',async(req,res)=>{
    try{
        const projectCosts = await Project.findAll({where:{id_customer:{[Op.ne]:null}},attributes:['id','cost']})
        
        const profit = projectCosts.reduce((accumulator, object) => {
            return accumulator + object.cost;
          },0);
        return res.send({'profit':profit,'Project Costs':projectCosts})
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
module.exports = router