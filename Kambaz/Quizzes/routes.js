import * as dao from "./dao.js";
import { v4 as uuidv4 } from "uuid";
import Database from "../Database/index.js";



export default function QuizRoutes(app) {
  app.get("/api/quizzes", (req, res) => {
    const quizzes = dao.findAllQuizzes();
    res.send(quizzes);
  });


  app.post("/api/courses/:courseId/quizzes/new", (req, res) => {
    const { courseId } = req.params;
    const user = req.session.currentUser;
    try {
      const newQuiz = dao.createQuiz({ ...req.body, course: courseId }, user);
      res.send(newQuiz);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  });
  

  
  app.get("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const user = req.session.currentUser;
    const quizzes = dao.findQuizzesForCourse(courseId, user);
    res.json(quizzes);
  });

  // app.post("/api/courses/:courseId/quizzes", (req, res) => {
  //   const { courseId } = req.params;
  //   const newQuiz = dao.createQuiz({
  //     ...req.body,
  //     course: courseId
  //   });
  //   res.send(newQuiz);
  // });

  app.post("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params;
    const user = req.session.currentUser;
    try {
      const newQuiz = dao.createQuiz({ ...req.body, course: courseId }, user);
      console.log(" Created quiz:", newQuiz);
      res.send(newQuiz); 
    } catch (err) {
      res.status(401).send({ error: err.message });
    }
  });
  

  // app.put("/api/quizzes/:quizId", (req, res) => {
  //   const { quizId } = req.params;
  //   const quizUpdates = req.body;
  //   const user = req.session.currentUser;
  //   try {
  //     const updated = dao.updateQuiz(quizId, quizUpdates, user);
  //     res.send(updated);
  //   } catch (err) {
  //     res.status(401).send({ error: err.message });
  //   }
  // });

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

  app.get("/api/quizzes/:quizId/questions/:questionId", (req, res) => {
    const { quizId, questionId } = req.params;
    const question = Database.questions.find(
      (q) => q.qid === quizId && q._id === questionId
    );
    if (question) {
      res.send(question);
    } else {
      res.status(404).send({ error: "Question not found" });
    }
  });
  
  app.put("/api/quizzes/:quizId/questions/:questionId", (req, res) => {
    const { quizId, questionId } = req.params;
    const index = Database.questions.findIndex(
      (q) => q.qid === quizId && q._id === questionId
    );
    if (index === -1) return res.status(404).send({ error: "Question not found" });
  
    Database.questions[index] = {
      ...Database.questions[index],
      ...req.body,
      _id: questionId,
      qid: quizId,
    };
    res.send(Database.questions[index]);
  });

  app.put("/api/quizzes/:quizId/questions/:questionId", (req, res) => {
    const { quizId, questionId } = req.params;
    const updated = dao.updateQuestionForQuiz(quizId, questionId, req.body);
    res.send(updated);
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
  

  // app.get("/api/quizzes/:quizId/questions", (req, res) => {
  //   const { quizId } = req.params;
  //   const questions = dao.findQuestionsForQuiz(quizId);
  //   res.json(questions);
  // });


  // app.post("/api/quizzes/:quizId/questions", (req, res) => {
  //   const { quizId } = req.params;
  //   const newQuestion = {
  //     ...req.body,
  //     _id: uuidv4(),
  //     quizId,
  //   };
  //   const created = dao.createQuestionForQuiz(newQuestion);
  //   res.status(201).json(created);
  // });


  // app.delete("/api/quizzes/:quizId/questions/:questionId", (req, res) => {
  //   const { quizId, questionId } = req.params;
  //   dao.deleteQuestionFromQuiz(quizId, questionId);
  //   res.sendStatus(204);
  // });

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

  app.post("/api/quizzes/:quizId/attempts", (req, res) => {
    const { quizId } = req.params;
    const { score } = req.body;
  
    const quiz = Database.quizzes.find(q => q._id === quizId);
    if (!quiz) {
      return res.status(404).send({ error: "Quiz not found." });
    }
  
    const max = quiz.maxAttempts ?? Infinity;
    const currentAttempts = quiz.attempts?.length ?? 0;
  
    if (currentAttempts >= max) {
      return res.status(403).send({ error: "Maximum attempts reached." });
    }
  
    const attempt = {
      _id: uuidv4(),
      score,
      submittedAt: new Date().toISOString(),
    };
  
    quiz.attempts = quiz.attempts || [];
    quiz.attempts.push(attempt);
    res.send(attempt);
  });
  
  
app.get("/api/quizzes/:qid/questions/:questionId", (req, res) => {
  const { qid, questionId } = req.params;
  const questions = dao.findQuestionsForQuiz(qid);
  const question = questions.find((q) => q._id === questionId);
  if (!question) {
    return res.status(404).send({ error: "Question not found" });
  }
  res.send(question);
});

}

  
