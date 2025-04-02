// import express from 'express'
// import session from 'express-session';
// import Hello from "./Hello.js"
// import Lab5 from "./Lab5/index.js";
// import cors from "cors";
// import UserRoutes from "./Kambaz/Users/routes.js";
// import CourseRoutes from "./Kambaz/Courses/routes.js";
// const app = express()
// app.use(cors()); 
// app.use(express.json());
// CourseRoutes(app);
// UserRoutes(app);
// Lab5(app)
// Hello(app)

// app.listen(process.env.PORT || 4000)

import express from 'express';
import session from 'express-session';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';

const app = express();
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173"
  }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "kambaz", resave: false,
    saveUninitialized: false, cookie: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
      }
      })
);

app.use(express.json());
// app.use(cors({
//   origin: "https://a5michaelm.netlify.app", 
//   credentials: true
// }));

// app.use(
//   session({
//     secret: "kambaz",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       sameSite: "none",  
//       secure: true       
//     }
//   })
// );

  
CourseRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
app.listen(process.env.PORT || 4000)



 
