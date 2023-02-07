import React, { useEffect, useState } from "react";
import './App.css';

const COLORS = {
  "db2525": ["red"],
  "e38e0e": ["orange"],
  "ebcc34": ["yellow"],
  "527a61": ["green"],
  "34a8eb": ["blue"],
  "f7c3e4": ["pink"],
  "784B84": ["purple"],
  "050505": ["black"],
  "593810": ["brown"],
  "FFFFFF": ["white"],
  "8a8a8a": ["gray","grey"]
}
const AVAILABLE_COLORS = Object.keys(COLORS)
const COLOR_OPTIONS = Object.values(COLORS).flat()

// make a bank of questions and answers
// make a way to show the question 
// make a way to input the answer
// make a way to check the answer
// show the user if the answer is correct

const capitalize = (word) => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const Question = ({test}) => { 
  return (
   <>
     <header className="App-header">
       <h1>What color is this?</h1>
     </header>
     <div>
       <div style={{backgroundColor: `#${test}`, width: '350px', height: '300px'}}></div>
     </div>
   </>
   
  ) 
 }

const ShowResult = ({isCorrect}) => {
  if (isCorrect) {
    return (
      <div className="Correct-answer"> That's correct! Yay! </div> 
    )
  } else if (isCorrect === false) {
    return (
      <div className="Wrong-answer"> OOPS! Please try again... </div>
    )
  }
  return <></>
}

const ShowTypeAnswer = ({setAnswer , checkAnswer}) => {
  return (
    <>
      <label style={{margin: '20px'}} htmlFor="color">Type the answer below</label>

      <input type="text" id="color" name="color" onChange={(evt)=> setAnswer(evt.target.value)}/>
      <button style={{margin: '3px'}} onClick={(evt)=> checkAnswer()}>
        Submit 
      </button>
    </>
  )
}

const ShowMultipleAnswer = ({setAnswer , checkAnswer, test}) => {
  const correctAnswer = COLORS[test] && COLORS[test][0]
  const otherChoices = COLOR_OPTIONS.filter(color => color !== correctAnswer);
  const multipleChoice = [
    correctAnswer,
    otherChoices[Math.floor(Math.random() * otherChoices.length)],
    otherChoices[Math.floor(Math.random() * otherChoices.length)],
    
  ]
  shuffle(multipleChoice)

  console.log("multipleChoice" , multipleChoice)
  // fix line 72
  // create random options to our answers
  // randomize order to our answers
  return (
    <>
      <div>
       {multipleChoice.map((choice) => <button onClick={() => {setAnswer(choice)}}> {capitalize(choice)}</button>)}

      </div>
    </>
  )
}

function App() {
  const [answer, setAnswer] = useState("")
  const [test, setTest] = useState("")
  const [isCorrect, setIsCorrect] = useState(null)
  const [selectedView, setSelectedView] = useState("Home")

// make a question component
// make answer components
// make isCorrect component
// make navigation buttons; home, typing, multiple choice
// switch views based on buttons
//  console.log("test", test )
//  console.log("answer", answer )

  useEffect(() => {
    getNewQuestion()
  }, []);

  useEffect(() => {
    if (selectedView === "Multiple"){
      checkAnswer()
    }
  }, [answer]);

  const checkAnswer = () => {
    const normalizedAnswer = answer.toLowerCase()
    const isCorrectAnswer = COLORS[test].includes(normalizedAnswer)


    setIsCorrect(isCorrectAnswer) 
    if (isCorrectAnswer) {
      getNewQuestion()
    }
  }

 // console.log("isCorrect", isCorrect )
  const getNewQuestion = () => {
   return setTest(AVAILABLE_COLORS[Math.floor(Math.random() * AVAILABLE_COLORS.length)])
  }
 


  return (
    <div className="App">
      
      <button className="Home" onClick={()=> setSelectedView("Home")}>Home</button>
      <div> 
        <button className="Type" onClick={()=> setSelectedView("Type")}>Type Your Answer</button>
        <button className="Multiple" onClick={()=> setSelectedView("Multiple")}>Multiple Choice</button>
      </div>
      {selectedView === "Home" && 
        <>
          <div className="Title">Learn Your Colors, Cole!</div>
          <img style={{width: "80%", maxWidth:"400px"}} src="cole.jpg"/>
        </>
      }
      

      {selectedView === "Type" && 
        <>
          <Question test={test}/>
          <ShowTypeAnswer setAnswer={setAnswer} checkAnswer={checkAnswer}/>

          <ShowResult isCorrect={isCorrect}/>
        </>
      }

      {selectedView === "Multiple" && 
        <>
          <Question test={test}/>
          <ShowMultipleAnswer test={test} setAnswer={setAnswer} checkAnswer={checkAnswer}/>

          <ShowResult isCorrect={isCorrect}/>
        </>
      }
    </div>
  );
}

export default App;
