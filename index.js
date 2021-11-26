const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;


//myDbAssignment
//XhM2uBAaXk569EhP


// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ezuap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run() {
    try {
        await client.connect();
        //console.log('databese connected');
        const databese = client.db('assignment_DB');
        const offerCollection = databese.collection('offers');

        // GET Offers API
        app.get('/offers', async (req, res) => {
            const cursor = offerCollection.find({});
            const offers = await cursor.toArray();
            res.send(offers);
        })

        // POST API
        app.post('/offers', async (req, res) => {
            // const service = {
            //     "category": "10 Doctor available",
            //     "docName": "Dr. Lloyd Wilson",
            //     "name": "Neurological Services",
            //     "image": "https://media.istockphoto.com/photos/indian-doctor-picture-id179011088?s=170667a",
            //     "img": "https://medschool.cuanschutz.edu/images/librariesprovider61/default-album/n_fellowship.jpg?sfvrsn=be7c74b9_4",
            //     "price": "24/7 provide services",
            //     "duration": "specialized",
            //     "text": "Neurologists diagnose, treat and manage disorders that affect the central nervous system (the brain and spinal cord) and the peripheral nervous system "
            // }
            // const result = await servicesCollection.insertOne(service);
            // console.log(result);



            const offer = req.body;
            console.log('hit the post api', offer);
            const result = await offerCollection.insertOne(offer);
            console.log(result);
            res.send(result)
        })
    }
    finally {
        //await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('assignment11 server is running');
});

app.listen(port, () => {
    console.log('Server running at port', port)
})