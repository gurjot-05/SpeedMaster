import React, { Component } from "react";

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 1000 * props.countDownSec,

      countDownFn: props.countDownFn,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        this.state.countDownFn(this.state.timerTime);
      }
    }, 10);
  };

  render() {
    return (
      <span className="countdown">
        {Math.floor(this.state.timerTime / 1000)}
      </span>
    );
  }
}

export default CountDown;
