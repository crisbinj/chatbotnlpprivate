const express = require('express');
const bodyParser = require('body-parser');
 // Make sure to install node-fetch using: npm install node-fetch
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/sendMessage', async (req, res) => {
    const userMessage = req.body.userMessage;

    try {
        const replyMessage = await generateReply(userMessage);
        res.send({ replyMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ replyMessage: 'Internal Server Error' });
    }
});

async function generateReply(userMessage) {
    try {
        const res = await fetch(`https://hercai.onrender.com/v3/hercai?question=${userMessage}`);

        if (res.status === 200) {
            const json = await res.json();
            if (json.reply) {
                console.log(json.reply);
                return json.reply;
            } else {
                throw "AI service did not return a successful response.";
            }
        } else {
            throw `Failed to fetch data. Status code: ${res.status}`;
        }
    } catch (error) {
        throw `Error in generateReply: ${error.message || error}`;
    }
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
