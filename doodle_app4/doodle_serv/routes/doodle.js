var express = require('express');
var router = express.Router();
const { writeFile, readdir } = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path')
const uniqueFilename = require('unique-filename');

const doodleImgDir = path.join(__dirname, '..', 'public', 'doodles');
if (!fs.existsSync(doodleImgDir)) {
  fs.mkdirSync(doodleImgDir);
}

async function saveImage(dataUrl) {
  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
  const imgPath = uniqueFilename(doodleImgDir)+'.png'
  await writeFile(imgPath, base64Data, 'base64');
  return path.basename(imgPath);
}

router.post('/upload', async function(req, res, next) {
  let imgPath = await saveImage(req.body.image);
  console.log('File name: '+imgPath);
  res.send(imgPath);
});

async function randomDoodle(npics) {
  let files = await readdir(doodleImgDir);
  let pngs = files.filter((fname)=>fname.endsWith('.png'));
  let images = [];
  if (pngs.length>0) {
    for (i=0; i<npics; i++) {
      let idx = Math.floor(Math.random()*pngs.length);
      images.push(pngs[idx]);
    }
  }
  return images;
}

router.get('/api/random/:npics', async (req, res, next) => {
  let npics = req.params.npics;
  let images = await randomDoodle(npics);
  res.send({images});
});
router.get('/random/:npics', async (req, res, next) => {
  let npics = req.params.npics;
  let images = await randomDoodle(npics);
  res.render('randomdoodles', {images});
});

module.exports = router;
