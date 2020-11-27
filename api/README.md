## BackEnd API documentation
password = `password123`
- fetch nearest hospitals list : `http:get`
`/api/hospital/<province-name>`
- fetch zone type and id kecamatan : `http:get`
                                     `/api/zone/lat=<geolocation_latitude>&lon=<geolocation_longitude>`
- fetch kecamatan information : `http:get`
                                `/api/kecamatan/<id_kecamatan>`
- fetch recomendation list : `http:get`
                             `/api/recomendation/<zone_type>`
- fetch national data : `http:get` `/api/national`
- fetch province data : `http:get` `/api/province/<province_name>`
- update database(file) using latest data from public API : `http:post` `/variables/update`
    + `password=<api-password>`
- update API using latest database(file) : `http:post` `/api/update`
    + `password=<api-password>`
- add recomendation : `http:post` `/variables/recomendation/add`
    + `password=<api-password>`
    + `zone=<zone_type>`
    + `title=<recomendation_title>`
    + `caption=<recomendation_caption>`
- remove recomendation : `http:post` `/variables/recomendation/remove`
    + `password=<api-password>`
    + `id=<id_recomendation>`   
                                                   
