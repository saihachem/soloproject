const bookcontroller=require("../controllers/book.controller");
const verifyToken = require("../middelwares/userMiddleware");

module.exports=(app)=>{
    app.use(verifyToken)
    app.get("/api/book",bookcontroller.GetAllbooks)
    app.get("/api/book/:BookId", bookcontroller.FindOneSingleBook)
    app.put("/api/book/:BookId", bookcontroller.updateExistingBook)
    app.post("/api/book", bookcontroller.CreateNewBook)
    app.delete("/api/book/:BookId", bookcontroller.deleteAnExistingBook)
}