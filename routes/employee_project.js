const {Employee_project} =require('../models');
const {auth}= require('../middleware/auth')
const router = require('express').Router()

router.get('/projects/:id_employee',auth(['HR manager']), async(req,res)=>{
  Employee_project.findAll({where:{ id_employee:req.params.id_employee }}).then((employee_project)=>{
    if(employee_project.length===0) return res.status(404).send('this employee has no projects');
    res.send(employee_project)
}).catch((err)=>{
    res.send(err.message)
})

});

router.get('/employees/:id_project',auth(['HR manager']), async(req,res)=>{
  await   Employee_project.findAll({where:{id_project:req.params.id_project}}).then((employee_project)=>{
    if(employee_project.length===0) return res.status(404).send('this project has no employee');
        res.send(employee_project)
    }).catch((err)=>{
        res.send(err.message)
    })
    });

    router.get('/all',auth(['HR manager']),async(req,res)=>{
      try
      {
        const employees_projects=  await   Employee_project.findAll()
        if(employees_projects.length===0) return res.status(404).send('there is no employee_project');
        return res.send(employees_projects);
      }catch(err){
       return res.status(500).send(err.message)
      }
     
      });
      
      router.post('/create',auth(['HR manager']),async(req,res)=>{
  
        try {
         
         const {error}=Employee_project.validateEmployee_project(req.body)
         if(error) return res.status(400).send(error.details[0].message);
       
         const{id_employee,id_project}=req.body
       
         let employee_project =await Employee_project.findOne({where:{id_employee:id_employee,id_project:id_project}})
         
         if (employee_project) {
           return res.send('employee already has this project');
         }
        employee_project = await Employee_project.create({id_employee,id_project})
       
        return res.send(employee_project)
              }catch(err){
               return res.status(500).send(err.message)
             } });
       

             router.delete('/deleteOneRelation/:id_employee/:id_project',auth(['HR manager']),async(req,res)=>{
              const  employee_project=await Employee_project.findOne({where:{ id_employee:req.params.id_employee ,id_project:req.params.id_project }})
              .catch((err)=>{res.status(500).send(err.message)})
              if(!employee_project)
               return res.status(404).send('employee_project not found');
    
              await employee_project.destroy().then(()=>{
                return  res.send('employee_project deleted !')
              }).catch((err)=>{
                return res.send(err.message)
              });
    
                });
                router.delete('/deleteProjects/:id_employee',auth(['HR manager']),async(req,res)=>{
               
                  const  employee_project=await Employee_project.findAll({where:{ id_employee:req.params.id_employee}})
            .catch((err)=>{res.status(500).send(err.message)})
            if(employee_project.length===0) return res.status(404).send('employee_project not found');
  
            await Employee_project.destroy({where:{ id_employee:req.params.id_employee}}).then((value)=>{
              return  res.send(`${value} projects deleted !`)
            }).catch((err)=>{
             return  res.send(err.message)
            });
        
                    });

                  
                    router.delete('/deleteEmployees/:id_project',auth(['HR manager']),async(req,res)=>{
                   
                      const  employee_project=await Employee_project.findAll({where:{id_project:req.params.id_project }})
                      .catch((err)=>{res.status(500).send(err.message)})
                      if(employee_project.length===0) 
                      return res.status(404).send('employee_project not found');
            
                      await Employee_project.destroy({where:{id_project:req.params.id_project }}).then((value)=>{
                        return  res.send(`${value} employees deleted !`)
                      }).catch((err)=>{
                        return res.send(err.message)
                      });
            
          
                      });


module.exports=router