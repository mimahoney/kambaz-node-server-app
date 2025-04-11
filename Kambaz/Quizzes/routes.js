import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  app.get("/api/quizzes", (req, res) => {
    const quizzes = dao.findAllQuizzes();
    res.send(quizzes);
  });

  app.get("/api/quizzes/new", (req, res) => {
    const { courseId } = req.params;
    const newQuiz = dao.createQuiz({ ...req.body, course: courseId });
    res.send(newQuiz);
  });
  app.get("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const user = req.session.currentUser; 
    const quizzes = dao.findQuizzesForCourse(courseId, user);
    res.json(quizzes);
  });
  

  app.post("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const newQuiz = dao.createQuiz({
      ...req.body,
      course: courseId
    });
    res.send(newQuiz);
  });

  app.put("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const updated = dao.updateQuiz(quizId, quizUpdates);
    res.send(updated);
  });

  app.delete("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    dao.deleteQuiz(quizId);
    res.sendStatus(204);
  });

  app.get("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const quiz = dao.findQuizById(quizId);
    if (quiz) {
      res.send(quiz);
    } else {
      res.status(404).send({ error: "Couldn't find quiz" });
    }
  });

  app.put("/api/quizzes/:quizId/toggle", (req, res) => {
    const { quizId } = req.params;
    const user = req.session.currentUser; 
    const result = dao.togglePublishQuiz(quizId, user);
    res.json(result);
  });
   
}

