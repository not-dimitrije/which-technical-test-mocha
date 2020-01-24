export default class FeedBackComponent {
  selectors = {
    frame: '//iframe[@title="Usabilla Feedback Form Frame"]',
    ratingTitle: '#star-input',
    ratings: {
      hate: '#Hate-label',
      dislike: '#Dislike-label',
      neutral: '#Neutral-label',
      like: '#Like-label',
      love: '#Love-label',
    },
    feedbackTitle: '#comment-input',
    textArea: '//textarea[@name="feedback"]',
    buttonDisabled: '.disabled',
    buttonEnabled: '.submit',
  }

  /**
   * When called, wait for the iframe to appear on the screen, and switch the driver's focus to it.
   */
  constructor() {
    $(this.selectors.frame).waitForDisplayed();
    browser.switchToFrame($(this.selectors.frame));
  }

  /**
   * Assert that all relevent selectors appear.
   * The enabled version of the submit button only appears once we select a rating, so we select a rating
   * to assert that the enabled version of the submit button will appear. 
   */
  assertAppearsCorrectly() {
    expect(this.selectors.ratingTitle).to.be.displayed();
    expect(this.selectors.ratings.hate).to.be.displayed();
    expect(this.selectors.ratings.dislike).to.be.displayed();
    expect(this.selectors.ratings.neutral).to.be.displayed();
    expect(this.selectors.ratings.like).to.be.displayed();
    expect(this.selectors.ratings.love).to.be.displayed();
    expect(this.selectors.feedbackTitle).to.be.displayed();
    expect(this.selectors.textArea).to.be.displayed();
    expect(this.selectors.buttonDisabled).to.be.displayed();

    $(this.selectors.ratings.love).click();
    expect(this.selectors.buttonEnabled).to.be.displayed();
  }
}