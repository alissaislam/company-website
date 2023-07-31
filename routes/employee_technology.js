const {Employee_technology} =require('../models');
const {auth}= require('../middleware/auth')
const router = require('express').Router()

router.get('/technologies/:id_employee',auth(['HR manager']), async(req,res)=>{
  Employee_technology.findAll({where:{ id_employee:req.params.id_employee }}).then((employee_technology)=>{
    if(employee_technology.length===0) return res.status(404).send('this employee has no technology');
   return res.send(employee_technology)
}).catch((err)=>{
    return res.send(err.message)
})

});

router.get('/employees/:id_technology',auth(['HR manager']), async(req,res)=>{
  await   Employee_technology.findAll({where:{id_technology:req.params.id_technology}}).then((employee_technology)=>{
    if(employee_technology.length===0) return res.status(404).send('this technology has no employee');
      return  res.send(employee_technology)
    }).catch((err)=>{
      return  res.send(err.message)
    })
    });

router.get('/all',auth(['HR manager']),async(req,res)=>{
    try
    {
      const employees_technologies=  await   Employee_technology.findAll()
      if(employees_technologies.length===0) return res.status(404).send('there is no employee_technology');
      return res.send(employees_technologies);
    }catch(err){
     return res.status(500).send(err.message)
    }
   
    });
      
router.post('/create',auth(['HR manager']),async(req,res)=>{
  
 try {
  
  const {error}=Employee_technology.validateEmployee_technology(req.body)
  if(error) return res.status(400).send(error.details[0].message);

  const{id_employee,id_technology}=req.body

  let employee_technology =await Employee_technology.findOne({where:{id_employee:id_employee,id_technology:id_technology}})
  
  if (employee_technology) {
    return res.send('employee already has this technology');
  }
 employee_technology = await Employee_technology.create({id_employee,id_technology})

 return res.send(employee_technology)
       }catch(err){
        return res.status(500).send(err.message)
      } });

 router.delete('/deleteOneRelation/:id_employee/:id_technology',auth(['HR manager']),async(req,res)=>{
  const  employee_technology=await Employee_technology.findOne({where:{ id_employee:req.params.id_employee ,id_technology:req.params.id_technology }})
  .catch((err)=>{res.status(500).send(err.message)})
  if(!employee_technology)
    return res.status(404).send('employee_technology not found');

  await employee_technology.destroy().then(()=>{
    return  res.send('employee_technology deleted !')
  }).catch((err)=>{
    return res.send(err.message)
  });

    });

 router.delete('/deleteTechnologies/:id_employee',auth(['HR manager']),async(req,res)=>{
               
     const  employee_technology=await Employee_technology.findAll({where:{ id_employee:req.params.id_employee}})
    .catch((err)=>{res.status(500).send(err.message)})
    if(employee_technology.length===0) return res.status(404).send('employee_technology not found');

    await Employee_technology.destroy({where:{ id_employee:req.params.id_employee}}).then((value)=>{
      return  res.send(`${value} technologies deleted !`)
    }).catch((err)=>{
      return  res.send(err.message)
    });

    });           

 router.delete('/deleteEmployees/:id_technology',auth(['HR manager']),async(req,res)=>{
                   
    const  employee_technology=await Employee_technology.findAll({where:{id_technology:req.params.id_technology }})
    .catch((err)=>{res.status(500).send(err.message)})
    if(employee_technology.length===0) 
    return res.status(404).send('employee_technology not found');

    await Employee_technology.destroy({where:{id_technology:req.params.id_technology }}).then((value)=>{
      return  res.send(`${value} employees deleted !`)
    }).catch((err)=>{
      return res.send(err.message)
    });

      });
module.exports=router