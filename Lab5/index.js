import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
export default function Lab5(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });
  app.get("/lab5", (req, res) => {
    res.send("Welcome to Lab 5!");
  });  
  app.get("/lab5/assignment", (req, res) => {
  res.send("This is the Lab 5 Assignment endpoint.");
});

  PathParameters(app);
  QueryParameters(app);
  WorkingWithObjects(app);
  WorkingWithArrays(app);
}
