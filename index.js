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
        errorMessage: "sorry, we ran into an error getting the list of users"
      });
    });
});

server.post("/api/users", (req, res) => {
    const userData = req.body;

    if (userData['name'] && userData['bio']) {
         Users.insert(userData)
           .then(user => {
             res.status(201).json(user);
           })
           .catch(error => {
             console.log(error);
              res.status(500).json({ errorMessage: 'There was an error while saving the user to the database.' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
})
