const express = require("express");
const app = express();

const users = ["Aditi", "Rahul", "Aman"];

app.get("/users", (req, res) => {

    const name = req.query.name;   

    if (!name) {
        return res.json(users);
    }

   
    const filteredUsers = users.filter(user => 
        user.toLowerCase() === name.toLowerCase()
    );

    res.json(filteredUsers);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
