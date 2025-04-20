import * as dao from "./dao.js";
import { v4 as uuidv4 } from "uuid";


export default function QuestionRoutes(app) {
  app.get("/api/quizzes/:qid/questions", (req, res) => {
    const { qid } = req.params;
    const questions = dao.findQuestionsForQuiz(qid);
    res.send(questions);
  });

  app.post("/api/quizzes/:qid/questions", (req, res) => {
    const { qid } = req.params;
    const question = dao.createQuestionForQuiz(qid, req.body);
    res.send(question);
  });

  app.delete("/api/quizzes/:qid/questions/:questionId", (req, res) => {
    const { qid, questionId } = req.params;
    dao.deleteQuestionForQuiz(qid, questionId);
    res.sendStatus(204);
  });
}
