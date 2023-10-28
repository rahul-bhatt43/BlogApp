import React from 'react'
import {useNavigate} from 'react-router-dom'

const Error = () => {
    const navi = useNavigate();

    const homebtn = ()=>{
        navi('/')
    }

  return (
    <div style={{display:"flex", height:"70vh", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"15px"}}>
        <h1>Oops Page not found</h1>
        <button onClick={homebtn}>Goto HomePage</button>
    </div>
  )
}

export default Error