const express = require('express');
const { listen } = require('express/lib/application');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');
const { response } = require('express');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile=require('./Controllers/profile');
const image=require('./Controllers/image')

const db = knex({
    
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '224898',
        database: 'smart-brain'
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send(database.users);
})


app.post('/signin', signin.handleSignin( db, bcrypt) )

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })


app.get('/profile/:id', (req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(3000, () => {
    console.log('app is running on port 3000 ');
})

