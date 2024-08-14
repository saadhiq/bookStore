const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

// const Book = require('../models/book')


// All BOOk Routs
router.get('/', async (req,res) => {
   res.send("All Books")
})

// New BOOk Route
router.get('/new', async (req,res) => {
    try {
      const authors = await Author.find({})
      const book = new Book()
      res.render('books/new',{ 
         authors: authors,
         book: book
      })
    } catch {
      res.redirect('/books')
    }

})

// Create BOOk route

router.post('/', async (req, res) => {
   res.send("Post BOOk")
})



module.exports = router