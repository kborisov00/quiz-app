export default class Timer {
  constructor(config) {
    this.timeNode = config.timeNode;
    this.initialTimeSeconds = config.initialTimeSeconds;
    this.decrementValueSeconds = config.decrementValueSeconds;

    this.decrementValueMilliseconds = this.decrementValueSeconds * 1000;
    this.counter = this.initialTimeSeconds;
    this.interval = null;

    this.timeNode.innerText = this.initialTimeSeconds;
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
      this.timeNode.innerText = this.counter;
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
    this.interval = setInterval(() => {
      this.decrementTime(() => callback());
    }, this.decrementValueMilliseconds);
  }

  /**
   * Getters
   */
  getTime() {
    return this.counter;
  }
}
