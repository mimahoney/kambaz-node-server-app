import courses from "./courses.js";
import modules from "./modules.js";
import assignments from "./assignments.js";
import users from "./users.js";
import grades from "./grades.js";
import enrollments from "./enrollments.js";
import quizzes from "./quizzes.js"
import questions from "./questions.js"



// const app = express();
// app.use(
//  cors({
//    credentials: true,
//    origin: process.env.NETLIFY_URL || "http://localhost:5173",
//  })
// );
// app.use(express.json());
// const port = process.env.PORT || 4000;

import "dotenv/config";
import session from "express-session";
import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
export default { courses, modules, assignments, users, grades, enrollments, quizzes, questions };


