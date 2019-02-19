const express = require('express')
const booksController = require('../controllers/booksController.js')

function routes(Book){
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.route('/books')
    .post(controller.post)
    .get(
      
    )
    bookRouter.use('/books/:bookId', (request, response, next)=> {
      Book.findById(
        request.params.bookId, (error, book)=>{
          if(error){
            return response.send(error)
          } 
          if(book){
            request.book=book
            return next()
          }
          return response.sendStatus(404)
        }
      )
    })
    bookRouter.route('/books/:bookId')
    .get((request, response)=>{
        const {query} = request
        response.json(request.book)
          //response.json(responseToSend)
      }
    )
    .put(
      (request, response)=>{
        const {query} = request
        const {book} = request
        
        book.title = request.body.title
        book.author = request.body.author
        book.genre = request.body.genre
        book.read = request.body.read

        book.save()

        //return response.json(book)
        request.book.save((error)=>{
          if(error){
            return response.send(error)
          }
          return response.json(book)
        })    
      }
    )
    .patch((request, response)=>{
      const {book} = request

      if(request.body._id){
        delete request.body._id
      }

      Object.entries(request.body).forEach((item)=>{
        const key=item[0]
        const value = item[1]

        book[key] = value
      })
      request.book.save((error)=>{
        if(error){
          return response.send(error)
        }
        return response.json(book)
      })
    })
    .delete((request, response)=>{
      request.book.remove((error)=>{
        if(error){
          return response.send(error)
        }
        return response.sendStatus(204)
      })
    })

  return bookRouter
}

module.exports = routes


/*
bookRouter.route('/books/:bookId').get(
      (request, response)=>{
        const {query} = request
        Book.findById(
          request.params.bookId, (error, book)=>{
            if(error){
              return response.send(error)
            } else{
              return response.json(book)
            }
          }
        )

          //response.json(responseToSend)
      }
    )
    .put(
      (request, response)=>{
        const {query} = request
        Book.findById(
          request.params.bookId, (error, book)=>{
            if(error){
              return response.send(error)
            } else{
              book.title = request.body.title
              book.author = request.body.author
              book.genre = request.body.genre
              book.read = request.body.read

              book.save()

              return response.json(book)
            }
          }
        )
*/ 