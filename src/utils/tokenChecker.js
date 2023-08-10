import jwt from 'jsonwebtoken';



export const tokenChecker = (token) => {
    // console.log('received token : ',token)
    try{
        const decodedToken = jwt.decode(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp > currentTime) {
           return true;
         } else {
            return false;
         }
    }catch(err){
        return false;
    }
}