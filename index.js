// implement your API here
const express = require("express"); 

const Users = require("./data/db"); 
const server = express();

server.use(express.json()); 

server.get("/", function(request, response) {
  response.send({ hello: "Steve!" });
});

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "he users information could not be retrieved."
      });
    });
});

server.post('/api/users', (req, res) => {
    const userData = req.body;
    
    if (userData['name'] && userData['bio']) {
        Users.insert(userData)
            .then(user => {
                res.status(201).json(user) 
            })
            .catch(error => {
                res.status(500).json({ errorMessage: 'error creating user'})
            })
    } else {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    if (id) {
      Users.findById(id)
        .then(users => {
          res.status(200).json(users);
        })
        .catch(error => {
          res.status(500).json({
            errorMessage: "The user with the specified ID does not exist."
          });
        });
    } else {
      res
        .status(404)
        .json({
          errorMessage: "The user with the specified ID does not exist."
        });
    }
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    if(id) {
        Users.remove(id)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
          res.status(500).json({
            errorMessage: "error deleting user"
          });
        });
    } else {
      res
        .status(404)
        .json({
          errorMessage: "The user with the specified ID does not exist."
        });
    }
});