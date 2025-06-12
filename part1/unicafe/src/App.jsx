import { useState } from 'react'

const Button = ({ current, setter,title }) => {
    return (
        <button onClick={() => setter(current + 1)}>{title}</button>
    );
};

const Statistics = ( {good, neutral, bad  }) => {
    if (good || neutral || bad) {
        return (
            <div>
                <h1>Statistics</h1>
                <table >
                    <tbody>
                        <StatisticLine text={'good'} value={good}/>
                        <StatisticLine text={'neutral'} value={neutral}/>
                        <StatisticLine text={'bad'} value={bad}/>
                        <StatisticLine text={'average'} value={ (good -bad) / (good + bad + neutral) }/>
                        <StatisticLine text={'positive'} value={  (good /  (good + bad + neutral) ) + '%'}/>
                    </tbody>
                </table>
            </div>
        );
    }
    else{
        return (
            <p>No feedback given</p>
        )
    }

};




const StatisticLine = ({text,value}) => {
    return (
        <tr>
            <td>{text} {value}</td>
        </tr>
    );
};


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
           <h1>Give Feedback</h1>

            <div>
                <Button current={good} setter={setGood} title='good'/>
                <Button current={bad} setter={setBad} title={'bad'}/>
                <Button current={neutral} setter={setNeutral} title='neutral'/>
            </div>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App