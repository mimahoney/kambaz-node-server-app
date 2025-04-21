import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findQuestionsForQuiz(qid) {
  return Database.questions.filter((q) => q.qid === qid);
}

// export function createQuestionForQuiz(quizId, question) {
//   const newQuestion = {
//     ...question,
//     _id: question._id || uuidv4(),
//     quizId,
//   };
//   Database.questions = [...Database.questions, newQuestion];
//   return newQuestion;
// }



export function createQuestionForQuiz(qid, question) {
  const baseQuestion = {
    _id: question._id || uuidv4(),
    qid: qid,
    qtitle: question.qtitle || "",
    points: question.points || 0,
    question_text: question.question_text || "",
    type: question.type,
  };

  let newQuestion = { ...baseQuestion };

  switch (question.type) {
    case "mcq":
      newQuestion.answers = question.answers || [];
      break;

    case "tf":
      newQuestion.answer = typeof question.answer === "boolean" ? question.answer : false;
      break;

    case "fitb":
      newQuestion.answer = typeof question.answer === "string" ? question.answer : "";
      break;
    default:
      throw new Error("Unsupported question type: " + question.type);
  }

  Database.questions.push(newQuestion);
  return newQuestion;
}


export function deleteQuestionForQuiz(qid, questionId) {
  Database.questions = Database.questions.filter(
    (q) => !(q.qid === qid && q._id === questionId)
  );
}
export function updateQuestionForQuiz(quizId, questionId, updates) {
  const index = Database.questions.findIndex(
    (q) => q.qid === quizId && q._id === questionId
  );
  if (index === -1) {
    throw new Error("Question not found");
  }

  Database.questions[index] = {
    ...Database.questions[index],
    ...updates,
  };

  return Database.questions[index];
}
