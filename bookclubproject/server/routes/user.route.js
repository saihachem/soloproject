const userController=require("../controllers/user.controller");
const verifyToken=require("../middelwares/userMiddleware");

module.exports=(app)=>{
    app.post('/api/register',userController.register);
    app.post('/api/login',userController.login);

}