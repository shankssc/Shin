import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts',postRoutes);
app.use('/user', userRoutes);

//Connecting to the MongoDB Cluster
/*Note:- If you are using any special symbols in your password, then you must substitute it
with % symbol followed by its hex code*/
const CONNECTION_URL = 'mongodb+srv://shankssc22:Beelzebub%4022@cluster0.y7bao9v.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//The below line makes sure that we don't get any warnings in the console
//mongoose.set('useFindAndModify', false);

