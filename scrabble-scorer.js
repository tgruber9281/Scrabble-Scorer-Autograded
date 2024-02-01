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

function initialPrompt() {
   console.log("Let's play some scrabble!");
   wordToScore = input.question("Enter a word to score: ");
   // console.log(oldScrabbleScorer(wordToScore));
   // console.log(simpleScorer(wordToScore));
   // console.log(vowelBonusScorer(wordToScore));
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

let scrabbleScorer = oldScrabbleScorer;

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scoringFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scoringFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scoringFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let num = Number(input.question(`Which scoring algorithm would you like to use?

   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system
   Enter 0, 1, or 2: `))
   return scoringAlgorithms[num];
}

function transform() {};

let newPointStructure;

function runProgram() {
   initialPrompt();
   let scorer = scorerPrompt();
   console.log(`Score for '${wordToScore}': ${scorer.scoringFunction(wordToScore)}`);
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
