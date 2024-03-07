// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const fs = require('fs');
const {ImageAnalysisClient} = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const {AzureKeyCredential} = require('@azure/core-auth');

// Load the .env file if it exists
const dotenv = require('dotenv');
dotenv.config();

const endpoint = process.env.ENDPOINT;
const key = process.env.KEY_CREDENTIAL;
const credential = new AzureKeyCredential(key);

const client = createClient(endpoint, credential);

const feature = ['Caption', 'DenseCaptions', 'Objects', 'People', 'Read', 'SmartCrops', 'Tags'];
const imagePath = '../../images_ai_workplace/uploadedImage.jpg';

async function saveImageToServer(dataBuffer, imgName) {
    const buffer = Buffer.from(dataBuffer, 'base64');
    fs.writeFileSync('images_ai_workplace/uploadedImage.jpg', buffer);
}

async function analyzeImageFromFile(imagePath) {
    // const imageBuff = Buffer.from(dataBuffer);
    const imageBuffer = fs.readFileSync(imagePath);

    const result = await client.path('/imageanalysis:analyze').post({
        body: imageBuffer,
        queryParameters: {
            features: feature,
            'smartCrops-aspect-ratios': [0.9, 1.33],
        },
        contentType: 'application/octet-stream',
    });

    const iaResult = result.body;

    // Log the response using more of the API's object model
    // console.log(`Model Version: ${iaResult.modelVersion}`);

    if (iaResult.captionResult) {
        console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
    }
}

analyzeImageFromFile('../../images_ai_workplace/uploadedImage.jpg');

module.exports = analyzeImageFromFile;
