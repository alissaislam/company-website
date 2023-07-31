const {Employee,Technology,Project,Language,Role,Employee_project,Employee_language,Employee_technology}= require('../models')
const express = require('express');
const router = express.Router();
const {auth}= require('../middleware/auth')
const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  });



router.get('/getEmployee/:id',auth(['manager','Owner','HR manager']),async(req,res)=>{

    try{
       
        const employee =await Employee.findOne({where:{ id:req.params.id },include:[
            {
                model:Language,
                through:Employee_language,
                attributes:['name']
            },
            {
                model:Project,
                through:Employee_project,
                attributes:['id','name']
            },
            {
                model:Role,
                as:'role',
                attributes:['name']
            },
           
            {
                model:Technology,
                through:Employee_technology,
                attributes:['name']
            },
           
        ]});
        if(!employee) return res.status(404).send('employee not found');
    res.send(employee);
}catch(err){
        res.status(500).send(err.message)
    }
});

router.get('/all',auth(['manager','Owner','HR manager']),async(req,res)=>{

    try{
    //     const employees =await Employee.findAll();
    //     if(employees.length===0) return res.status(404).send('there is no employee');
    // res.send(employees);
    const employees = await Employee.findAll({
        include:[
            {
                model:Language,
                //as:'language',
                through:Employee_language,
                attributes:['name']
            },
            {
                model:Project,
               // as:'projects',
                through:Employee_project,
                attributes:['id','name']
            },
            {
                model:Role,
                as:'role',
                attributes:['name']
            },
           
            {
                model:Technology,
             //   as:'technologies',
                through:Employee_technology,
                attributes:['name']
            },
           
        ],
    })
    if(employees.length===0) return res.status(404).send('there is no employee');
    return res.json(employees);
}catch(err){
        res.status(500).send(err.message)
    }
});

router.post('/',[auth(['HR manager']),upload.single('photo')],async(req,res)=>{
    try{
    const {error}=Employee.validateEmployee(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    let employee = await Employee.findOne({where:{ email: req.body.email }})
    if (employee) return res.status(400).send('Email already taken');

    const {first_name,last_name,phone,email,age,gender,salary,skills,portfolio,id_role}=req.body
    const photo = req.file ? req.file.buffer : null;
     employee =await Employee.create({first_name,last_name,phone,email,age,gender,salary,skills,portfolio,photo,id_role});

     const role=await Role.findOne({where:{id:id_role}})

    const token= Employee.generateAuthToken(employee.id,role.name);
    res.status(201).header('x-auth-token',token).send(employee);
}catch(err){res.status(500).send(err.message)}
});

router.put('/editInfo/:id',[auth(['HR manager']),upload.single('photo')],async(req,res)=>{
    const {error}= Employee.validateEditEmployee(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    const {first_name,last_name,phone,email,age,gender,salary,skills,portfolio,id_role}=req.body
    const photo = req.file ? req.file.buffer : null;
    try{
let employee =await Employee.findOne({where:{ id:req.params.id }});
if(!employee) return res.status(404).send('employee not found');

if(first_name)
employee.first_name=first_name
if(last_name)
employee.last_name=last_name
if(age)
employee.age=age
if(gender)
employee.gender=gender
if(email)
employee.email=email
if(phone)
employee.phone=phone
if(salary)
employee.salary=salary
if(skills)
employee.skills=skills
if(portfolio)
employee.portfolio=portfolio
if(id_role)
employee.id_role=id_role
if(photo)
employee.photo=photo
await employee.save();
res.send(employee)

    }catch(err){
        res.status(500).send(err.message)
    }

});

router.delete('/:id',auth(['HR manager']),async(req,res)=>{
try{
    const employee = await Employee.findOne({where:{ id:req.params.id }});
    if(!employee) return res.status(404).send('employee not found');
    employee.destroy();
    res.send('employee deleted!')
}catch(err){
    res.status(500).send(err.message)
}
});

module.exports=router;