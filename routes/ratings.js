var express = require('express');
var router = express.Router();

const sql = require("mssql");
const dbConfig = require("../config");

const getAllData = async() => {
    const connection = await sql.connect(dbConfig);
    const result = await connection.request().query("SELECT ID, UserID, Rating, DeviceID, DateTime FROM Ratings");
    return result;
};

router.get('/', async function(req, res, next) {
    const data = await getAllData();

    const resp = {
        data: data.recordsets[0]
    };
    res.type("json");
    res.send(resp);
});

module.exports = router;
