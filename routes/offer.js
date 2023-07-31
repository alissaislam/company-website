const router = require('express').Router()
const {Offer} = require('../models')
router.post('/offers',async(req,res)=>{
    const {name} = req.body
    const {error} = Offer.validateOffer(req.body)
    if(error)
    return res.status(400).send(error.details[0].message)
    await Offer.create({name}).then((offer)=>{
        return res.json(offer)
    }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err)
    })
})
router.get('/offers',async(req,res)=>{
    await Offer.findAll().then((offers)=>{
        res.json(offers)
    }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err)
    }) 
})
router.put('/offers/:id',async(req,res)=>{
    const {name} = req.body
    const {error} = Offer.validateOffer(req.body)
    if(error)
    return res.status(400).send(error.details[0].message)
    await Offer.findOne({where:{id:req.params.id}}).then((offer)=>{
        if(!offer)
        return res.status(400).send('Offer was not found.')
        if(name)
        offer.name = name
        offer.save().then((offer)=>{
            return res.send(offer)
        }).catch((err)=>{
            console.log(err)
            return res.status(500).send(err)
        })
    }).catch((err)=>{
        console.log(err)
        return res.status(500).send(err)
    })
})
router.delete('/offers/:id',async(req,res)=>{
        await Offer.findOne({where:{id:req.params.id}}).then((offer)=>{
            offer.destroy()
            return res.json('Offer deleted.')
        }).catch((err)=>{
            console.log(err)
            return res.status(500).send(err)
        })
})

module.exports = router