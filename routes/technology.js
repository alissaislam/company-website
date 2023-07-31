const {Technology} =require('../models');
const {auth}= require('../middleware/auth')

const router = require('express').Router()

router.get('/all',auth(['HR manager','Project manager']),async(req,res)=>{
  try
  {
    const technologies=  await   Technology.findAll()
    if(technologies.length===0) return res.status(404).send('there is no technology');
    res.send(technologies);
  }catch(err){
    res.status(500).send(err.message)
  }
})

router.get('/:id',auth(['HR manager','Project manager']),async(req,res)=>{
    try{
      const technology=await Technology.findOne({where:{ id:req.params.id }})
      if(!technology) return res.status(404).send('technology not found');
    res.send(technology);
    }catch(err){
      res.status(500).send(err.message)
    }
});



router.put('/:id',auth(['HR manager','Project manager']),async(req,res)=>{
  try{
    
    const {error}= Technology.validateEditTechnology(req.body);
  if(error) return res.status(400).send(error.details[0].message);


   const technology =await Technology.findOne({where:{ id:req.params.id }});
   if(!technology) return res.status(404).send('technology not found');

   technology.name= req.body.name;
   await technology.save();
   res.send(technology);
  }catch(err){
    res.status(500).send(err.message)
}
      });

      
      router.post('/create',auth(['HR manager','Project manager']),async(req,res)=>{
        const {error}= Technology.validateTechnology(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        
        Technology.create({name:req.body.name}).then((technology)=>{
            res.send(technology)
        }).catch((err)=>{
            res.send(err.message)
        })
        });

        router.delete('/:id',auth(['HR manager','Project manager']),async(req,res)=>{
          const  technology=await Technology.findOne({where:{ id:req.params.id }})
          if(!technology) return res.status(404).send('technology not found');

          await technology.destroy().then(()=>{
            res.send('technology deleted !')
          }).catch((err)=>{
            res.send(err.message)
          });

            });

module.exports=router