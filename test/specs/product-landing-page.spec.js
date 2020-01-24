import ProductLandingPage from '../page-objects/product-landing.page'

describe('Product Landing Page', () => {
  /**
   * 1. Navigate to the television reviews section.
   * 2. Navigate to the second page, using the pager.
   * 3. Assert that all product cards appear as expected.
   * 4. Assert that the "first page" button now appears next to the pager.
   * 5. Navigate back to the first page, using the "first page" button. 
   * 6. Assert that all product cards appear as expected.
   * 7. Assert that the "first page" button is no longer visible.
   * 8. Navigate to the last page, using the "last page" button next to the pager.
   * 9. Assert that all product cards appear as expected.
   * 10. Assert that the "last page" button is no longer visible.
   */
  it('Product cards and pager', () => {
    const televisionsLandingPage = ProductLandingPage.navigate('televisions');

    televisionsLandingPage.navigateToPage(2);
    televisionsLandingPage.assertProductCardsAppearCorrectly();

    televisionsLandingPage.navigateToFirstPage();
    televisionsLandingPage.assertProductCardsAppearCorrectly();

    televisionsLandingPage.navigateToLastPage();
    televisionsLandingPage.assertProductCardsAppearCorrectly();
  });

  /**
   * 1. Navigate to the television reviews page.
   * 2. Open the feedback form.
   * 3. Assert that it appears as expected.
   */
  it('Feedback form', () => {
    const tvLandingPage = ProductLandingPage.navigate('televisions');

    const feedbackForm = tvLandingPage.openFeedbackForm();
    feedbackForm.assertAppearsCorrectly();
  });

  /**
   * 1. Navigate to the television reviews page.
   * 2. Assert that the "Which? recommendations" filtering drop down menu displays a button prompting the user 
   * to sign up so that they can use the filter.
   * 3. Assert that the "Screen size" filtering options appear correctly.
   * 4. Assert that the "Screen type" filtering options appear correctly.
   * 5. Assert that the "More filters" filtering drop down menu displays a button prompting the user to sign up
   * so that they can use the filter.
   */
  it('Filter toolbar', () => {
    const tvLandingPage = ProductLandingPage.navigate('televisions');

    const filterToolbar = tvLandingPage.setFocusFilterToolbar();
    filterToolbar.assertWhichRecommendationsFiltersAppearCorrectly();
    filterToolbar.assertScreenSizeFiltersAppearCorrectly();
    filterToolbar.assertScreenTypeFiltersAppearCorrectly();
    filterToolbar.assertMoreFiltersAppearCorrectly();
  })

  /**
   * @todo Sorting tests
   * it('Sorting', () => {
   * 
   * });
   */

  /**
   * @todo Footer tests
   * it('Footer', () => {
   * 
   * });
   */
})