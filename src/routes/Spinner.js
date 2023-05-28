import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinners = ({path = 'login'}) => {
  const [count,setCount]=useState(3)
  const nav=useNavigate()
  const location=useLocation()
  useEffect(()=>{
const interval=setInterval(()=>{
setCount((prevCoutn)=> --prevCoutn)
},1000)
count===0 && nav(`/${path}`,{
  state:location.pathname,
}) 
return ()=>clearInterval(interval)
  },[count,nav,location,path])
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'style={{height:"100vh"}}>
            <h1 className='text-center'>Redirecting in {count} secound</h1>
      <div className='spinner-border'role='status'>
        <span className='visually-hidden'>
          Loading...
          </span>;
      </div>
         
    </div>
  )
}

export default Spinners