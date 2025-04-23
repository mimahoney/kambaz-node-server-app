import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

function isFaculty(user) {
  return user?.role === "Faculty";
}

export function findQuizzesForCourse(courseId, user) {
  if (isFaculty(user)) {
    return Database.quizzes.filter((q) => q.course === courseId);
  } else {
    return Database.quizzes.filter((q) => q.course === courseId && q.published);
  }
}

export function findAllQuizzes() {
  return Database.quizzes;
}

export function findQuizById(quizId) {
  return Database.quizzes.find((quiz) => quiz._id === quizId);
}

export function createQuiz(quiz, user) {
  if (!isFaculty(user)) {
    throw new Error("Unauthorized: Only faculty can create quizzes.");
  }

  const newQuiz = {
    ...quiz,
    _id: uuidv4(),
    published: quiz.published ?? false,
    attempts: [],
  };

  Database.quizzes = [...Database.quizzes, newQuiz];
  return newQuiz;
}

// Delete a quiz
export function deleteQuiz(quizId, user) {
  if (!isFaculty(user)) {
    throw new Error("Unauthorized: Only faculty can delete quizzes.");
  }

  Database.quizzes = Database.quizzes.filter((q) => q._id !== quizId);
}

// Toggle publish/unpublish
export function togglePublishQuiz(quizId, user) {
  const quiz = Database.quizzes.find((q) => q._id === quizId);

  if (!quiz) {
    return { success: false, message: "Quiz not found." };
  }

  if (!isFaculty(user)) {
    return {
      success: false,
      message: "Only faculty can publish/unpublish quizzes.",
    };
  }

  quiz.published = !quiz.published;
  return { success: true, published: quiz.published };
}

export function findQuestionsForQuiz(qid) {
  return Database.questions.filter((q) => q.qid === qid);
}


export function createQuestionForQuiz(question) {
  Database.questions.push(question);
  return question;
}

export function deleteQuestionFromQuiz(quizId, questionId) {
  Database.questions = Database.questions.filter(
    (q) => !(q.quizId === quizId && q._id === questionId)
  );
}

export function updateQuiz(quizId, quizUpdates, user) {
  if (!isFaculty(user)) {
    throw new Error("Unauthorized: Only faculty can update quizzes.");
  }

  const index = Database.quizzes.findIndex((q) => q._id === quizId);
  if (index === -1) return null;

  const updated = {
    ...Database.quizzes[index],
    ...quizUpdates,
    _id: quizId,
  };

  Database.quizzes[index] = updated;
  return updated;
}