/**
 * Class containing product card components.
 * As there are many of these per product review page, we generate the selectors for a specific one by passing
 * in it's index on the page. 
 * For example, if we wanted to select the 4th product card on a review page, we would pass in the integer 4
 * when instantiating an object of this class.
 */
export default class ProductCardComponent {
  /**
   * Assign the index to an "id" property.
   * @param {Integer} componentIndex 
   */
  constructor(componentIndex) {
    this.id = componentIndex;
  }

  selectors = {
    card: '//div[@data-which-id="product-card"]',
    manufacturerModel: '//div[@data-which-id="manufacturer-model"]',
    image: '//img[@data-test-element="product-image"]',
    firstLookLabel: '//p[@data-test-element="product-score-label"]',
    productScoreLabel: '//span[@data-test-element="product-score-label"]',
    productScoreValue: '//span[@data-test-element="product-score-value"]',
    reviewDate: '//p[@data-test-element="tested-date"]',
    price: '//p[@data-test-element="product-amount"]',
    compareCheckbox: '//div[@data-which-id="compare"]',
  }

  /**
   * Generate an array of selectors for the given product card object.
   * If the product has only recently been reviewed, it will have a label containing the test "First look",
   * wheras otherwise, it will have a "Product score" label and rating.
   * As such, we check to see which type of product card we are looking at, and then assign the correct selectors.
   */
  generateCardSelectors() {
    $(this.selectors.card).waitForDisplayed();

    const cardSelectors = [
      `(${this.selectors.card})[${this.id}]`,
      `(${this.selectors.manufacturerModel})[${this.id}]`,
      `(${this.selectors.image})[${this.id}]`,
      `(${this.selectors.reviewDate})[${this.id}]`,
      `(${this.selectors.price})[${this.id}]`,
    ];

    if ($(`(${this.selectors.productScoreLabel})[${this.id}]`).isDisplayed()) {
      cardSelectors.push(`(${this.selectors.productScoreLabel})[${this.id}]`);
      cardSelectors.push(`(${this.selectors.productScoreValue})[${this.id}]`);
    } else {
      cardSelectors.push(`(${this.selectors.firstLookLabel})[${this.id}]`);
    }

    return cardSelectors;
  }

  /**
   * Generate correct selectors for a product card object. Then, assert that these expected elements actually appear. 
   */
  assertProductCardAppearsCorrectly() {
    this.generateCardSelectors().forEach(element => {

      if ($(element).isDisplayedInViewport() === false) {
        $(element).scrollIntoView();
      }

      expect(element).to.be.displayed();
    });
  }

}