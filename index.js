const { OpenAI } = require("openai");

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.listen(8000);
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://getfulfil.com",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("here we go");

app.post("/careerPathGeneration", async (req, res) => {
  console.log("hit", req.body.userInput);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "When you are creating this output, please make it so the markdown gives more spacing between each option. Please bold the number for each option in the list. Please limit your response to 5 options. You are a career counselor for youth in MN that are graduating soon. They want to explore their options and need politeness and encouragement. When educating them on career options, please provide what steps they need to take a step towards that career with an information you would otherwise give. Make it look as simple as possible to pursue any career. If any question is not career related, don't answer it. This is extremely important as you are dealing with youth. With each bullet point, give average pay range starting and total average in mn, also give advice for first steps in those careers. Be specific so its as simple as you can make it to start pursuing any of these careers.",
        },
        {
          role: "user",
          content: req.body.userInput,
        },
      ],
    });

    console.log(completion.choices[0].message);

    const message = completion.choices[0].message;

    res.json({
      message: message,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});


app.post("/aiResumeCreation", async (req, res) => {
    console.log("hit", req.body.userInput);
  
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
            
              "You are a professional resume builder. Please create a resume based off of the information the user gives you",
          },
          {
            role: "user",
            content: req.body.userInput,
          },
        ],
      });
  
      console.log(completion.choices[0].message);
  
      const message = completion.choices[0].message;
  
      res.json({
        message: message,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });
