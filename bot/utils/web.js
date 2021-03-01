const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

module.exports = (client) => {
    try {
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        router.post('/new',(request,response) => {
            if (client.config.web.tokens.includes(request.body.xAuth)) {
                client.post.new(request.body.content)
                response.sendStatus(200);
                response.end();
            } else {
                response.sendStatus(403);
                response.end();
            }
        });

        app.use("/", router);
        app.listen(client.config.web.port, null, null, () => console.log(`Webhook is up and running on port ${client.config.web.port}.`));
    } catch(e) {
        console.log(e)
    }
}