export default class TelevisionFiltersToolbarComponent {
  selectors = {
    whichRecommendations: '//button[@data-which-button = "which_recommendations-filter"]',
    screenSize: '//button[@data-which-button = "screen_size-filter"]',
    screenSizeOptions: {
      twentyToTwentyEightInches: '//label[@for="screen_size_20_28"]/div/span/span[@data-test-element = "bucketLabel"]',
      thirtyTwoToThirtyFourInches: '//label[@for="screen_size_32_34"]/div/span/span[@data-test-element = "bucketLabel"]',
      thirtyNineToFourtyFiveInches: '//label[@for="screen_size_39_45"]/div/span/span[@data-test-element = "bucketLabel"]',
      fourtyEightToFiftyInches: '//label[@for="screen_size_48_51"]/div/span/span[@data-test-element = "bucketLabel"]',
      fiftyFiveToSixtyInches: '//label[@for="screen_size_55_60"]/div/span/span[@data-test-element = "bucketLabel"]',
    },
    screenType: '//button[@data-which-button = "screen_type-filter"]',
    screenTypeOptions: {
      oled: '//label[@for="screen_type_oled"]/div/span/span[@data-test-element = "bucketLabel"]',
      lcd: '//label[@for="screen_type_lcd"]/div/span/span[@data-test-element = "bucketLabel"]',
      curved: '//label[@for="screen_type_curved"]/div/span/span[@data-test-element = "bucketLabel"]',
      qled: '//label[@for="screen_type_qled"]/div/span/span[@data-test-element = "bucketLabel"]',
    },
    moreFilters: '//button[@data-which-id = "more-filters"]',
    signUpPromptButton: '//a[@data-which-id = "filters-cta"]',
    alternativeSignUpPromptButton: '//a[@data-which-id = "filters-CTA"]'
  }

  /**
   * Click the "Which? recommendations" button
   * Assert that the "Try Which? for £1" prompt appears
   */
  assertWhichRecommendationsFiltersAppearCorrectly() {
    $(this.selectors.whichRecommendations).click();
    $(this.selectors.signUpPromptButton).waitForDisplayed();

    expect(this.selectors.signUpPromptButton).to.be.displayed();
  }

  /**
   * Click the "Screen size" button
   * Assert that all expected filtering options appear. 
   */
  assertScreenSizeFiltersAppearCorrectly() {
    $(this.selectors.screenSize).click();
    $(this.selectors.screenSizeOptions.twentyToTwentyEightInches).waitForDisplayed();

    Object.keys(this.selectors.screenSizeOptions).forEach(screenSizeOption => {
      expect(this.selectors.screenSizeOptions[screenSizeOption]).to.be.displayed();
    });
  }

  /**
   * Click the "Screen type" button
   * Assert that all expected filtering options appear. 
   */
  assertScreenTypeFiltersAppearCorrectly() {
    $(this.selectors.screenType).click();
    $(this.selectors.screenTypeOptions.oled).waitForDisplayed();

    Object.keys(this.selectors.screenTypeOptions).forEach(screenTypeOption => {
      expect(this.selectors.screenTypeOptions[screenTypeOption]).to.be.displayed();
    });
  }

  /**
   * Click the "More filters" button
   * Assert that the "Try Which? for £1" prompt appears
   */
  assertMoreFiltersAppearCorrectly() {
    $(this.selectors.moreFilters).click();
    $(this.selectors.alternativeSignUpPromptButton).waitForDisplayed();

    expect(this.selectors.alternativeSignUpPromptButton).to.be.displayed();
  }

}