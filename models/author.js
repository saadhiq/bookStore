// const mongoose = require('mongoose')
// const Book = require('./book')

// const authorSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     }
// })

// authorSchema.pre('remove',function(next){
//     Book.find({author: this.id},(err,books) =>{
//         if (err){
//             next(err)
//         } else if (books.length > 0) {
//             next(new Error('This author has books still'))
//         } else{
//             next()
//         }
//     })
// })

// module.exports = mongoose.model('Author', authorSchema)


const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  editCount:{
    type: Number,
    required: false,
    default:0
  }
})

// authorSchema.pre('remove', function(next) {
//   Book.find({ author: this.id }, (err, books) => {
//     if (err) {
//       next(err)
//     } else if (books.length > 0) {
//       next(new Error('This author has books still'))
//     } else {
//       next()
//     }
//   })
// })

// Pre-deleteOne middleware to prevent deletion if the author has associated books
authorSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
  const query = this.getFilter(); // Get the query filter (e.g., { _id: authorId })

  try {
    const books = await Book.find({ author: query._id }); // Query books with the author's ID

    if (books.length > 0) {
      next(new Error('This author has books associated and cannot be deleted'));
    } else {
      next(); // If no books are associated, proceed with deletion
    }
  } catch (err) {
    next(err); // Pass any errors to the next middleware
  }
});

module.exports = mongoose.model('Author', authorSchema)