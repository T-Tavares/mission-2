const app = require('./app.js');
const router = require('./src/routers/router.js');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is up at:\nhttp://localhost:${PORT}`);
});
