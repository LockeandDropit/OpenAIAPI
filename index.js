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
      // stream:   true,
      messages: [
        {
          role: "system",
          content: "Please return the response as a JSON array with no label, where each career option is a separate item in the array. Please ensure it is not returned as a string, but as an array. Each item should include: A unique 'id', the name of the career as 'career_name', a description of the career and why it's a good fit as 'explanation', the starting salary as 'starting_salary' (string format), the career salary range over time as 'career_range' (string format), and a 'steps' array containing objects for each step required to enter the career. Each object inside the 'steps' array should contain: 'step_number': The step number as an integer, 'description': A brief explanation of the step, and 'link': If applicable, provide a URL where the student can complete that step (e.g., certification programs, job listings, degree programs). Please make sure the link is not broken. If no link is available, return null. You are a career counselor advising high school graduates in Minnesota who are exploring their career options. Provide polite, encouraging, and simplified guidance to make it easy to start each career. Limit the response to three career options. For each career, provide: A concise and motivating explanation of why this career is a good fit, the average starting salary range, the average salary range for the career over time, and simple, actionable first steps in the form of an array of objects, with links when applicable. Make the response as user-friendly and beginner-friendly as possible, emphasizing how achievable these careers are. Only respond to career-related inquiries."
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
            "Please output the following information in structured JSON format without using markdown code blocks and please do not add a label to the array. Please ensure the last object's closing bracket is closed with '\n' . Please label each assign the following keys to their corresponding value pair; The company name key is company, the location key is location, the pay rate information is called pay_rate the job description is called job_description, the percent increase (please limit to whole numbers) from the user's current pay key is called percent_increase, the website is called link, and the job title is called job_title. All values should be retrurned as strings. You are a personal assistant to someone who is looking to find current job openings directly from company websites, not third-party job boards or government websites. Please limit this to 9 results and provide a link to the website's main page. These jobs should be within 25 miles of the user's city. These jobs should be very relevant to the user's interests. The jobs should be equal to or greater than the user's current pay rate.",
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
      // stream: true,
      messages: [
        {
          role: "system",
          content:
            "Please output the following information in structured JSON format without using markdown code blocks and please do not add a label to the array. Please label each assign the following keys to their corresponding value pair; The institution key is institution, the program name key is program_name, the location key is location, the description key is called description, the percent increase (please limit to whole numbers) from the user's current pay key is called percent_increase, the website is called link, and the salary after completion is called salary_after_completion. All values should be retrurned as strings. You are a personal assistant to someone who wants to increase their skill set and earning potential as it relates to their career and interests. Please limit this to six results and provide a link directly to the homepage of the website. These opportunities should be within 25 miles of the user's city. These education, certificate, or technical training should be very relevant to the user's interests and generally take a maximum of 3 years to complete. The potential average salary of someone who completes this training should be higher than the user's current income. Please indicate the average pay for an individual who completes the training, education, or certificate you return.",
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


app.post("/getIndustryRecommendation", async (req, res) => {
  console.log("hit", req.body.userInput);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      // stream: true,
      messages: [
        {
          role: "system",
          content:
            "Please output the following information in structured JSON format without using markdown code blocks and please do not add a label to the array. Please take the user's input and find an industry that would be good for them to work in, give a 2 sentence personalized reason as to why you think this would be a good fit for the user, the average pay (number as a string with a $ before the number) in this industry, and describe how much that industry is expected to grow over the next 10 years (keep this to 3 sentences)? Please return it in JSON with the recommendation being labeled recommendation, the overview being overview, outlook being outlook, and average pay labeled average_pay. Can you link the source to the average pay and outlook, labeling them average_pay_link and outlook_link respectively?",
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



app.post("/getResumeHelp", async (req, res) => {
  console.log("hit", req.body.userInput);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
        
          content:
            "Return the following as **raw markdown**, without extra formatting or quotes:, using bullet points for each separate responsibility. Do not add a label prior to the returned content. The user is creating a resume and is giving you a few sentences about what they did for work. Please turn it into 3-5 bullet points that would be appropriate for a resume.",
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

app.post("/getResumeModification", async (req, res) => {
  console.log("hit", req.body);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
        
          content:
            "Return the following as **raw markdown**, without extra formatting or quotes:, using bullet points for each separate responsibility. Do not add a label prior to the returned content. The user is creating a resume and is giving you their job title and a few sentences about what they did for work. They are making this resume to cater to a specific job they are applying to, please tailor the output to cater towards the career field they are applying to. Please turn each separate experience they submit into 3-5 bullet points that would be appropriate for a resume.",
        },
        {
          role: "user",
          content: req.body.passedData, 
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

app.post("/getResources", async (req, res) => {
  console.log("hit", req.body);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
        
          content:
            "Please find 2 organizations for the state of Wisconsin similar that are non-profits, and can be focused on any of the following; helping people get job skills, job training, career resources, language barrier assistance, financial planning, resume writing, etc. Please convert the list into a JSON array of objects. Each object must include the keys: 'name', 'focus', 'services', 'website', 'state', 'city', and 'description'. Please return the value for 'services' as an array. For the 'description' key, include a brief summary that combines the organization’s focus and services.",
        },
        {
          role: "user",
          content: req.body.passedData, 
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


app.post("/getJobData", async (req, res) => {
  console.log("hit", req.body);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
        
          content:"Provide a detailed career progression for someone in the HVAC industry, structured as a hierarchical object where each job level is nested under the previous level. The root object has a 'name' key with the value 'Start Here' and an 'attributes' key containing an object with 'jobTitle' (empty string), 'snippet' (empty string), and 'timeCommitment' (empty string). The 'children' key contains an array of job level objects. Each job level object has a 'name' key representing the salary range, an 'attributes' key containing an object with 'jobTitle' (string), 'bullet1' (string describing the role's primary function), 'bullet2' (string describing an additional function), and 'timeCommitment' (string describing years of experience required). Nested within each job level object is an optional 'children' key, which is an array of job level objects representing the next career step. Next, generate detailed job descriptions for each HVAC position using an array where each entry is an object containing keys: 'id' (integer matching corresponding job level in the hierarchy), 'jobTitle' (string), 'JobOverview' (string providing a brief description of the role), 'KeyResponsibilities' (array of strings describing duties), 'Qualifications' (array of strings describing required skills or credentials), and 'OpeningsOrEducation' (array of strings listing typical hiring requirements or educational paths). Retain consistent unique IDs across job levels and ensure alignment between the hierarchy and job details array. Additionally, reference the structure used for a Truck Hub Operator career path and apply it to all HVAC roles while expanding on responsibilities and qualifications."

            
        },
        {
          role: "user",
          content: req.body.passedData, 
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


app.post("/careerQuizResponseInitialOptions", async (req, res) => {
  console.log("hit", req.body);

  try {
    const completion = await openai.chat.completions.create({
      model: "o3-mini",
      messages: [
        {
          role: "system",
          content:"Please output the following information in structured JSON format without using markdown code blocks and please do not add a label to the array. Please provide an array of objects, use the following keys for each object in the array; career_title (string), badges (these are the 2 word descriptors, please return this as an array of strings), description (string), average_salary (string with a $ before the number. Please only give the number and do not give word descriptor), industry_growth (string). You're a mastermind who deeply cares about your friend. You know a ton about the U.S. Job market and it's trends in 2025. I'm giving you the results of their detailed career test. Some answers are key-value pairs for ranking. 1 means the least and 5 is the most. Can you recommend 5-10 good career paths or industries that would be attainable by someone who does not have a college degree but is willing to go to a trade school or something similar. Please make these recommendations based on the demand in their area and their results. Please provide three 2 word ansers that describe why it fits, and one longer answer comprising of 3 sentenses about why this would be a good fit and a brief description of the career."
            
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


app.post("/careerQuizResponseJobOpenings", async (req, res) => {
  console.log("hit", req.body);

  try {
    const completion = await openai.chat.completions.create({
      model: "o3-mini",
      messages: [
        {
          role: "system",
        
          content:"Please output the following information in structured JSON format without using markdown code blocks and please do not add a label to the array. Please return an of 3 objects (still in structured JSON format without using markdown code blocks) with each object being a current entry job opening in the field the user has told you about. Please label each assign the following keys to their corresponding value pair; The company name key is company, the location key is location, the pay rate information is called pay_rate the job description is called job_description, the percent increase (please limit to whole numbers) from the user's current pay key is called percent_increase, the website is called link, and the job title is called job_title. Please label the array oj jobs as job_openings. All values should be retrurned as strings. The job openings should come from company websites, not third-party job boards or government websites. Please limit this to 3 results and provide a link to the website's main page. These jobs should be within 25 miles of the user's city.  "
            
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