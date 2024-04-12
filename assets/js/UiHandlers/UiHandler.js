export default class UiHandler {
  constructor() {
    this.els = {};
    this.els.navWrapperHeading = document.querySelector('.nav-wrapper-heading');
    this.els.modeNavigation = document.querySelector('.nav-wrapper nav');
    this.els.modeNavigationCloseButton = document.querySelector('.mobile-nav-close-button');
    this.els.themeToggle = document.querySelector('.theme-selector-container');

    this.els.navWrapperHeading.addEventListener('click', this.modeSelectorClicked);
    this.els.modeNavigationCloseButton.addEventListener('click', this.closeNavigation);
    this.els.themeToggle.addEventListener('click', this.toggleTheme);

    this.setTheme();
  }

  setTheme = () => {
    let theme = window.localStorage.getItem('theme');

    if (!theme) {
      if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      } else {
        theme = 'light';
      }
    }

    document.querySelector('html').dataset.theme = theme === 'dark' ? 'dark' : 'light';
  };

  modeSelectorClicked = () => {
    this.els.modeNavigation.classList.add('active');
    const score = document.querySelector('#score');
    if (score) score.classList.add('hidden');
  };

  closeNavigation = () => {
    this.els.modeNavigation.classList.remove('active');
  };

  toggleTheme = (e) => {
    console.log('toggle');
    const theme = window.localStorage.getItem('theme');
    if (theme) {
      if (theme === 'dark') {
        window.localStorage.setItem('theme', 'light');
        document.querySelector('html').dataset.theme = 'light';
      } else {
        window.localStorage.setItem('theme', 'dark');
        document.querySelector('html').dataset.theme = 'dark';
      }
    } else {
      window.localStorage.setItem('theme', 'light');
      document.querySelector('html').dataset.theme = 'light';
    }
  };
}
