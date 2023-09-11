/* DATABASE DETAILS */
// USERNAME: pradeepbaggadelhi
// PASSWORD: p2gH9kPpcj14molb
// mongodb+srv://pradeepbaggadelhi:<password>@cluster0.dtkb6tc.mongodb.net/
/* **********  ********** */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const UserModel = require('./models/users');

app.use(cors(
    {
        origin: ["https://vercel-crud.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json());

mongoose.connect("mongodb+srv://pradeepbaggadelhi:p2gH9kPpcj14molb@cluster0.dtkb6tc.mongodb.net/nameLists");
mongoose.connection.on("connected", () => {
    console.log('Connected to DATABASE.');
});
mongoose.connection.on("error", (error) => {
    console.log('DATABASE Errpr - ', error);
});


app.get("/users", (req, res) => {
    UserModel.find({})
        .then((response) => {
            res.json(response)
        })
        .catch(err => {
            res.json(err)
        })
});

app.get("/user/:id", (req, res) => {
    // console.log('User find - ', req.params);
    const { id } = req.params;
    UserModel.findById(id)
        .then((userRes) => {
            // console.log('User Response - ', userRes);
            res.json(userRes)
        })
        .catch((err) => {
            // console.log('User Response err - ', err);
            res.json(err)
        })
});

app.post('/create-user', (req, res) => {
    // console.log('Create user - ', req.body);
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    console.log('Update user id - ', id);
    console.log('Update user data - ', req.body);
    UserModel.findByIdAndUpdate(id, {
        name: req.body.name,
        city: req.body.city,
    }, {
        new: true
    })
        .then(user => {
            console.log('Updated user - ', user)
            res.json(user);
        })
        .catch(err => res.json(err))
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log('Delete ', id)
    UserModel.findByIdAndDelete(id)
        .then((deleteResponse) => {
            console.log('Delete Response ', deleteResponse)
            UserModel.find({})
                .then(users => {
                    res.json(users);
                })
                .catch(err => {
                    res.json(err);
                })
        })
        .catch(err => res.json(err))
    // UserModel.find({})
    // .then(users=>{
    //     res.json(users);
    // })
    // .catch(err => {
    //     res.json(err);
    // })
})


app.listen(5000, () => {
    console.log('Server is running on port:5000');
})