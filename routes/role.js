const {Role} =require('../models');
const {auth}= require('../middleware/auth')
const router = require('express').Router()

router.get('/getRole/:id',auth(['HR manager']),async(req,res)=>{
try{const role=await Role.findOne({where:{ id:req.params.id }});
if(!role) return res.status(404).send('role not found');
res.send(role);
}catch(err){
  res.status(500).send(err.message)
}
});

router.get('/all',async(req,res)=>{
  try
  {
    const roles=  await   Role.findAll()
    if(roles.length===0) return res.status(404).send('there is no role');
    res.send(roles);
  }catch(err){
    res.status(500).send(err.message)
  }
})

router.put('/:id',auth(['HR manager']),async(req,res)=>{

  
  const {error}= Role.validateEditRole(req.body);
  if(error) return res.status(400).send(error.details[0].message);

   const role =await Role.findOne({where:{ id:req.params.id }});
   if(!role) return res.status(404).send('role not found');

   role.name= req.body.name;
   await role.save();
   res.send(role);
      });

      
      router.post('/create/:name',async(req,res)=>{

        const {error}= Role.validateRole(req.body);
          if(error) return res.status(400).send(error.details[0].message);
      
        Role.create({name:req.params.name}).then((role)=>{
            res.send(role)
        }).catch((err)=>{
            res.send(err.message)
        })
        });

        router.delete('/:id',auth(['HR manager']),async(req,res)=>{

          const  role=await Role.findOne({where:{ id:req.params.id }})

          if(!role) return res.status(404).send('role not found');

          await role.destroy().then(()=>{
            res.send('role deleted !')
          }).catch((err)=>{
            res.send(err.message)
          });

            });

module.exports=router