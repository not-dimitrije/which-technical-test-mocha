export default class Page {
  url = '/';

  /**
   * Selectors for elements which appear across all pages, such as the logo and toolbar, will be found here.
   */
  selectors = {

  }

  /**
   * Given a url, navigate to the page's url and return the page. If the page's constructor takes a parameter,
   * pass that parameter to the page when it is instantiated.
   * @param {any} parameter
   * @param {String} url
   * @returns {Object} page
   */
  static navigate(parameter, url) {
    const page = new this(parameter);
    page.navigate(url || page.url);
    return page;
  }

  navigate(url) {
    browser.url(url || this.url);
    return this;
  }

}