const {Pay_plan,Project} = require('../models')
const router = require('express').Router()
router.post('/pay_plans',async(req,res)=>{
    const {description} = req.body
    try{
    const {error} = Pay_plan.validatePay_plan(req.body)
    if(error)
    return res.status(400).send(error.details[0].message)
    const pay_plan = await Pay_plan.create({description})
    return res.json(pay_plan)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
router.get('/pay_plans',async(req,res)=>{
    try{
        const pay_plans = await Pay_plan.findAndCountAll()
        if(pay_plans.count==0)
        return res.send('No pay plans available.')
        return res.json(pay_plans.rows)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
router.put('/pay_plans',async(req,res)=>{
    const {description,pay_planId} = req.body
    try{
        const {error} = Pay_plan.validateEditingPay_plan(req.body)
        if(error)
        return res.status(400).send(error.details[0].message)
        const pay_plan = await Pay_plan.findOne({where:{id:pay_planId}})
        if(!pay_plan)
        return res.status(400).send('The pay plan with the given id was not found.')
        if(description)
        pay_plan.description = description
        return res.json(pay_plan)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
router.delete('/pay_plans/:id',async(req,res)=>{
    try{
        const pay_plan = await Pay_plan.findOne({where:{id:req.params.id}})
        if(!pay_plan)
        return res.status(400).send('The pay plan with the given id was not found.')
        const project = await Project.findOne({where:{id_pay_plan:req.params.id}})
        if(project)
        return res.status(400).send(`Cannot add pay plan that's been added to a project`)
        pay_plan.destroy()
        return res.send('Pay plan deleted.')
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
})
module.exports = router