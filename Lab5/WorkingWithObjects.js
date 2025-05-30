const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };
const courseModule = {
    id: "cs5610",
    name: "Web Development",
    description: "Learn full-stack web dev with React & Node",
    course: "CS5610"
  };
  export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment", (req, res) => {
      res.json(assignment);
    });
    app.get("/lab5/assignment/title", (req, res) => {
        res.json(assignment.title);
      });
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
      });
    app.get("/lab5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = Number(newScore);
        res.json(assignment);
      });
    app.get("/lab5/assignment/completed/:completed", (req, res) => {
        const { completed } = req.params;
        assignment.completed = completed === "true";
        res.json(assignment);
      });
    app.get("/lab5/module", (req, res) => {
        res.json(courseModule);
      });
    app.get("/lab5/module/name", (req, res) => {
        res.send(courseModule.name);
      });
  };
  
  