const fm = require('@jginsburgn/formidable-middleware')
const fs = require('fs')
const process = require('process')
const path = require('path')
const cp = require('child_process')
const express = require('express')
const app = express()
const port = 3000

const formidableFormConfiguration = {
  maxFileSize: 10 * 1024 ** 3 // 10 GB
};
app.post('/test', fm.FormidableMiddleware(formidableFormConfiguration), (req, res) => {
  for (let file of req.body.files) {
    const currentPath = file.file.path;
    fs.renameSync(currentPath, path.join(process.cwd(), "image.jpg"));
    res.send(cp.execSync("python main.py 2>/dev/null").toString());
  }
});
app.use(express.static('static'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))