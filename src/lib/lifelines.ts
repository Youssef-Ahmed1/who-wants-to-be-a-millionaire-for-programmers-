
    import { Question } from '@/types';

    export const generateStackOverflowVotes = (currentQuestion: Question): number[] => {
        const correctIndex = currentQuestion.options.findIndex(
            (option: string) => option == currentQuestion.correctAnswer,
        );
        let correctPercentage: number;

        currentQuestion.correctAnswer.toLowerCase();
        if (currentQuestion.level == 1) {
            correctPercentage = Math.floor(Math.random() * (95 - 85 + 1)) + 85;
        } else if (currentQuestion.level == 2) {
            correctPercentage = Math.floor(Math.random() * (70 - 50 + 1)) + 50;
        } else {
            correctPercentage = Math.floor(Math.random() * (60 - 40 + 1)) + 40;
        }

        let remainingPercentage = 100 - correctPercentage;
            const wrongIndices = [0, 1, 2, 3].filter((i) => i !== correctIndex);
        let votes = [0, 0, 0, 0];
        votes[correctIndex] = correctPercentage;
        for (let i = 0; i < wrongIndices.length - 1; i++) {
            if (i !== correctIndex) {
                const randomChunk = Math.floor(
                    Math.random() * remainingPercentage,
                );
        votes[wrongIndices[i]] = randomChunk;
                        remainingPercentage -= randomChunk;
            }
        }
            votes[wrongIndices[wrongIndices.length - 1]] = remainingPercentage;
        return votes;
    };


  export  const generatePhoneFriendResponse = (level: number) => {
      const level1Responses = [
          "Why are you asking this? It's literally the first result on Google. Anyway, I think it's {correctAnswer}. Seriously, just read the docs.",
          "Dude. This is basic. I'm almost offended you called. It's {correctAnswer}. Go back to tutorial hell.",
          "Let me get this straight. You called me for *that* question? It's {correctAnswer}. Please tell me you're joking.",
      ];

      const level2Responses = [
          "Good question. Not trivial, but you should know this. I'm leaning toward {correctAnswer}. Definitely worth reviewing the fundamentals.",
          "Solid question. I like the direction. I think it's {correctAnswer}, but double-check the edge cases.",
          "This is where the rubber meets the road. I'd say {correctAnswer} is your answer. Nice work thinking about this.",
      ];

      const level3Responses = [
          "That's a beautiful question. I genuinely respect the depth here. This is senior-level stuff. I think it's {correctAnswer}, but you should absolutely research this topic deeper.",
          "Whoa. Okay. This is the good stuff. I'm impressed you're even asking this. I'd go with {correctAnswer} personally. Keep digging into this area.",
          "Finally, a real question. This is the kind of thing that separates engineers. I'm leaning toward {correctAnswer}. This is a fantastic rabbit hole to explore.",
      ];
      // Pick a random response from the appropriate array
      let selectedResponse;
      if (level === 1) {
          selectedResponse =
              level1Responses[
                  Math.floor(Math.random() * level1Responses.length)
              ];
      } else if (level === 2) {
          selectedResponse =
              level2Responses[
                  Math.floor(Math.random() * level2Responses.length)
              ];
      } else {
          selectedResponse =
              level3Responses[
                  Math.floor(Math.random() * level3Responses.length)
              ];
      }
      return selectedResponse;
  };
