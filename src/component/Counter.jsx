import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Counter.css';

const styles = {}
class Counter extends Component {
  render() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={increment} data-tclass="btn">
            INCREMENT
          </button>
          <button className={styles.btn} onClick={decrement} data-tclass="btn">
            DECREMENT
          </button>
          <button className={styles.btn} onClick={incrementIfOdd} data-tclass="btn">
            INCREMENT IF ODD
          </button>
          <button className={styles.btn} onClick={() => incrementAsync()} data-tclass="btn">
            ASYNC INCREMENT
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
