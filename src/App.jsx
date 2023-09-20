import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      timerDuration: 0, // in seconds
      timerRunning: false,
      timerInterval: null,
    };
  }

  handleDurationChange = (e) => {
    this.setState({ timerDuration: parseInt(e.target.value) });
  };

  handleStart = () => {
    if (!this.state.timerRunning) {
      const timerInterval = setInterval(this.tick, 1000);
      this.setState({ timerInterval, timerRunning: true });
    }
  };

  handleStop = () => {
    if (this.state.timerRunning) {
      clearInterval(this.state.timerInterval);
      this.setState({ timerInterval: null, timerRunning: false });
    }
  };

  handleReset = () => {
    this.handleStop();
    this.setState({ timerDuration: 0 });
  };

  tick = () => {
    if (this.state.timerDuration > 0) {
      this.setState((prevState) => ({
        timerDuration: prevState.timerDuration - 1,
      }));
    } else {
      this.handleStop();
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Timer App</h1>
        <div>
          <label>
            Set Timer Duration (seconds):
            <input
              type="number"
              value={this.state.timerDuration}
              onChange={this.handleDurationChange}
              disabled={this.state.timerRunning}
            />
          </label>
        </div>
        <div>
          <button onClick={this.handleStart} disabled={this.state.timerRunning}>
            Start
          </button>
          <button onClick={this.handleStop} disabled={!this.state.timerRunning}>
            Stop
          </button>
          <button onClick={this.handleReset}>Reset</button>
        </div>
        <div>
          <p>Time Remaining: {this.state.timerDuration} seconds</p>
        </div>
      </div>
    );
  }
}

export default App;