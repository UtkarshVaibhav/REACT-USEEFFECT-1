import React from 'react'

export const TodoList = ({list}) => {
  return (
    <div>
    {
        list.map((item)=>{return <div key={item.id}>
            {item.title}
        </div>})
    }
    </div>
  )
}
