var express = require('express');
var fs = require('fs');
var router = express.Router();
const path = require('path');
var csv_parser = require('csv-parse');
var querystring = require('querystring');
var bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const { auth } = require('../const');
// var file_kecamatan = require('../variables/kecamatan.csv')

var list_kecamatan = [];
var list_zone = [];
var list_hospital = [];
var list_rekomendation = [];
var last_update = new Date();

fs.createReadStream(path.join(__dirname, '../variables/kecamatan.csv'))  .pipe(csv_parser())
    .on('data', (data) => list_kecamatan.push(data))
    .on('end', () => {
         console.log("kecamatan imported");
    });

fs.readFile(path.join(__dirname, '../variables/zone.json'), (err, data) => {
    if (err) throw err;
    list_zone = JSON.parse(data).status.data;
    console.log("zone imported");
});

fs.readFile(path.join(__dirname, '../variables/hospitals.json'), (err, data) => {
    if (err) throw err;
    list_hospital = JSON.parse(data);
    console.log("hospital imported");
});

fs.readFile(path.join(__dirname, '../variables/recomendation.json'), (err, data) => {
    if (err) throw err;
    list_rekomendation = JSON.parse(data);
    console.log("recomendation imported");
});

function getZone (lon, lat){
    return list_zone.sort((now, next) => (Math.abs(now.loc.lat - lat) + Math.abs(now.loc.lon - lon)) - (Math.abs(next.loc.lat-lat)+Math.abs(next.loc.lon-lon)))[0]
}

router.get('/kecamatan/:id', function(req, res, next) {
    var id = req.params.id;
    var kecamatan = list_kecamatan.find(values => values[0] === id);
    kecamatan = {id: kecamatan[0], prov: kecamatan[1], kab: kecamatan[2], kec: kecamatan[3]};
    res.send(JSON.stringify(kecamatan));
});

router.get('/zone/:location', function(req, res, next) {
    var location = querystring.parse(req.params.location);
    res.send(getZone(location.lon, location.lat));
});

router.get('/hospital/:prov', function (req, res, next) {
    var prov = req.params.prov;
    var hospital = list_hospital.filter(values=>(values.province === prov))
    res.send(JSON.stringify(hospital))
})

router.get('/recomendation/:zone', function (req, res, next) {
    var zone = req.params.zone;
    var recomendations = list_rekomendation.filter(value => (value.zone === zone))
    res.send(JSON.stringify(recomendations));
})

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/update', urlencodedParser, function (req, res, next) {
    var password = req.body.password;
    if(bcrypt.compareSync(password, auth)){
        var date = new Date();
        if((date - last_update)/36e5>1){
            fs.readFile(path.join(__dirname, '../variables/zone.json'), (err, data) => {
                if (err) throw err;
                list_zone = JSON.parse(data).status.data;
                console.log("zone updated");
            });

            fs.readFile(path.join(__dirname, '../variables/hospitals.json'), (err, data) => {
                if (err) throw err;
                list_hospital = JSON.parse(data);
                console.log("hospital updated");
            });

            fs.readFile(path.join(__dirname, '../variables/recomendation.json'), (err, data) => {
                if (err) throw err;
                list_rekomendation = JSON.parse(data);
                console.log("recomendation updated");
            });

            res.send({status: "success"});
        }
        else
            res.send({status:"error", msg:"wait for the next hour"});
    }
    else
        res.send({status:"error", msg:"auth failed"})

})

module.exports = router;