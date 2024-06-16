const express = require('express');
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const Auth = require('./router/Auth')
const Folder = require('./router/Folder')
const Images = require('./router/Images')


dotenv.config()
const app = express()

app.use(cors({
    origin: 'https://wind-storage.netlify.app',
    credentials: true,
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json())



const PORT = process.env.PORT || 5000;

// ROUTER
app.use('/auth', Auth)
app.use('/folder', Folder)
app.use('/upload', Images)



// CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('CONNECT TO MONGO DB');
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });

app.listen(PORT, () => {
    console.log("Server is running !")
})