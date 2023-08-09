import express, { Application, Request, Response } from "express";
import cors from "cors"
import { Configuration, OpenAIApi } from "openai"
import * as dotenv from "dotenv"
dotenv.config()
const PORT: number = 8000

const app: Application = express()
app.use(cors())
app.use(express.json())

const API_KEY = null; // not given for security reasons

const configuration = new Configuration({
  apiKey: `Bearer ${API_KEY}`, // Add "Bearer" before the API key
});

const openai = new OpenAIApi(configuration);

app.post("/completions", async (req: Request, res: Response) => {
  try {
    const completions = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "user", 
          content : "Create a SQL request to " + req.body.message
        }
      ]
    })
    res.send(completions.data.choices[0].message)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" }) 
  }
})

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`))