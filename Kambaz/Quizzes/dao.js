import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import * as userDao from "../Users/dao.js";

function isFaculty() {
  const user = Database.currentUser;
  return user && user.role === "Faculty";
}

export function findAllQuizzes() {
  return Database.quizzes;
}

export function findQuizzesForCourse(courseId) {
  // console.log(isFaculty());
  // if (isFaculty()) {
  //   return Database.quizzes.filter((quiz) => quiz.course === courseId);
  // } else {
  //   return Database.quizzes.filter(
  //     (quiz) => quiz.course === courseId && quiz.published
  //   );
  // }
  return Database.quizzes.filter((quiz) => quiz.course === courseId);
}
export function findQuizById(quizId) {
  return Database.quizzes.find((quiz) => quiz._id === quizId);
}

export function createQuiz(quiz) {
  if (!isFaculty()) {
    throw new Error("Unauthorized: Only faculty can create quizzes.");
  }
  const newQuiz = { ...quiz, _id: uuidv4(), published: false };
  Database.quizzes = [...Database.quizzes, newQuiz];
  return newQuiz;
}

export function updateQuiz(quizId, quizUpdates) {
  if (!isFaculty()) {
    throw new Error("Unauthorized: Only faculty can update quizzes.");
  }
  const quiz = Database.quizzes.find((q) => q._id === quizId);
  if (!quiz) return null;
  Object.assign(quiz, quizUpdates);
  return quiz;
}

export function deleteQuiz(quizId) {
  if (!isFaculty()) {
    throw new Error("Unauthorized: Only faculty can delete quizzes.");
  }
  Database.quizzes = Database.quizzes.filter((q) => q._id !== quizId);
}


export function togglePublishQuiz(quizId) {
  const quiz = Database.quizzes.find((q) => q._id === quizId);

  if (!quiz) return { success: false, message: "Quiz not found." };

  if (!isFaculty()) {
    console.warn("Blocked: Only faculty can publish quizzes.");
    return { success: false, message: "Only faculty can publish/unpublish quizzes." };
  }

  quiz.published = !quiz.published;
  return { success: true, published: quiz.published };
}