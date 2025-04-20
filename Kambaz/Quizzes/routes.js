import * as dao from "./dao.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizRoutes(app) {
  app.get("/api/quizzes", (req, res) => {
    const quizzes = dao.findAllQuizzes();
    res.send(quizzes);
  });

  app.get("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const user = req.session.currentUser;
    const quizzes = dao.findQuizzesForCourse(courseId, user);
    res.json(quizzes);
  });

  app.post("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const user = req.session.currentUser;
    try {
      const newQuiz = dao.createQuiz({ ...req.body, course: courseId }, user);
      res.send(newQuiz);
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  });

  app.get("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const quiz = dao.findQuizById(quizId);
    quiz ? res.send(quiz) : res.status(404).send({ error: "Couldn't find quiz" });
  });

  app.put("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const user = req.session.currentUser;
    try {
      const updated = dao.updateQuiz(quizId, quizUpdates, user);
      res.send(updated);
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  });

  app.put("/api/quizzes/:quizId/toggle", (req, res) => {
    const { quizId } = req.params;
    const user = req.session.currentUser;
    const result = dao.togglePublishQuiz(quizId, user);
    res.json(result);
  });

  app.delete("/api/quizzes/:quizId", (req, res) => {
    const { quizId } = req.params;
    const user = req.session.currentUser;
    try {
      dao.deleteQuiz(quizId, user);
      res.sendStatus(204);
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  });

  // Create quiz attempt
  app.post("/api/quizzes/:quizId/attempts", (req, res) => {
    const { quizId } = req.params;
    const { score } = req.body;
    const user = req.session.currentUser;

    console.log("Incoming attempt:", { quizId, score, user });

    if (!user || typeof score !== "number") {
      return res.status(400).send({ error: "Invalid user or score." });
    }

    try {
      const attempt = dao.createQuizAttempt(quizId, user._id, score);
      res.status(201).send(attempt);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
}