const express = require ('express');
const path = require ('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Trip = require('./models/trip');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/travelSurvey', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Check Connection
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
})



// Middleware
app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));

// Routescls
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const surveyData = new Survey({
        from: req.body.from,
        to: req.body.to,
        mode: req.body.mode,
        purpose: req.body.purpose,
    });

    surveyData.save()
        .then(() => res.send('Survey submitted successfully!'))
        .catch(err => res.status(400).send('Error saving survey data: ' + err));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});