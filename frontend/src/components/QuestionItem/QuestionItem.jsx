import React, { useState } from 'react';
import './QuestionItem.css';

const QuestionItem = ({ id, question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => setIsExpanded(true);
  const handleClose = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  return (
    <>
      <div className="question-item" onClick={handleExpand}>
        <p className="question-item-name-only">{question}</p>
      </div>

      {isExpanded && (
        <>
          <div className="overlay" onClick={handleClose}></div>
          <div className="question-item expanded" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClose}>&times;</button>
            <div className="question-item-name-rating">
              <p>{question}</p>
            </div>
            <p className="question-item-desc">{answer}</p>
          </div>
        </>
      )}
    </>
  );
};

export default QuestionItem;