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
var national = {}
var list_province = [];

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

fs.readFile(path.join(__dirname, '../variables/national.json'), (err, data) => {
    if (err) throw err;
    national = JSON.parse(data);
    national = { penambahan: national.update.penambahan, total: national.update.total}
    console.log("national data imported");
});

fs.readFile(path.join(__dirname, '../variables/province.json'), (err, data) => {
    if (err) throw err;
    list_province = JSON.parse(data).list_data;
    console.log("province data imported");
});

function getZoneByLocation (lon, lat){
    return list_zone.sort((now, next) => (Math.abs(now.loc.lat - lat) + Math.abs(now.loc.lon - lon)) - (Math.abs(next.loc.lat-lat)+Math.abs(next.loc.lon-lon)))[0]
}
function getZoneByKecamatan (id_kecamatan){
    console.log("kecamatan:", id_kecamatan)
    return list_zone.find(value => (value.kode_kecamatan === id_kecamatan))
}

router.get('/national', function (req, res, next) {
    res.send(national);
})

router.get('/province/:prov', function (req, res, next) {
    var prov_name = req.params.prov.toUpperCase();
    res.send(list_province.find(value => (value.key === prov_name)))
})

router.get('/kecamatan/:id', function(req, res, next) {
    var id = req.params.id;
    var kecamatan = list_kecamatan.find(values => values[0] === id);
    kecamatan = {id: kecamatan[0], prov: kecamatan[1], kab: kecamatan[2], kec: kecamatan[3]};
    res.send(JSON.stringify(kecamatan));
});

router.get('/zone/:location', function(req, res, next) {
    var location = querystring.parse(req.params.location);
    if(typeof location.kecamatan === "undefined") res.send(getZoneByLocation(location.lon, location.lat));
    else res.send(getZoneByKecamatan(location.kecamatan))
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

router.get('/search/:name', function (req, res, next) {
    var name = req.params.name.toUpperCase();
    // console.log(name);
    // console.log("ini list kecamatan",list_kecamatan);
    var kecamatan = list_kecamatan.filter(value => (value[1].toUpperCase().search(name)>=0 || value[2].toUpperCase().search(name)>=0 || value[3].toUpperCase().search(name)>=0))
    kecamatan = kecamatan.slice(0,5);
    res.send(kecamatan.map(value => (
        {id: value[0], text: value[3] + ", " + value[2] +", " + value[1]}
    )))
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