const express = require('express')

function routes(Book){
  const bookRouter = express.Router();
  bookRouter.route('/books')
    .post((request, response)=>{
      const book = new Book(request.body)
      console.log(`Post Method Body:: ${request.body}`)

      book.save()

      console.log(`Book Object Created:: ${book}`)
      return response.status(201).json(book)
    })
    .get(
      (request, response)=>{
        const {query} = request
        Book.find(
          query, (error, books)=>{
            if(error){
              return response.send(error)
            } else{
              return response.json(books)
            }
          }
        )
 
        //response.json(responseToSend)
      }
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

        return response.json(book)     
      }
    )

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