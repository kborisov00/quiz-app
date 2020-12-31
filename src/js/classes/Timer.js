export default class Timer {
  constructor(config) {
    this.initialTimeSeconds = config.initialTimeSeconds;
    this.decrementValueSeconds = config.decrementValueSeconds;

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
   * the counter and returns a
   * callback on every tick
   * @param {function} callback 
   */
  async decrementTime(callback) {
    // decrement only if counter is not zero
    if (this.counter > 0) {
      this.counter -= this.decrementValueSeconds;
      callback();
    } else {
      this.clearTime();
    }
  }

  /**
   * @desc this function returns a callback
   * on every tick containing the point of time
   * @param {function} callback 
   */
  async startTimer(callback) {
    this.interval = setInterval(() => {
      this.decrementTime(() => callback(this.counter));
    }, this.decrementValueMilliseconds);
  }
}
