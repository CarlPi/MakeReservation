/**
 * Created by ErkaPi on 2/3/17.
 */
var express = require('express');
var app = express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser');  // pull information from HTML POST

mongoose.connect('mongodb://localhost:27017/booking');
var reservation = mongoose.model('reservation', {
    first_name: String,
    contact_info: String,
    date: String,
    time: String,
    party_size: Number
});

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.post('/booking', function(req, res){
    console.log(req);
    console.log(req.body);
    reservation.create({
        first_name: req.body.firstName,
        contact_info: req.body.contactInfo,
        date: req.body.date,
        time: req.body.time,
        party_size: req.body.partySize
    }, function(err, itemArray1) {
        if (err) {
            res.send(err);
        }
        console.log(itemArray1);
        res.json(itemArray1);
    });

    console.log('Connection success');
});

app.post('/editBooking', function(req, res){
    // console.log(req.body);
        reservation.find({_id:req.body.editCCode}, function(err, itemArray2) {
            if (err) {
                res.send(err);
            }
            reservation.find({_id: req.body.editCCode}, function (err, a) {
                res.json(a);
                // console.log(a)
            })
            // console.log(itemArray2);
            // res.json(itemArray2);
        });
    console.log('Connection success');
});

app.post('/changeBooking', function(req, res) {
    reservation.update({_id: req.body.cCode}, {
            first_name: req.body.firstName,
            contact_info: req.body.contactInfo,
            date: req.body.date,
            time: req.body.time,
            party_size: req.body.partySize
        }, function(err, b){
                if (err) {
                    res.send(err);
                }
                console.log(b);
    });
    console.log('Connection success');
});

app.post('/deleteBooking', function(req, res) {
    reservation.remove({_id:req.body.cCode}, function(err, c) {
        if(err) {
            res.send(err);
        }
        console.log(c);
    });
    console.log('Connection success');
})

app.listen(3000)

console.log('Server running on port 3000')

