const {Employee_language} =require('../models');
const {auth}= require('../middleware/auth')
const router = require('express').Router()

router.get('/languages/:id_employee',auth(['HR manager']), async(req,res)=>{
  Employee_language.findAll({where:{ id_employee:req.params.id_employee }}).then((employee_language)=>{
    if(employee_language.length===0) return res.status(404).send('this employee has no languages');
    res.send(employee_language)
}).catch((err)=>{
    res.send(err.message)
})

});

router.get('/employees/:id_language',auth(['HR manager']), async(req,res)=>{
  await   Employee_language.findAll({where:{id_language:req.params.id_language}}).then((employee_language)=>{
    if(employee_language.length===0) return res.status(404).send('this language has no employee');
        res.send(employee_language)
    }).catch((err)=>{
        res.send(err.message)
    })
    });

    router.get('/all',auth(['HR manager']),async(req,res)=>{
      try
      {
        const employees_languages=  await   Employee_language.findAll()
        if(employees_languages.length===0) return res.status(404).send('there is no employee_language');
        return res.send(employees_languages);
      }catch(err){
       return res.status(500).send(err.message)
      }
     
      });
      
  router.post('/create',auth(['HR manager']),async(req,res)=>{

    try {
      
      const {error}=Employee_language.validateEmployee_language(req.body)
      if(error) return res.status(400).send(error.details[0].message);
    
      const{id_employee,id_language}=req.body
    
      let employee_language =await Employee_language.findOne({where:{id_employee:id_employee,id_language:id_language}})
      
      if (employee_language) {
        return res.send('employee already has this language');
      }
    employee_language = await Employee_language.create({id_employee,id_language})
    
    return res.send(employee_language)
          }catch(err){
            return res.status(500).send(err.message)
          } });
       

             router.delete('/deleteOneRelation/:id_employee/:id_language',auth(['HR manager']),async(req,res)=>{
              const  employee_language=await Employee_language.findOne({where:{ id_employee:req.params.id_employee ,id_language:req.params.id_language }})
              .catch((err)=>{res.status(500).send(err.message)})
              if(!employee_language)
               return res.status(404).send('employee_language not found');
    
              await employee_language.destroy().then(()=>{
                return  res.send('employee_language deleted !')
              }).catch((err)=>{
                return res.send(err.message)
              });
    
                });
                router.delete('/deletelanguages/:id_employee',auth(['HR manager']),async(req,res)=>{
               
                  const  employee_language=await Employee_language.findAll({where:{ id_employee:req.params.id_employee}})
            .catch((err)=>{res.status(500).send(err.message)})
            if(employee_language.length===0) return res.status(404).send('employee_language not found');
  
            await Employee_language.destroy({where:{ id_employee:req.params.id_employee}}).then((value)=>{
              return  res.send(`${value} languages deleted !`)
            }).catch((err)=>{
             return  res.send(err.message)
            });
        
                    });

                  
                    router.delete('/deleteEmployees/:id_language',auth(['HR manager']),async(req,res)=>{
                   
                      const  employee_language=await Employee_language.findAll({where:{id_language:req.params.id_language }})
                      .catch((err)=>{res.status(500).send(err.message)})
                      if(employee_language.length===0) 
                      return res.status(404).send('employee_language not found');
            
                      await Employee_language.destroy({where:{id_language:req.params.id_language }}).then((value)=>{
                        return  res.send(`${value} employees deleted !`)
                      }).catch((err)=>{
                        return res.send(err.message)
                      });
            
          
                      });


module.exports=router