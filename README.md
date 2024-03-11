# Mission Ready - Mission 2

## Prototype to Showcase AI Solution

The digital team at Turners would like to prototype a solution that allows a user to upload the picture of a car, and then find a similar car in their stock to recommend to customer. Build an application (either runs on your laptop or on the cloud) that can recognise motor vehicles (even better if it recognises certain types of vehicles, e.g. sedan vs hatchback) using a cloud-based AI service on Microsoft Azure (or AWS or Google Cloud). You can copy code from tutorials you find online, but make sure you read through the code so that you understand the code.

# About

For this project I've used Google Gemini AI API.
You'll need a Google Cloud Acc activated. (The First time you sign up grants you a generous value on credits to experiment)

# Instructions

Before bullet pointing the steps I want to drop the repo that made me understand those API's [Generative AI JS](https://github.com/google/generative-ai-js/blob/main/samples/node/simple-text-and-images.js)

### Step 1

After sign up for Google Cloud, [Create a New Project](https://console.cloud.google.com/projectcreate) on the cloud console

### Step 2

Create your API Key for the project you just created. For some reason, creating the API Key through the Cloud Console did not work well for me.
Instead, go on the the [AI Studio](https://makersuite.google.com/app/apikey) and create the key, linking it to your project. In the end of the day all your keys and credentials can be seen on the Cloud Console.

### Step 3

Now, on the backend folder create a .env file and add your key

    API_KEY = <Your API Key yadayada>

### Step 4

After you clone the repo, the submodules files still need to be downloaded. For that enter

```
git submodule init
git submodule update
```

the Init is only necessary on the first time you're getting thoes repos files.
You might need to use a --recursive flag to update them.

```
git submodule update --recursive
```

### Step 5

With that out of the way, the rest is pretty standard
On both frontend and backend folders do:

```
npm i
npm run dev
```

with both servers up, click on the link for the front end and try to analyse a car image.

---

# Big Thanks

Big thanks to [Vlad](https://github.com/ntLeo/Mission-2/blob/main/src/components/ai-with-image.tsx).
Your code helped me to make sense of this task.

# Code Reviews from

[Nathan](https://github.com/Nathan51888)
