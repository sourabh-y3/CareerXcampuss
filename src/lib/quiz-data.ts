export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface QuizSection {
  section: string;
  questions: QuizQuestion[];
}

export const quizData: QuizSection[] = [
  {
    section: 'Academic Proficiency',
    questions: [
      {
        id: 'math_confidence',
        question: 'How confident are you with advanced mathematics (calculus, algebra)?',
        options: ['Very Confident', 'Somewhat Confident', 'Neutral', 'Not Confident', 'I avoid it'],
      },
      {
        id: 'science_interest',
        question: 'Which science subject do you enjoy the most?',
        options: ['Physics', 'Chemistry', 'Biology', 'Computer Science', 'None of them'],
      },
      {
        id: 'language_skill',
        question: 'How would you rate your creative writing and communication skills?',
        options: ['Excellent', 'Good', 'Average', 'Needs Improvement', 'Weak'],
      },
    ],
  },
  {
    section: 'Work Style & Preference',
    questions: [
      {
        id: 'teamwork_preference',
        question: 'Do you prefer working in a team or independently?',
        options: ['Almost always in a team', 'Mostly in a team', 'A balance of both', 'Mostly independently', 'Almost always independently'],
      },
      {
        id: 'problem_solving_style',
        question: 'When faced with a problem, you prefer to:',
        options: ['Follow a structured, logical approach', 'Brainstorm creative, unconventional solutions', 'Analyze data to find an answer', 'Collaborate with others to find a solution', 'Experiment and see what works'],
      },
      {
        id: 'work_environment',
        question: 'What kind of work environment appeals to you most?',
        options: ['A busy, fast-paced office', 'A quiet, focused lab or studio', 'Outdoors or on the move', 'A collaborative, open workspace', 'Working from home'],
      },
    ],
  },
];
