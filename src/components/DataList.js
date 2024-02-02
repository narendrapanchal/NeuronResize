import React, { useState } from 'react'

function DataList({data,updateTodo}) {
    const [text,setText]=useState(data.text);
    const [editText,setEditText]=useState(false);
    const handleCancel=()=>{
        setEditText(false);
        setText(data.text);
    }
  return (
    <div>
        {editText?<div><input value={text} onChange={(e)=>{
            setText(e.target.value);
        }}/><button onClick={handleCancel}>Cancel</button><button disabled={text.length<3} onClick={()=>{
            updateTodo({userId:data.userId,_id:data._id,text})
            setEditText(false)
        }}>Done</button></div>:
      <><p>{data.text}</p><button onClick={()=>{
        setEditText(true)
      }}>Edit</button></>}
    </div>
  )
}

export default DataList
