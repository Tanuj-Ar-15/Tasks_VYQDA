const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 1700;


app.get('/', async (req, res) => {

    const { phone } = req.query;

    let finalPhone = phone ? phone : "9627096959"
    try {

        const url = 'https://chimpu.online/api/post.php';
        const postData = { phonenumber: finalPhone };


        const response = await axios.post(url, postData);

        const headers = response.headers;

        res.send(`
            <h1>Response Headers</h1>
            <pre>${JSON.stringify(headers, null, 2)}</pre>
        `);
    } catch (error) {

        res.send(`
            <h1>Error</h1>
            <pre>${error.message}</pre>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
