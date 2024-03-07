const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer();

router.get('/', (_, res) => res.send('Server is Up!'));

router.post('/analyze-car-image', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({error: 'No file uploaded'});

    const imageBuffer = req.file.buffer;
    // analyseUploadedImage(imageBuffer);
    analyzeImageFromFile(imageBuffer);

    res.json({message: 'File uploaded successfully'});
});

module.exports = router;
