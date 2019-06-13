import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {
    let all = good + neutral + bad
    if (all === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                No feedback given
            </div>
        )
    }
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <Statistic counter={good} text={'good'}/>
                <Statistic counter={neutral} text={'neutral'} />
                <Statistic counter={bad} text={'bad'} />
                <Statistic counter={all} text={'all'} />
                <Statistic counter={(good - bad) / all} text={'average'} />
                <Statistic counter={good / all} text={'positive'} aftertext={'%'} />
            </table>
        </div>
    )
}

const Statistic = ({ counter, text, aftertext }) =>  <tbody><tr><td> {text} </td><td> {counter} {aftertext} </td></tr></tbody>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>Give feedback</h1>
        <Button
            handleClick={() => setGood(good + 1)}
            text='good'
        />
        <Button
            handleClick={() => setNeutral(neutral + 1)}
            text='neutral'
        />
        <Button
            handleClick={() => setBad(bad + 1)}
            text='bad'
        />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)