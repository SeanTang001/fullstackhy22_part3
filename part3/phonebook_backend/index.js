const express = require('express')
const app = express()

const morgan = require('morgan')
morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
morb= morgan(':method :url :status :res[content-length]  - :response-time ms :body')
app.use(morb)
app.use(express.json())

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }
// app.use(requestLogger)

// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
//   }
  
//   app.use(unknownEndpoint)

let phone = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons/', (request, response) => {
    response.json(phone)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phone.find(phone => phone.id === id)

    if (person) {
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})


app.get('/info', (request,response) => {
    response.send(
    "<p>Phonebook has info for "+ phone.length + "</p> <p>"+new Date()+"</p>"
        )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phone.find(phone => phone.id === id)

    if (person){
        phone = phone.filter((person) => person.id !== id)
        response.status(202).end()
    } else{
        response.status(404).end()
    }
})

const generateId = () => {
    // const maxId = phone.length > 0
    // ? Math.max(...phone.map(n => n.id))
    // : 0
    a = parseInt(Math.random()*1000)

    return a
}

app.post('/api/persons/', (request, response) => {
    body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "require name"
        })
    }



    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
      }

    phone = phone.concat(person)
    //console.log(person)
    //console.log(phone)
    return (response.status(202).end())
    
})

const PORT = 3002
app.listen(PORT)
console.log("Server is running")