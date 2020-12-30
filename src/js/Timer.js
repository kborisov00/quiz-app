export default class Timer {
  constructor(initialTimeSeconds, decrementValueSeconds) {
    this.initialTimeSeconds = initialTimeSeconds;
    this.decrementValueSeconds = decrementValueSeconds;
    this.decrementValueMilliseconds = this.decrementValueSeconds * 1000;
  }

  decrementTime() {
    if (this.initialTimeSeconds > 0) {
      this.initialTimeSeconds -= this.decrementValueSeconds;
    }
  }

  getTime() {
    return this.initialTimeSeconds;
  }

  init() {
    setInterval(() => this.decrementTime(), this.decrementValueMilliseconds);
  }
}
