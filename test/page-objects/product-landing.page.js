import Page from './Page';
import ProductCardComponent from '../components/product-card.component'
import FeedBackComponent from '../components/feedback.component';
import TelevisionsFilterToolbarComponent from '../components/television-filters-toolbar.component';

/**
 * Generic product landing page. As product pages across the site appear to be identical in structure,
 * we just need to pass the slug for the page we want when we instantiate an object of this class.
 * (i.e. 'televisions' for https://www.which.co.uk/reviews/televisions)
 */
export default class ProductLandingPage extends Page {

  constructor(slug) {
    super();

    this.url = `/reviews/${slug}`;
  }

  /**
   * Selectors for a generic product landing page.
   */
  selectors = Object.assign(this.selectors, {
    header: '//div[@data-test-element="heading-container"]',
    productCard: '#product-card-wrapper',
    feedbackButton: '.usabilla_live_button_container',
    pager: '//nav[@data-test-element = "Pagination"]',
    firstPageButton: '//a[@data-test-element = "First page"]',
    lastPageButton: '//a[@data-test-element = "Last page"]',
    sortBy: '#product_listing_sorter',
  });

  /**
   * @todo Create generic filter toolbar component object, and return child toolbar components based on which product
   * page calls them. I.e. 'television' type product landing page returns TelevisionsFilterToolbarComponent when the 
   * below function is called.
   * @returns {Object} 
   */
  setFocusFilterToolbar() {
    return new TelevisionsFilterToolbarComponent();
  }

  /**
   * Given a page number, navigate to that page using the toolbar.
   * IF page number is above 1, we know that we aren't on the first page, and the first page button should appear next
   * to the pager. Therefore, we assert that it does.
   * ELSE, we are on the first page, and we know that the last page button should be displayed, and the first page button
   * should not be. In the case that there is only 1 page, this function has no use case, so we can make the above assertion
   * with certainty.
   * @param {Integer} pageNumber 
   */
  navigateToPage(pageNumber) {
    $(`(${this.selectors.pager}/a)[${pageNumber}]`).click();
    browser.pause(1000);
    $(this.selectors.header).waitForDisplayed();

    if (pageNumber > 1) {
      expect(this.selectors.firstPageButton).to.be.displayed();
    } else {
      expect(this.selectors.firstPageButton).not.to.be.displayed();
      expect(this.selectors.lastPageButton).to.be.displayed();
    }
  }

  /**
   * Click the first page button. 
   * Assert that the first page button disappears when we finish navigating.
   * Assert that the last page button now appears.
   * In the case that there is only 1 page, this function has no use case, so we can make the above assertion
   * with certainty.
   */
  navigateToFirstPage() {
    $(this.selectors.firstPageButton).click();

    browser.pause(1000)
    $(this.selectors.header).waitForDisplayed();

    expect(this.selectors.firstPageButton).not.to.be.displayed();
    expect(this.selectors.lastPageButton).to.be.displayed();
  }

  /**
   * Click the last page button. 
   * Assert that the last page button disappears when we finish navigating.
   * Assert that the first page button now appears.
   */
  navigateToLastPage() {
    $(this.selectors.lastPageButton).click();

    browser.pause(1000);
    $(this.selectors.header).waitForDisplayed();

    expect(this.selectors.firstPageButton).to.be.displayed();
    expect(this.selectors.lastPageButton).not.to.be.displayed();
  }

  /**
   * Given its index on the page, return a product card object.
   * @param {Integer} index 
   * @returns {Object}
   */
  getProductCard(index) {
    return new ProductCardComponent(index);
  }

  /**
   * Return the total number of product cards on the page;
   * @returns {Integer}
   */
  getNumberOfProductCards() {
    return $$(this.selectors.productCard).length;
  }

  /**
   * Open the feedback form and return it as an object.
   * @returns {Object}
   */
  openFeedbackForm() {
    $(this.selectors.productCard).scrollIntoView();
    $(this.selectors.feedbackButton).click();

    return new FeedBackComponent();
  }

  /**
   * Assert that each product card on the page has the correct elements displaying.
   */
  assertProductCardsAppearCorrectly() {
    for (let i = 1; i < this.getNumberOfProductCards(); i++) {
      let productCard = this.getProductCard(i);
      productCard.assertProductCardAppearsCorrectly();
    }
  }

  /**
   * @todo Sorting tests
   */
  // sortByMostRecentlyReviewed() {
  //   $(this.selectors.sortBy).selectByVisibleText('Most-recently reviewed');
  // }

  // sortByPriceAscending() {
  //   $(this.selectors.sortBy).selectByVisibleText('Price (low to high)');
  // }

  // sortByPriceDescending() {
  //   $(this.selectors.sortBy).selectByVisibleText('Price (high to low)');
  // }

  // sortByLaunchDate() {
  //   $(this.selectors.sortBy).selectByVisibleText('Most-recently launched');
  // }
}