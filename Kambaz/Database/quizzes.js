export default [
  {
    _id: "q101",
    title: "Sample Quiz 1",
    description: "This quiz tests your knowledge.",
    quizType: "Graded Quiz",
    points: 20,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: true,
    showCorrectAnswers: "After Last Attempt",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    due: "2025-04-18",
    available: "2025-03-01",
    availableUntil: "2025-04-20",
    course: "RS101",
    published: true,
    maxAttempts: 3,
    attempts: [
      {
        _id: "attempt101a",
        quizId: "q101",
        userId: "u2",
        score: 18,
        submittedAt: "2025-04-18T20:45:00.000Z"
      }
    ]
  },
  {
    _id: "q102",
    title: "Sample Quiz 2",
    description: "This quiz tests your knowledge.",
    quizType: "Graded Quiz",
    points: 20,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: true,
    showCorrectAnswers: "After Last Attempt",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    due: "2025-04-18",
    available: "2025-03-01",
    availableUntil: "2025-04-20",
    course: "RS101",
    published: true,
    maxAttempts: 3,
    attempts: [
      {
        _id: "attempt102a",
        quizId: "q102",
        userId: "u2",
        score: 18,
        submittedAt: "2025-04-18T20:45:00.000Z"
      },
      {
        _id: "attempt102b",
        quizId: "q102",
        userId: "u2",
        score: 20,
        submittedAt: "2025-04-19T14:00:00.000Z"
      }
    ]
  }
];
