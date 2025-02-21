import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).send({success: false, message: 'User not authenticated'});
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decode._id;
        next();
    } catch (error) {
        console.log("Error in authenticating jwt", error);
    }
}