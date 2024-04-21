export class Game {
  constructor() {
    // game state
    this.state = {
      active: false,
      countdownSeconds: 30,
      userInput: '',
      prompt: '',
      score: {
        wrongCount: 0,
        correctCount: 0,
      },
      useTimer: true,
    };

    if (document.querySelector('input#use-timer')) {
      document.querySelector('input#use-timer').addEventListener('change', this.toggleTimer);
    }
  }

  toggleTimer = (e) => {
    this.state.useTimer = e.target.checked;
  };
}
