const jwt = require('jsonwebtoken')
const config = require('config')
module.exports.auth = auth = (roles)=>{
    return (req,res,next)=>{
        const token = req.header('x-auth-token')
        if(!token)
        return res.status(401).send('Access denied,no token provided.')
            const decoded = jwt.verify(token,config.get('jwtEmployeePrivetKey'))
            console.log(decoded.role)
            if(roles.includes(decoded.role)){
                next()
            }else{
                return res.status(403).send('Invalid Token.')
            }
        
    }
}


// function authCustomer(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }

// function authHR(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         if(req.user.id_role!=4)
//         return res.status(403).send('forbidden')
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }

// function authCustomerService(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         if(req.user.id_role!=5)
//         return res.status(403).send('forbidden')
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }

// function authProjectManager(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         if(req.user.id_role!=6)
//         return res.status(403).send('forbidden')
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }

// function authOwner(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         if(req.user.id_role!=7)
//         return res.status(403).send('forbidden')
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }

// function authOwner(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         if(req.user.id_role!=7)
//         return res.status(403).send('forbidden')
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }
// function authManager(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         if(req.user.id_role!=2)
//         return res.status(403).send('forbidden')
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }
// function authManagerOwnerProjectmanager(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         if(req.user.id_role!=2&req.user.id_role!=6&req.user.id_role!=7)
//         return res.status(403).send('forbidden')
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }

// function authManagerOwnerHRmanager(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         if(req.user.id_role!=2&req.user.id_role!=4&req.user.id_role!=7)
//         return res.status(403).send('forbidden')
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }

// function authProjectmanagerHR(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         if(req.user.id_role!=6&req.user.id_role!=4)
//         return res.status(403).send('forbidden')
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }
// function authManagerOwnerCustomer(req,res,next){
//     const token = req.header('x-auth-token')
//     if(!token)
//         return res.status(401).send('Access denied,no token provided')
//     try{
//         const decoded = jwt.verify(token,config.get('jwtPrivateKey'))
//         req.user=decoded;
//         if(req.user.id_role!=2&req.user.id_role!=5&req.user.id_role!=7)
//         return res.status(403).send('forbidden')
//         next()
//     }catch(example){
//         return res.status(403).send('Invalid Token')
//     }
// }


// module.exports.authCustomer = authCustomer 
// module.exports.authHR =authHR
// module.exports.authCustomerService=authCustomerService 
// module.exports.authProjectManager =authProjectManager
// module.exports.authOwner =authOwner
// module.exports.authManager =authManager
// module.exports.authManagerOwnerProjectmanager =authManagerOwnerProjectmanager
// module.exports.authManagerOwnerHRmanager =authManagerOwnerHRmanager
// module.exports.authProjectmanagerHR =authProjectmanagerHR
// module.exports.authManagerOwnerCustomer =authManagerOwnerCustomer