const should = require('should')
const sinon = require('sinon')
const bookController = require('../controllers/booksController.js')

describe('Books Controller Tests', ()=>{
  describe('Post Verb', ()=>{
    it('Should not allow an empty title on post')
      const Book = function(book) { 
        this.save = () =>{}
      }

      const request= {
        body:{
          author: "Test Author's Name"
        }
      }

      const response={
        //Create Spy function with the sinon framework
        //Check if any of the below is called
        //Tracks what its been caleed with, how many times e.t.c...  
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      }

      //Inistantiate Book Controller
      const controller = bookController(Book)
      controller.post(request, response)

      //Test status
      response.status.calledWith(400).should.equal(true, `Bad Status ${response.status.args[0][0]}`)
      //test what we are sending
      response.send.calledWith('Tittle is Required').should.equal(true)
  })
})