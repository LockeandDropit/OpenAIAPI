import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import admin from "firebase-admin";
import helmet from "helmet";
const path = process.env.SERVICE_ACCOUNT_PATH || "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(path),
});

const app = express();

/* ----------  CORS CONFIG  ---------- */
const liveAllowedOrigins = [
  "https://getfulfil.com",
  "https://app.getfulfil.com",
  "https://auth.getfulfil.com",   
  // "http://localhost:3000",
  // "http://localhost:5173"  
];

// one shared options object
const corsOpts = {
  origin: liveAllowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,        // IE11 / old SmartTVs
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["content-type"], // echo whatever you send
};

app.use(cors(corsOpts));          // adds headers to every response
app.options(/.*/, cors(corsOpts)); // handles all pre‑flights

/* ----------  OTHER MIDDLEWARE  ---------- */
app.use(cookieParser());
app.use(express.json());


/* ----------  ROUTES  ---------- */
app.post("/api/sessionLogin", async (req, res) => {
  const idToken = req.body.idToken;
  const expiresIn = 14 * 24 * 60 * 60 * 1000;

  try {
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      //try commenting this outr if it doesn;t work onn tge first try
      domain: ".getfulfil.com",
      // domain: "localhost",
    });

    res.status(200).send({ status: "success" });
  } catch (e) {
    console.error("SESSION LOGIN ERROR:", e);
    res.status(401).send("Unauthorized");
  }
});

app.get("/api/sessionInfo", async (req, res) => {
  const sessionCookie = req.cookies.session || "";
  try {
    const decoded = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    const customToken = await admin.auth().createCustomToken(decoded.uid);
    res.json({ customToken });
  } catch (e) {
    console.error("verifySessionCookie failed:", e.code, e.message);
    res.status(401).json({ error: "Unauthenticated" });
  }
});

app.post("/api/logout", async (req, res) => {
  //dev only
  // res.clearCookie("session");
  res.clearCookie("session", {
    domain:".getfulfil.com",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.status(204).end();
});

/* ----------  START  ---------- */
app.listen(8000, () => console.log("Auth API on :8000"));
