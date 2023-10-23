const { response } = require('express')

const router = require('express').Router()

router.get('',async(req,res)=>{
   return response.json('welcom');
})