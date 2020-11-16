var express = require('express');
var fs = require('fs');
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const { auth } = require('../const');
const { exec } = require('child_process');
const link = [
    {url: 'https://dekontaminasi.com/api/id/covid19/hospitals', file_path: path.join(__dirname, '../variables/hospitals.json')},
    {url: 'https://api-rdt-v2.bersatulawancovid.id/dev/location/all_rawan', file_path: path.join(__dirname, '../variables/zone.json')},
    {url: 'https://data.covid19.go.id/public/api/update.json', file_path: path.join(__dirname, '../variables/national.json')},
    {url: 'https://data.covid19.go.id/public/api/prov.json', file_path: path.join(__dirname, '../variables/province.json')}
]
var last_update = new Date();

async function updateFiles(url, file_path){
    exec("curl " + url + " > " + file_path, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
            return false;
        }
        return true;
    });
}
function checkauth(password) {
    return bcrypt.compareSync(password, auth);
}
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/update', urlencodedParser, async function (req, res, next) {
    var err = false
    var date = new Date()
    if ((date-last_update)/36e5<1)
        res.send({status:"error", msg:"wait for the next hour"})
    else if(checkauth(req.body.password)){
        link.map(async values => {
            if(!await updateFiles(values.url, values.file_path))
                err = true;
        })
        if(err)
            res.send({status:"error", msg:"unable to fetch new data"})
        else
            res.send({status:"success"});
    }
    else
        res.send({status:"error", msg:"auth failed"})
})

function unusedId(array){
    array.sort(function(a, b) { return a-b; });   // To sort by numeric

    if(array.length>0){
        var lowest = -1;
        for (i = 0;  i < array.length;  ++i) {
            if (array[i] !== i) {
                lowest = i;
                break;
            }
        }
        if (lowest === -1) {
            lowest = array[array.length - 1] + 1;
        }
        return lowest
    }
    else return 0;
}

router.post('/recomendation/add', urlencodedParser, function (req, res, next) {
    if(checkauth(req.body.password)){
        fs.readFile(path.join(__dirname, '../variables/recomendation.json'),'utf-8', function readFileCallback(err, data) {
            if (err) throw err;
            var ids =[];
            var list_recomendations = JSON.parse(data);
            list_recomendations.forEach(value => {ids.push(parseInt(value.id))});
            console.log(ids);
            list_recomendations.push({id:unusedId(ids), zone: req.body.zone, rec: req.body.rec});
            console.log(list_recomendations)
            fs.writeFileSync(path.join(__dirname, '../variables/recomendation.json'), JSON.stringify(list_recomendations));
            res.send({status:"success"})
        });
    }
    else
        res.send({status:"error", msg:"auth failed"})
})

router.post('/recomendation/remove', urlencodedParser, function (req, res, next) {
    if(checkauth(req.body.password)){
        fs.readFile(path.join(__dirname, '../variables/recomendation.json'),'utf-8', function readFileCallback(err, data) {
            if (err) throw err;
            var list_recomendations = JSON.parse(data);
            list_recomendations = list_recomendations.filter(value=>(value.id !== parseInt(req.body.id)))
            fs.writeFileSync(path.join(__dirname, '../variables/recomendation.json'), JSON.stringify(list_recomendations));
            res.send({status:"success"})
        });
    }
    else
        res.send({status:"error", msg:"auth failed"})
})



module.exports = router;