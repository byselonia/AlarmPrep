import React, { useState } from 'react';
import { Paper, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuestionBankProps {
  testType: 'GMAT' | 'LSAT';
}

const sampleQuestions: Record<'GMAT' | 'LSAT', Question[]> = {
  GMAT: [
    {
      id: 1,
      question: "If x and y are positive integers and x + y = 10, what is the maximum value of xy?",
      options: ["25", "24", "20", "16"],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "A company's profit increased by 20% in 2020 and then decreased by 20% in 2021. What was the net change in profit?",
      options: ["4% increase", "4% decrease", "No change", "Cannot be determined"],
      correctAnswer: 1
    }
  ],
  LSAT: [
    {
      id: 1,
      question: "All mammals are warm-blooded. All warm-blooded animals are vertebrates. Therefore, all mammals are vertebrates.",
      options: ["Valid", "Invalid", "Indeterminate", "Circular"],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "If the first statement is true, and the second statement is false, which of the following must be true?",
      options: ["The conclusion is true", "The conclusion is false", "The argument is valid", "The argument is invalid"],
      correctAnswer: 3
    }
  ]
};

const QuestionBank: React.FC<QuestionBankProps> = ({ testType }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = sampleQuestions[testType];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(Number(event.target.value));
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  const handleCheckAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {testType} Practice Question
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          {currentQuestion.question}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
                disabled={showAnswer}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      {showAnswer && (
        <Typography
          variant="body1"
          color={selectedAnswer === currentQuestion.correctAnswer ? 'success.main' : 'error.main'}
          sx={{ mb: 2 }}
        >
          {selectedAnswer === currentQuestion.correctAnswer
            ? 'Correct!'
            : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleCheckAnswer}
          disabled={selectedAnswer === null || showAnswer}
        >
          Check Answer
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextQuestion}
          disabled={!showAnswer}
        >
          Next Question
        </Button>
      </Box>
    </Paper>
  );
};

export default QuestionBank; 