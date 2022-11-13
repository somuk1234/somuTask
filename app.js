const express = require('express');
const app = express();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./config/somu-task-6f66e8bbc5b9.json');
app.use(express.json());
const doc = new GoogleSpreadsheet('1XJx6hAjV5hnUDlewm6o9KeNh79b_dckGd3UMJyBrE_8');

async function init(){
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    await doc.updateProperties({ title: 'UserData' });
    sheet = doc.sheetsByIndex[0];
}

app.post('/save-data', async function (req, res) {
    console.log(req.body)
    let dataToSave = req.body.data;
    const sheet = doc.sheetsByIndex[0];
    let response={};
    response.error = "";
    try {
        await sheet.addRow({ data : dataToSave });
    }catch(e) {
        response.error = e.message;
    }
    res.send(response);
})

const server = app.listen(8081, async function () {
    const host = server.address().address
    const port = server.address().port
    await init();
    console.log("Example app listening at http://%s:%s", host, port)
})