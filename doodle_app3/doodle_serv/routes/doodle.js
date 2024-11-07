var express = require('express');
var router = express.Router();
const fs = require('node:fs');
const path = require('node:path')
const uniqueFilename = require('unique-filename');

const doodleImgDir = path.join(__dirname, '..', 'public', 'doodles');
if (!fs.existsSync(doodleImgDir)) {
  fs.mkdirSync(doodleImgDir);
}

function saveImage(dataUrl) {
  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
  const imgPath = uniqueFilename(doodleImgDir)+'.png'
  fs.writeFileSync(imgPath, base64Data, 'base64');
  return path.basename(imgPath);
}

router.post('/upload', function(req, res, next) {
  let imgPath = saveImage(req.body.image);
  console.log('File name: '+imgPath);
  res.send(imgPath);
});

module.exports = router;
