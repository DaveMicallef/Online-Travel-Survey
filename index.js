const express = require ('express');
const app = express();
const path = require ('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Trip = require('./models/trip');


const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/travelSurvey', {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(()=>{
        console.log("Connection open")
    })
    .catch(err=>{
        console.log("Connection failed!")
        console.log(err)
    })

// Middleware
app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));

// Routescls
app.get('/', async(req, res) => {
    res.render('index');
});

app.post('/submit',async(req, res) => {

    const {from,to,mode,purpose}= req.body;
    
    // Check if all fields are provided
    if (!from || !to || !mode || !purpose)  {
        return res.status(400).send('All fields are required');
    }

    const newTrip = new Trip({from,to,mode,purpose});
    
    try{
        await newTrip.save();
        res.redirect('/')
    }catch(err){
        console.error(err);
        res.status(500).send('Error saving trip.')
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});