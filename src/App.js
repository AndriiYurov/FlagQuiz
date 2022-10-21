
import './App.css';
import { useState } from 'react';
import { questions } from './questions';


const delay = ms => new Promise (
  resolve => setTimeout(resolve, ms)
);

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

  function colorGreen(id) {
    const li = document.getElementById(id)
    li.classList.add('Green')
  }

  function colorRed(id) {
    const li = document.getElementById(id)
    li.classList.add('Red')
  }

  const handleAnswerOptionClick = async (isCorrect, id) => {

		if (isCorrect) {
			setScore(score + 1);
      colorGreen(id);
		}

    else {
      colorRed(id);
    }

		const nextQuestion = currentQuestion + 1;
		await delay(1000);
      if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
      
      const li = document.getElementById(id)
      li.classList.remove('Green', 'Red')

		} else {
			setShowScore(true);
		}
	};

  return (

        <div className='App'>

          {showScore ? (
            <div className='Score'>
              <p className='ScoreText'>You scored { score } out of {questions.length}</p>
            </div>
          ) : (
            <div>
              <div className='Picture'>
                <img src={questions[currentQuestion].image} width="400px" alt="pic"/>
              </div>
              <div className='AnswersContainer'>
{questions[currentQuestion].answerOption.map((item) => {
const {id, answerText, isCorrect } = item;

  return (
							<button id={id} key={id} className='Answers' onClick={() => {handleAnswerOptionClick(isCorrect, id)}}>{answerText}</button>
              
						)})}
            </div>
            </div>
          )}
          <div></div>
        </div>
      )
}

export default App;
