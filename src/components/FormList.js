import React, { useState } from 'react'
import DataList from './DataList'
function FormList({user,data,setDataChanged}) {
    const [text,setText]=useState("");
    const handleChange=(e)=>{
        setText(e.target.value)
    }
    const handleAdd=()=>{
        const data = {
            userId: user._id,
            text: text
        };
        fetch("https://neuron-backend.onrender.com/todo/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    setDataChanged((prev)=>!prev)
                }
                throw new Error('Network response was not ok.');
            })
            .catch(error => {
                console.error('There was a problem with the POST request:', error.message);
            });
    }

    function updateTodo(data) {
        fetch(`https://neuron-backend.onrender.com/todo/${data._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    setDataChanged((prev)=>!prev)
                }
                throw new Error('Network response was not ok.');
            })
           
            .catch(error => {
                console.error('There was a problem updating user data:', error.message);
            });
    }
    

  return (
    <div className='form_list'>
      <div className='form_list_input'><input value={text} onChange={handleChange}/> <button disabled={text.length<3} onClick={handleAdd}>Add</button><span>Count: {user.count}</span></div>
      {data.map((ele,index)=><DataList updateTodo={updateTodo} data={ele}/>)}
    </div>
  )
}

export default FormList
