import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'

import QuestionDisplay from '../../components/QuestionDisplay/QuestionDisplay'


const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      
      <QuestionDisplay category={category} />
    </div>
  )
}

export default Home
