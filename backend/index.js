const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://web-dev-final-3d037.firebaseio.com"
});

const db = admin.firestore();

const app = express();
app.use(bodyParser.json());
app.use(express.json());
const port = 8080;

app.get('/', function(req, res) {
    res.send('Welcome home!');
});

const paraCollection = db.collection('essay');

// create a new paragraph
app.post('/createPara', async function(req, res) {
    const para = req.body;
    const addedPara = await paraCollection.add(para);
    res.send(addedPara.id);
});

// read
app.get('/getParas', async function(req, res) {
    const paras = await paraCollection.get();
    res.json(paras.docs.map(para => 
        ({ ...para.data(), id: para.id })));
});

app.get('/getParaById', async function (req, res) {
    const ID = req.query.id;
    await paraCollection.doc(ID).get()
    .then((docRef) => { res.send(docRef.data()) });
    // console.log(d.getData());
    // res.json(d.map(para => 
    //     ({ ...para.data(), id: para.id })));
    // res.send(d);
    // res.json(idDoc.docs.map(para => 
    //     ({ ...para.data(), id: para.id })));
})

// update paragraph
app.post('/updateItem1', async function(req,res) {
    const {id, item1} = req.query;
    await paraCollection.doc(id).update({item1});
    res.send(item1);
});

app.post('/updateItem2', async function(req,res) {
    const {id, item2} = req.query;
    await paraCollection.doc(id).update({item2});
    res.send(item2);
});

app.post('/updateItem3', async function(req,res) {
    const {id, item3} = req.query;
    await paraCollection.doc(id).update({item3});
    res.send(item3);
});

app.post('/updateItem4', async function(req,res) {
    const {id, item4} = req.query;
    await paraCollection.doc(id).update({item4});
    res.send(item4);
});

app.post(`/switchItem`, async function(req, res) {
    const {id, item1, item2, item3, item4} = req.query;
    await paraCollection.doc(id).update({item1});
    await paraCollection.doc(id).update({item2});
    await paraCollection.doc(id).update({item3});
    await paraCollection.doc(id).update({item4});
    const newParagraph = new Array(item1, item2, item3, item4);
    res.send(newParagraph);
})

// delete
app.delete('/deletePara', async function(req, res) {
    const id = req.query.id;
    await paraCollection.doc(id).delete();
});

app.listen(port, function() {console.log('app started')});