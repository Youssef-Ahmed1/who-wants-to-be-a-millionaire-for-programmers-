import { generateStackOverflowVotes, generatePhoneFriendResponse } from './lifelines';
import { Question } from '@/types';

describe('generateStackOverflowVotes', () => {
  it('should return an array of 4 numbers summing to 100', () => {
    const question: Question = {
      id: '1',
      question: 'What is React?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
      category: 'Frontend',
      level: 1,
    };

    const votes = generateStackOverflowVotes(question);

    expect(votes).toHaveLength(4);
    expect(votes.reduce((sum, v) => sum + v, 0)).toBe(100);
  });

  it('should give the correct answer the highest percentage', () => {
    const question: Question = {
      id: '1',
      question: 'What is React?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
      category: 'Frontend',
      level: 1,
    };

    const votes = generateStackOverflowVotes(question);
    const correctIndex = 0;
    const maxVote = Math.max(...votes);
    expect(votes[correctIndex]).toBe(maxVote);
  });
});

describe('generatePhoneFriendResponse', () => {
  it('should return a string containing {correctAnswer}', () => {
    const response = generatePhoneFriendResponse(2);
    expect(response).toContain('{correctAnswer}');
  });

  it('should return different responses for level 1 and level 3', () => {
    const level1 = generatePhoneFriendResponse(1);
    const level3 = generatePhoneFriendResponse(3);
    expect(level1).not.toBe(level3);
  });
});
