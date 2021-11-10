/**
 * History redirection func
 */
class HistoryRedirection {
  /**
   * History redirection constructor
   */
  constructor() {
    this.redirectionUrl = [];
  }

  /**
     * push url to web history
     * @param {string} url
     */
  push(url) {
    this.redirectionUrl.push(url);
  }

  /**
     * pop url from web history
     * @return {string}
     */
  pop() {
    return this.redirectionUrl.pop();
  }

  /**
     * clear history array
     */
  clear() {
    this.redirectionUrl.clear();
  }
}

export default new HistoryRedirection();
