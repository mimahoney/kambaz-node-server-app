import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  app.get("/api/quizzes/:quizId/questions", (req, res) => {
    const { quizId } = req.params;
    const questions = dao.findQuestionsForQuiz(quizId);
    res.send(questions);
  });

  app.post("/api/quizzes/:quizId/questions", (req, res) => {
    const { quizId } = req.params;
    const question = dao.createQuestionForQuiz(quizId, req.body);
    res.send(question);
  });

  app.delete("/api/quizzes/:quizId/questions/:questionId", (req, res) => {
    const { quizId, questionId } = req.params;
    dao.deleteQuestionForQuiz(quizId, questionId);
    res.sendStatus(204);
  });
}
