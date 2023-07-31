const {Language} =require('../models');
const {auth}= require('../middleware/auth')

const router = require('express').Router()

router.get('/getLanguage/:id',auth(['HR manager']),async(req,res)=>{
  try{const language=await Language.findOne({where:{ id:req.params.id }});
  if(!language) return res.status(404).send('language not found');
  res.send(language);
  }catch(err){
    res.status(500).send(err.message)
  }
  });

router.get('/all',auth(['HR manager']),async(req,res)=>{
  try
  {
    const languages=  await   Language.findAll()
    if(languages.length===0) return res.status(404).send('there is no language');
    res.send(languages);
  }catch(err){
    res.status(500).send(err.message)
  }
})

    router.put('/:id',auth(['HR manager']),async(req,res)=>{
      const {error}= Language.validateEditLanguage(req.body);
      if(error) return res.status(400).send(error.details[0].message);
    
       const language =await Language.findOne({where:{ id:req.params.id }});
       if(!language) return res.status(404).send('language not found');
    
       language.name= req.body.name;
       await language.save();
       res.send(language);
          });
    

      
          router.post('/create',auth(['HR manager']),async(req,res)=>{

            const {error}= Language.validateLanguage(req.body);
              if(error) return res.status(400).send(error.details[0].message);
          
            Language.create({name:req.body.name}).then((language)=>{
                res.send(language)
            }).catch((err)=>{
                res.send(err.message)
            })
            });
    

            router.delete('/:id',auth(['HR manager']),async(req,res)=>{

              const  language=await Language.findOne({where:{ id:req.params.id }})
    
              if(!language) return res.status(404).send('language not found');
    
              await language.destroy().then(()=>{
                res.send('language deleted !')
              }).catch((err)=>{
                res.send(err.message)
              });
    
                });

module.exports=router