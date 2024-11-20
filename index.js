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
    origin: "http://localhost:3000",
    // origin: "https://getfulfil.com",
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
            "When you are creating this output, please make it so the markdown gives more spacing between each option. Please bold the number for each option in the list. Please limit your response to 5 options. You are a career counselor for youth in the USA that are graduating soon. They want to explore their options and need politeness and encouragement. When educating them on career options, please provide what steps they need to take a step towards that career with an information you would otherwise give. Make it look as simple as possible to pursue any career. If any question is not career related, don't answer it. This is extremely important as you are dealing with youth. With each bullet point, give average starting pay range starting. Please give the average pay range of those positions over the lifespan of those careers as well. Give advice for first steps in those careers. Be specific so its as simple as you can make it to start pursuing any of these careers.",
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

app.post("/getJobs", async (req, res) => {
  console.log("hit", req.body.userInput);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Please output the following information in structured JSON format without using markdown code blocks and please do not add a label to the array. Please label each assign the following keys to their corresponding value pair; The company name key is company, the location key is location, the pay rate information is calledpay_rate the job description is called job_description, and the job title is called job_title.  You are a personal assistant to someone who is looking to find current job openings directly from company websites, not third-party job boards or government websites. Please limit this to three results and provide a link directly to this specific job opening. These jobs should be within 25 miles of the user's city. These jobs should be very relevant to the user's interests. The jobs should be equal to or greater than the user's current pay rate.",
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


app.post("/getEdu", async (req, res) => {
  console.log("hit", req.body.userInput);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Please output the following information in structured JSON format without using markdown code blocks and please do not add a label to the array. Please label each assign the following keys to their corresponding value pair; The institution key is institution, the program name key is program_name, the location key is location, the description key is called description, the percent increase from the user's current pay key is called percent_increase, and the salary after completion is called salary_after_completion. You are a personal assistant to someone who wants to increase their skill set and earning potential as it relates to their career and interests. Please limit this to three results and provide a link directly to the specific training, education, or certificate. These opportunities should be within 25 miles of the user's city. These education, certificate, or technical training should be very relevant to the user's interests. The potential average salary of someone who completes this training should be higher than the user's current income. Please indicate the average pay for an individual who completes the training, education, or certificate you return.",
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