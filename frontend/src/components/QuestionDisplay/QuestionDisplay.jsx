import React from "react"
import "./QuestionDisplay.css"
import { StoreContext } from "../../context/StoreContext"
import QuestionItem from "../QuestionItem/QuestionItem"
import { useContext } from "react"

const QuestionDisplay = ({category}) => {

  const { question_list } = useContext(StoreContext)

  return (
    <div className='question-display' id='question-display'>
      <h2>View Tutorials for Commonly Encountered Tech Issues/Questions</h2>
      <div className="question-display-list">
        {question_list.map((item,index)=>{
          return <QuestionItem key={index} id={item._id} question={item.question} answer={item.answer}  />
        })}
      </div>
    </div>
  )
}


export default QuestionDisplay
