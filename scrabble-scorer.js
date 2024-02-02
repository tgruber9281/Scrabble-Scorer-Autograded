// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
let wordToScore = '';

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowelBonusPointStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U']
 };

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function getValidInput(prompt, test) {
   let userInput = input.question(prompt);
   
   while (!test(userInput)) {
      console.log(`\nInvalid input. Try again.\n`);
      userInput = input.question(prompt);
   }
   return userInput;
}

function isString(userInput) {
   let regex = /^[A-Za-z]+$/;
   if (regex.test(userInput)) {
      return true;
   }
   return false;
}

function isNum(userInput) {
   if (typeof Number(userInput) === 'number' && userInput < scoringAlgorithms.length) {
      return true;
   }
   return false;
}

function initialPrompt() {
   console.log("Let's play some scrabble!");
   wordToScore = getValidInput("Enter a word to score: ",isString);
};

let simpleScorer = function(word) {
   word = word.toUpperCase();
   let simplePoints = 0;
   for (i = 0; i < word.length; i++) {
      simplePoints++;
   }
   return simplePoints;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let vowelPoints = 0;

   for (let i = 0; i < word.length; i++) {
      for (const pointValue in vowelBonusPointStructure) {
         if (vowelBonusPointStructure[pointValue].includes(word[i])) {
            vowelPoints += Number(pointValue);
         }
      }
   }
   return vowelPoints
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let scrabblePoints = 0;

   for (let i = 0; i < word.length; i++) {
      for (key in newPointStructure) {
         if (word[i] === key) {
         scrabblePoints += newPointStructure[key];
         }
      }
   }
   return scrabblePoints
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let num = getValidInput(`Which scoring algorithm would you like to use?

   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system
   Enter 0, 1, or 2: `,isNum);
   return scoringAlgorithms[num];
}

function transform(obj) {
   let newPointStructure = {};
   for (const num in obj) {
      let letters = obj[num];
      // console.log(letters);
      for (let i = 0; i < letters.length; i++) {
         newPointStructure[letters[i].toLowerCase()] = Number(num);
      }
   }
   // newPointStructure[' '] = 0;
   return newPointStructure 
};

let newPointStructure = transform(oldPointStructure);
// console.log(newPointStructure);

function runProgram() {
   initialPrompt();
   let scorer = scorerPrompt();
   console.log(`Score for '${wordToScore}': ${scorer.scorerFunction(wordToScore)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
