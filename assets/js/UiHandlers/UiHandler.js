export default class UiHandler {
  constructor() {
    this.els = {};
    this.els.navWrapperHeading = document.querySelector('.nav-wrapper-heading');
    this.els.modeNavigation = document.querySelector('.nav-wrapper nav');
    this.els.modeNavigationCloseButton = document.querySelector('.mobile-nav-close-button');

    this.els.navWrapperHeading.addEventListener('click', this.modeSelectorClicked);
    this.els.modeNavigationCloseButton.addEventListener('click', this.closeNavigation);
  }

  modeSelectorClicked = () => {
    this.els.modeNavigation.classList.add('active');
  };
  closeNavigation = () => {
    this.els.modeNavigation.classList.remove('active');
  };
}
