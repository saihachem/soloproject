const BooksSchema = require("../models/book.model");
const verifyToken = require("../middelwares/userMiddleware");
const User = require("../models/user.model");
const { log } = require("console");

//create new book 
module.exports.CreateNewBook = async (req, res) => {
    // Use the verifyToken middleware to protect this route
    verifyToken(req, res, async () => {
      try {
        // Access the user from req.user (provided by verifyToken)
        const user = req.user;
  
        // Fetch the user's full name
        const addedByUser = await User.findById(user.id);
  
        // Create a new book with the user information
        const newBook = new BooksSchema({
          title: req.body.title,
          description: req.body.description,
          addedBy: addedByUser ? `${addedByUser.firstName} ${addedByUser.lastName}` : null,
          favorites: true, // Set favorites to true when creating a new book
          
        });
  
        // Save the new book
        const savedBook = await newBook.save();
  
        // Update the user's favorites by adding the new book's ID
        if (user) {
          await User.findByIdAndUpdate(user.id, { $addToSet: { favorites: savedBook._id } });
        }
  
        console.log(savedBook);
        res.json({ newBook: savedBook });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  };
  
//read all 
module.exports.GetAllbooks = (req, res) => {
 
    BooksSchema.find()
    .then((allbooks)=>{
        console.log(allbooks)
        res.json(allbooks)
    })
    .catch(err=>{
        res.json({message:"wait a min",err})
    })
}

//Read One

module.exports.FindOneSingleBook = (req, res) => {
    BooksSchema.findOne({ _id: req.params.BookId })
        .then(oneSingleBook => {
            res.json(oneSingleBook)
        })
        .catch((err) => {
            res.json(err)
        })
}

//DELETE

module.exports.deleteAnExistingBook = (req, res) => {
    BooksSchema.deleteOne({ _id: req.params.BookId })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })
}

//UPDATE

module.exports.updateExistingBook = async (req, res) => {
    try {
        const updatedBook = await BooksSchema.findOneAndUpdate(
            { _id: req.params.BookId },
            req.body,
            { new: true, runValidators: true }
        );

        res.json({ done: true, updatedBook });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



    