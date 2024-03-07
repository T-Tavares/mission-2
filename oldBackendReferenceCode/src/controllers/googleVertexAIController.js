require('dotenv').config();
// const img = require('../assets/bmw-i4.jpg');
/* 
    Reference Links

    https://www.youtube.com/watch?v=0qv_4x1K6hU&list=PLbOxXDHbJ6H0sPtHSvANLcU8G2MnbA22l&index=1
    https://www.youtube.com/watch?v=oJDBCA7ftjw

    https://cloud.google.com/vertex-ai/?hl=en_GB&_gl=1*1jabh3b*_ga*NDI0NzU0MTY4LjE3MDkxODkzMTc.*_ga_WH2QY8WWF5*MTcwOTc3MjM1Mi4xMi4xLjE3MDk3NzI3MzYuMC4wLjA.&_ga=2.148694834.-424754168.1709189317

    https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal?cloudshell=true#gemini-beginner-samples-nodejs
    

    https://cloud.google.com/functions/docs/configuring/env-var#gcloud


    Environment Variables
    https://medium.com/@nwosupaul141/configuring-your-local-dev-environment-for-google-cloud-resources-7f2f71adcc21 
    
    GCloud 
    https://cloud.google.com/sdk/docs/install   
    https://cloud.google.com/colab/docs/authentication
    https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini
    https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal
*/

const {VertexAI} = require('@google-cloud/vertexai');

async function createNonStreamingMultipartContent(
    projectId = process.env.project_id,
    location = 'us-central1',
    model = 'gemini-1.0-pro-vision',
    image = '../assets/bmw-i4.jpg',
    mimeType = 'image/jpeg'
) {
    // Initialize Vertex with your Cloud project and location
    const vertexAI = new VertexAI({project: projectId, location: location});

    // Instantiate the model
    const generativeVisionModel = vertexAI.getGenerativeModel({
        model: model,
    });

    // For images, the SDK supports both Google Cloud Storage URI and base64 strings
    const filePart = {
        fileData: {
            fileUri: image,
            mimeType: mimeType,
        },
    };

    const textPart = {
        text: 'what is shown in this image?',
    };

    const request = {
        contents: [{role: 'user', parts: [filePart, textPart]}],
    };

    console.log('Prompt Text:');
    console.log(request.contents[0].parts[1].text);

    console.log('Non-Streaming Response Text:');
    // Create the response stream
    const responseStream = await generativeVisionModel.generateContentStream(request);

    // Wait for the response stream to complete
    const aggregatedResponse = await responseStream.response;

    // Select the text from the response
    const fullTextResponse = aggregatedResponse.candidates[0].content.parts[0].text;

    console.log(fullTextResponse);
}

createNonStreamingMultipartContent();
