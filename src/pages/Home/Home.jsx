import React from 'react'
import './Home.css'
import bg from '../../assets/imgs/bg.png'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navi = useNavigate();

  const redirecttoBlogs = ()=>{
    navi('/blogs')
  }

  return (
    <div className='homesec'>
      <div className="hero">
        <div className="setme">
          <div className="content">
            <h1>LifeLogs</h1>
            <h3>A Short Written Note of your Memories</h3>
            <p>Capture the essence of your journey. Share life's treasured moments and experiences on our platform, where memories become timeless stories.</p>
          </div>
          <div className="heroBtn">
            <button onClick={redirecttoBlogs}>Read more...</button>
          </div>
        </div>
      </div>
      <div className="recents">

      </div>
    </div>

  )
}

export default Home