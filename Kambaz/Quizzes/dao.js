import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllQuizzes() {
  return Database.quizzes;
}

export function findQuizzesForCourse(courseId) {
    const { quizzes } = Database;
  return quizzes.filter((quiz) => quiz.course === courseId);
}

export function findQuizById(quizId) {
  return Database.quizzes.find((quiz) => quiz._id === quizId);
}

export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  Database.quizzes = [...Database.quizzes, newQuiz];
  return newQuiz;
}

export function updateQuiz(quizId, quizUpdates) {
  const quiz = Database.quizzes.find((q) => q._id === quizId);
    Object.assign(quiz, quizUpdates);
  return quiz;
}

export function deleteQuiz(quizId) {
    const { quizzes } = Database;
  quizzes = Database.quizzes.filter((q) => q._id !== quizId);
}
