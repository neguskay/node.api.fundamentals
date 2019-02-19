

function booksController(Book){

  function post(request, response){
    const book = new Book(request.body)
    console.log(`Post Method Body:: ${request.body}`)

    if(!request.body.title){
      response.status(400)
      return response.send('Tittle is Required')
    }


    book.save()

    console.log(`Book Object Created:: ${book}`)
    response.status(201)
    return response .json(book)
  }

  function get(request, response){
    const {query} = request
    Book.find(query, (error, books)=>{
        if(error){
          return response.send(error)
        } 

        const booksToReturn = books.map((book)=>{
          const newBook = book.toJSON()
          newBook.links = {}
          newBook.links.self = `http://${request.headers.host}/api/books/${book._id}`
          return newBook
        })

        return response.json(booksToReturn)
      }
    )
    //response.json(responseToSend)
  }

  return { post, get}
}

module.exports = booksController