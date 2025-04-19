import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findQuestionsForQuiz(quizId) {
  return Database.questions.filter((q) => q.quizId === quizId);
}

export function createQuestionForQuiz(quizId, question) {
  const newQuestion = {
    ...question,
    _id: question._id || uuidv4(),
    quizId,
  };
  Database.questions = [...Database.questions, newQuestion];
  return newQuestion;
}

export function deleteQuestionForQuiz(quizId, questionId) {
  Database.questions = Database.questions.filter(
    (q) => !(q.quizId === quizId && q._id === questionId)
  );
}
