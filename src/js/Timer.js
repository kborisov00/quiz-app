export default class Timer {
  constructor(initialTimeSeconds, decrementValueSeconds) {
    this.initialTimeSeconds = initialTimeSeconds;
    this.decrementValueSeconds = decrementValueSeconds;
    this.decrementValueMilliseconds = this.decrementValueSeconds * 1000;

    this.counter = this.initialTimeSeconds;
    this.interval = null;
  }

  /**
   * @desc this function clears the interval
   */
  clearTime() {
    clearInterval(this.interval);
    this.interval = null;
  }

  /**
   * @desc this function decrements
   * the counter and returns a callback
   * when the counter hits zero
   * @param {function} callback 
   */
  async decrementTime(callback) {
    if (this.counter > 0) {
      this.counter -= this.decrementValueSeconds;
    } else {
      this.clearTime();
      callback();
    }
  }

  /**
   * @desc this function returns a callback
   * when this.decrementTime returns a callback
   * which means the counter has hit zero
   * @param {callback} callback 
   */
  async startTimer(callback) {
    this.interval = setInterval(() => this.decrementTime(() => callback()), this.decrementValueMilliseconds); // eslint-disable-line max-len
  }

  /**
   * Getters
   */
  getTime() {
    return this.counter;
  }
}
