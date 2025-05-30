import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// Helper to check if user is Faculty
function isFaculty(user) {
  return user?.role === "Faculty";
}

// Get all quizzes for a course
export function findQuizzesForCourse(courseId, user) {
  if (isFaculty(user)) {
    return Database.quizzes.filter((q) => q.course === courseId);
  } else {
    return Database.quizzes.filter((q) => q.course === courseId && q.published);
  }
}

// Get all quizzes
export function findAllQuizzes() {
  return Database.quizzes;
}

// Find one quiz by ID
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
  };

  console.log("✅ NEW QUIZ CREATED:", newQuiz); 

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

export function submitQuizAttempt(quizId, score) {
  const quiz = Database.quizzes.find(q => q._id === quizId);
  if (!quiz) return null;

  const attempt = {
    _id: uuidv4(),
    score,
    submittedAt: new Date().toISOString(),
  };

  quiz.attempts = quiz.attempts || [];
  quiz.attempts.push(attempt);
  return attempt;
}


export function updateQuiz(quizId, quizUpdates, user) {
  if (!isFaculty(user)) {
    throw new Error("Unauthorized: Only faculty can update quizzes.");
  }

  const index = Database.quizzes.findIndex((q) => q._id === quizId);
  console.log("🔍 Found quiz index:", index); // <== Add this!

  if (index === -1) return null;

  const updated = {
    ...Database.quizzes[index],
    ...quizUpdates,
    _id: quizId, // retain ID
  };

  Database.quizzes[index] = updated;
  console.log("✅ Quiz updated in DB:", updated); // <== Add this!
  return updated;
}


export function updateQuestionForQuiz(quizId, questionId, updatedQuestion) {
  const index = Database.questions.findIndex(
    (q) => q.qid === quizId && q._id === questionId
  );

  if (index === -1) return null;

  const current = Database.questions[index];
  const merged = {
    ...current,
    ...updatedQuestion,
    _id: questionId, // Ensure ID is preserved
    qid: quizId      // Ensure quiz ID is correct
  };

  Database.questions[index] = merged;
  return merged;
}
