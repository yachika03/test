const jwt=require("jsonwebtoken")
const authentication=async(req,res,next)=>{
    try {
        let token =req.headers.authorization
        if(!token){
            res.status(400).send({message:"token must be presenet"})
        }
        token=req.headers.authorization.split(" ")[1]
        jwt.verify(token,"my-secret-secret-key",(err,decodeToken)=>{
            if(err){
                let message=
                err.message==="jwt expired"
                ?"token is expired"
                :"token is valid"
                return res.status(401).send({status:false,message:message})
            }
            req.headers=decodeToken
            next()
        })


    } catch (error) {
        return res.status(500).send({message:error.message})
    }
}
module.exports={authentication}