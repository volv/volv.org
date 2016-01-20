(function() {
  'use strict';

  // Dictionary object used to manipulate anagrams
  var dictionary = {};

  // List of letters used to help create incorrect choices
  dictionary.letters = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
  ];

  // List of words that are used for anagram questions
  dictionary.words = [
    'adaxial', 'agreeably', 'antinoise', 'asthenia', 'astint', 'babushka', 'bailiffry',
    'bathtub', 'bestab', 'bestiary', 'bibulous', 'bordage', 'bostonite',
    'brogue', 'brushoff', 'budlet', 'cathepsin', 'centesimi', 'chaste', 'chicayote',
    'coastal', 'coppice', 'couple', 'cuapinole', 'cytoplasm', 'daubingly',
    'dearth', 'deasil', 'drightin', 'drudge', 'ejecta', 'feelable',
    'fistnote', 'flareback', 'folial', 'fortunate', 'garrulous', 'gemmology',
    'glaringly', 'gleet', 'globule', 'gluepot', 'googol', 'googul',
    'humuslike', 'ichnology', 'illiberal', 'issite', 'karyotin', 'kella',
    'ketol', 'knowingly', 'lysogenic', 'macaque', 'meddle', 'menseful',
    'mocha', 'mournival', 'musher', 'natty', 'nonactive', 'nonserous',
    'outcut', 'outspeak', 'overheavy', 'partially', 'pernor', 'picnic',
    'prickwood', 'pyorrheal', 'redly', 'refine', 'regaler', 'rollick',
    'sandling', 'sarcastic', 'scypha', 'severely', 'sinkage', 'sissyish',
    'sogging', 'staling', 'steellike', 'stonelike', 'stoneware', 'tadpolism',
    'tarditude', 'tazia', 'thymiosis', 'tightener', 'tritical', 'trundler',
    'undenuded', 'underbank', 'unpaining', 'untraded', 'wayfare', 'woodworm',
    'woofer', 'zemeism'
  ];

  // Stores the count of the remaining words
  dictionary.wordCount = dictionary.words.length;

  dictionary.updateWordCount = function() {
    this.wordCount = this.words.length;
  };

  /**
  * Returns a random letter from dictionary.letters
  */
  dictionary.randLetter = function() {
    return this.letters[Math.floor(Math.random() * 100 % 26)];
  };

  /**
  * Replaces one letter of a word with a randomly selected letter
  */
  dictionary.replaceLetter = function(word) {
    var index = Math.floor(Math.random() * 100 % word.length);
    var newWord = word.slice(0, index) + word.slice(index + 1);
    return newWord += this.randLetter();
  };

  /**
  * Returns a random word from dictionary.words
  */
  dictionary.randWord = function() {
    return this.words[Math.floor(Math.random() * 100 % this.wordCount)];
  };

  /**
  * Randomly shuffles the letters around in a word
  */
  dictionary.shuffle = function(word) {
    var fragments = word.split('');
    for(var i = fragments.length; i > 0;) {
      var random = parseInt(Math.random() * i);
      var temp = fragments[--i];
      fragments[i] = fragments[random];
      fragments[random] = temp;
    }
    return fragments.join('');
  };

  /**
  * Removes a word from dictionary.words
  */
  dictionary.removeWord = function(word) {
    var index = dictionary.words.indexOf(word);
  };

  dictionary.sort = function(word) {
    return word.split('').sort().join('');
  };

  /**
  * Returns the correct answer for the current word
  */
  dictionary.getCorrectChoice = function(word) {
    return this.shuffle(word);
  };

  /**
  * Returns an incorrect answer for the current word
  */
  dictionary.getIncorrectChoice = function(word) {
    word = this.replaceLetter(word);
    return this.shuffle(word);
  };

  // View object used to change information displayed on the page
  var view = {};

  // Displays the player's score
  view.score = document.getElementById('score');

  // Stores the player's current numerical score value
  view.scoreNum = 0;

  // Stores the current word being used
  view.currWord = document.getElementById('currentWord');

  // Array of the four button choices
  view.buttons = document.getElementsByClassName('anagramButton');

  // Variable used to check if the game is over
  view.gameOver = false;

  // Start the current timer at 5 seconds
  view.seconds = 100;

  // Used to start a new countdown timer
  view.timer = null;

  /**
  * Manages the current word and button choices
  *
  * If correct choice is clicked:
  * - Remove current word from dictionary.words
  * - Update the word count
  * - Update the current word
  * - Update the score
  * - Reset the timer
  *
  * If incorrect choice is clicked, display a loss screen
  */
  view.render = function() {
    view.assignWords();
    view.displayTimer();
    for(var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].addEventListener('click', function(event) {
        if(event.target === dictionary.correctButton) {
          if(!view.gameOver) {
            dictionary.removeWord(view.currWord.innerHTML);
            dictionary.updateWordCount();
            view.assignWords();
            view.updateScore();
            view.resetTimer();
            view.displayTimer();
          }
        } else {
          if(!view.gameOver) {
            view.endGame(event.target);
          }
        }
      });
    }
    var resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', function() {
      window.location = 'anagrams.html';
    });
  };

  /**
  * Randomly assigns the current word and correct and incorrect choices to the four buttons
  */
  view.assignWords = function() {
    // Randomly choose a word to use as the anagram question
    this.currWord.innerHTML = dictionary.randWord();

    // Choose a random button to hold the correct choice
    dictionary.correctButton = this.buttons[Math.floor(Math.random() * 4)];
    dictionary.correctButton.innerHTML = dictionary.getCorrectChoice(this.currWord.innerHTML);

    // Give the rest of the buttons incorrect choices
    for(var i = 0; i < this.buttons.length; i++) {
      if(this.buttons[i] === dictionary.correctButton) {
        continue;
      } else {
        this.buttons[i].innerHTML = dictionary.getIncorrectChoice(this.currWord.innerHTML);
        // Make sure that the incorrect choice is not actually correct
        while(dictionary.sort(this.buttons[i].innerHTML) == dictionary.sort(dictionary.correctButton.innerHTML)) {
          this.buttons[i].innerHTML = dictionary.getIncorrectChoice(this.currWord.innerHTML);
        }
      }
    }
  };

  /**
  * Displays and updates the timer
  */
  view.displayTimer = function() {
    // Clear the previous timer
    clearInterval(view.timer);
    view.timer = setInterval(function() {
      if(view.seconds === 0) {
        // If the timer reaches zero, clear the timer and display a loss screen
        clearInterval(view.timer);
        view.endGame();
      } else {
        view.seconds--;
      }
      document.getElementById('timer').innerHTML = (view.seconds / 100).toFixed(2);
    }, 10);
  };

  /**
  * Resets the timer back to the beginning
  */
  view.resetTimer = function() {
    view.seconds = 500;
  };

  /**
  * Updates the player's current score
  */
  view.updateScore = function() {
    this.scoreNum++;
    this.score.innerHTML = 'Score: ' + this.scoreNum;
    if(this.scoreNum.toString().length < 2) {
      this.score.innerHTML = 'Score: 0' + this.scoreNum;
    }
  };

  /**
  * Stops the timer, shows the correct answer, and ends the game
  */
  view.endGame = function(clickedButton) {
    // If a wrong choice was made
    if(clickedButton && !this.gameOver) {
      // Show their incorrect choice in red
      clickedButton.style.background = '#ff3333';
      clickedButton.style.borderWidth = '5px';
      clickedButton.style.borderColor = 'red';
    }

    // Set the status of the game to be game over
    this.gameOver = true;

    // Show the correct answer in green
    dictionary.correctButton.style.background = 'green';
    dictionary.correctButton.style.borderWidth = '5px';

    // Stop the timer
    view.seconds = 0;

    // Go to the loss screen after a couple of seconds
    setTimeout(view.displayLossScreen, 1500);
  };

  /**
  * Displays the loss screen
  */
  view.displayLossScreen = function() {
    // Reveal the loss screen and show the final score
    document.getElementById('lossScreen').style.zIndex = '10';
    document.getElementById('lossScreen').style.opacity = '1';
    document.getElementById('finalScore').innerHTML = view.scoreNum;
  };

  view.render();
})();