require("dotenv").config();  // 👈 must be first
const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(bodyParser.json());
console.log("Loaded key:", process.env.GOOGLE_API_KEY ? "Yes ✅" : "No ❌");

app.post("/getResponse", async (req, res) => {
    try {
        console.log(req.body.question)
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(
            req.body.question
        );
        console.log("Response from API:", result.response.text());
        res.json({ response: result.response.text() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;
