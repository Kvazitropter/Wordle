import { question } from 'readline-sync';

const words = ['peach', 'index', 'guard', 'paint', 'click', 'apple', 'jelly', 'noise'];
const rounds = 6;

const getRandomElem = (array) => {
  const randomInx = Math.trunc(Math.random() * (words.length + 1));
  return array[randomInx];
};

const processAttempt = (attempt, answer) => {
  const letters = [...attempt];
  let remain = answer;
  return letters.map((letter, i) => {
    if (remain.includes(letter)) {
      remain = remain.replace(letter, '');
      if (letter === answer[i]) {
        return '_';
      }
      return '+';
    }
    return '.';
  });
};

export default () => {
  const answer = getRandomElem(words);
  let attempt;
  let reply;

  console.log('Try to guess five-letter word in six tries\n');
  console.log('_\tright letter in the right place');
  console.log('+\tright letter in the wrong place');
  console.log('.\tthe word doesn\'t include this letter');

  for (let round = 1; round <= rounds; round += 1) {
    attempt = question('\nYour guess: ', { limit: /^[a-z]{5}$/, limitMessage: 'It should be five-letter word!' });
    reply = processAttempt(attempt, answer, []);

    console.log(`${attempt.split('').join(' ')}\n${reply.join(' ')}`);

    if (attempt === answer) {
      console.log('Congrats!');
      return;
    }
  }

  console.log(`Sorry, you didn't guess... It was "${answer}"!`);
};
