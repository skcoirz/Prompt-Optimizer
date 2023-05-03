import {ResponseData} from "./ResponseData";
import {Express, NextFunction, Request, Response} from "express";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {Configuration, OpenAIApi} = require("openai");

const {OPENAI_API_KEY} = process.env;

const configuration = new Configuration({apiKey: OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(9797, (): void => {
    console.log(`serverStarted:`);
});

app.post("/image", (req: Request, res: Response, next: NextFunction): void => {
    const {prompt} = req.body;
    console.log(`[API] image: prompt: ${prompt}`);

    openai.createImage({
        prompt,
        n: 1,
        size: "256x256",
    }).then((response: any): void => {
        let result = response.data.data[0].url
        console.log(`[API] image: ${result}`);
        res.json(new ResponseData(200, result))
        // res.send(result)
    }).catch((ex: Error): void => {
        console.log(`[ERROR][API] image: ${ex.message}`);
        next(ex);
    });
});


app.post("/chat", (req: Request, res: Response, next: NextFunction): void => {
    const {prompt} = req.body;

    console.log(`[API] chat: ${prompt}`);
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: prompt
        }],
    }).then((response: any): void => {
        const result = response.data.choices[0].message.content;
        console.log(`[API] chat: ${result}`);
        res.json(new ResponseData(200, result))
        // res.send(result)
    }).catch((ex: Error): void => {
        console.log(`[ERROR][API] chat: error.status: ${ex.name}, ex.message: ${ex.message}`);
        next(ex);
    });
});


const errorLogger = (error: Error, request: Request, response: Response, next: NextFunction): void => {
    console.log(`errorLogger: ${error.message}`)
    next(error)
};

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction): void => {
    console.log(`errorHandler:`);
    // next(error)

    // let err = new Error(`processing error in request at ${request.url}`)
    // err.statusCode = 401
    // throw err
    response.json(new ResponseData(500, error.message))
};

app.use(errorLogger);
app.use(errorHandler);