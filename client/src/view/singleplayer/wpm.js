import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,

      correctChars: props.corChars,
      errorsCnt: props.errorCnt,

      isStarted: props.isGameStarted,
      isFinished: props.isGameFinished,

      wpmFn: props.wpmFn,
      wpm: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        correctChars: nextProps.corChars,
        errorsCnt: nextProps.errorCnt,

        isStarted: nextProps.isGameStarted,
        isFinished: nextProps.isGameFinished,
      });
    }
  }

  componentWillMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isGameFinished !== prevProps.isGameFinished) {
      this.stopTimer();
    }
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  stopTimer = () => {
    this.state.wpmFn(
      Math.round(
        this.state.correctChars / 5 / (this.state.timerTime / 1000 / 60)
      )
    );
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };
  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };

  render() {
    let minutes = Math.floor(this.state.timerTime / (1000 * 60)) % 60;
    let seconds = Math.floor(this.state.timerTime / 1000) % 60;
    let wpm = Math.round(
      this.state.correctChars / 5 / (this.state.timerTime / 1000 / 60)
    );

    return (
      <>
        <p className="timer">
          Time: {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}{" "}
        </p>

        <p className="WPM">WPM: {wpm}</p>
      </>
    );
  }
}
export default Timer;
