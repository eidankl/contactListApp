var express = require('express');
var app = express();
//require mongojs
var mongojs = require('mongojs');
//choose which mongo db database collection
var db = mongojs('contactlist', ['contactlist']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/contactlist', function(req,res){
    console.log("I received get request");

     db.contactlist.find(function(err, docs) {
         console.log("The docs are:");
         console.log(docs);
         //respond to the GET request with json of contact list
         res.json(docs);
     });

});

app.post('/contactlist', function(req, res){
    console.log("the req.body is:");
    console.log(req.body);
    //insert the data to data base
    db.contactlist.insert(req.body, function(err,doc){
        res.json(doc);
    });
});

app.delete('/contactlist/:id', function(req, res){
    //get the value ID from the url
    var id =  req.params.id;
    console.log("The ID is:" + id);
    //delete data from data base
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.get('/contactlist/:id', function(req, res){
    //get the value ID from the url
    var id =  req.params.id;
    console.log("The ID is:" + id);
    //update  data from data base
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
        res.json(doc);
    });
});

app.put('/contactlist/:id', function(req, res){
    var id =  req.params.id;
    console.log("The Name in body req is:" + req.body.name);
    //modify the contact
    db.contactlist.findAndModify({query:{_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email:req.body.email, number: req.body.number}},
        new: true}, function(err, doc){
        res.json(doc);
    });
});

app.listen(3000);
console.log("Server running on port 3000");

