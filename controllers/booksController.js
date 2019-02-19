

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

  return { post, get}
}

module.exports = booksController