const questions = [
    {
      _id: "mcq1",
      qid: "q101",
      qtitle: "What is the capital of America?",
      points: 5,
      question_text: "Choose the correct answer.",
      type: "mcq",
      answers: [
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
        { text: "Washington DC", isCorrect: true },
        { text: "Rome", isCorrect: false }
      ]
    },
    {
      _id: "tf1",
      qid: "q101",
      qtitle: "The Earth is flat.",
      points: 2,
      question_text: "Is this statement true or false?",
      type: "tf",
      answer: false
    },
    {
      _id: "fitb1",
      qid: "q101",
      qtitle: "Complete the sentence.",
      points: 3,
      question_text: "Northeastern was founded in ___.",
      type: "fitb",
      answer: "1990"
    }
  ];
  
  export default questions;
  