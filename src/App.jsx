import axios from 'axios';
import React, { useState } from 'react'

const App = () => {

  const [formdata , setFormdata] = useState({
    mygithub:"",
    opponent:""

  });

  // const [flag , setFlag] = useState(false);


  function handleChange(e){
    const {name , value} = e.target;

    setFormdata((prev)=>({
      ...prev , [name]:value,
    }));
  
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();

    try {
      const responseFirst = await axios.get(`${import.meta.env.VITE_REQUEST_URL}/${formdata.mygithub}`);
      console.log(`MyGit Data :`);
      console.log(responseFirst.data);
      
      const responseSecond = await axios.get(`${import.meta.env.VITE_REQUEST_URL}/${formdata.opponent}`);
      console.log(`Opponent data : `);
      console.log(responseSecond.data);
      
    } catch (error) {
      console.log(error);

    }
    
  }


  return (
    <div className='h-full w-full bg-[#2c392f] text-white flex flex-col justify-center text-center gap-4'>
      <input className="p-2 rounded-xl border-3 w-80" type="text" placeholder="Your Github Username" name="mygithub" value={formdata.mygithub} onChange={handleChange} />
      <input className="p-2 rounded-xl border-3 w-80" type="text" placeholder="Opponent Github Username" name="opponent" value={formdata.opponent} onChange={handleChange}/>
      <button className="bg-[#e5b960] rounded-xl w-30 p-2" onClick={handleSubmit}>Battle</button>

    </div>
  )
}

export default App