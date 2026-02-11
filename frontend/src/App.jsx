import React from 'react'
import FaceExpression from './components/FaceExpression'
import MoodSongs from './components/MoodSongs'

const App = () => {
  return (
    <div className='h-screen w-screen bg-black text-white p-20'>
      <div>
        <FaceExpression />
        <MoodSongs />
      </div>
    </div>
  )
}

export default App