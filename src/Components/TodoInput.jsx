import React, { useState } from 'react'

export const TodoInput = ({addTask}) => {
    const [value,setValue]=useState("")
  return (
    <div>
        <input type="text" placeholder='Add Task' value={value} onChange={(e)=>{setValue(e.currentTarget.value)}}/>
        <button onClick={()=>{addTask(value,false);setValue("")}}>Add</button>
        <button onClick={()=>{addTask(value,true);setValue("")}}>Save</button>
    </div>
  )
}
