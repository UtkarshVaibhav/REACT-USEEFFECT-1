import React,{useEffect, useState} from 'react'
import { TodoInput } from './TodoInput'
// import { TodoList } from './TodoList'
import {v4} from'uuid';
export const Todos = () => {
    const [list,setList]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [isError,setIsError]=useState(false);
    const [page,setPage]=useState(1);
    const addTask=(val,check)=>{
        if(val!==''&&check)
        {
            const payload={
                title:val,
                status: false
            }
            const payloadjson= JSON.stringify(payload);
            setIsLoading(true);
            fetch('http://localhost:30001/tasks',{
                method: "POST",
                body: payloadjson,
                headers:{
                    "content-type":"application/json"
                }
            })
            .then(()=>getTodos())
            .catch(()=> setIsError(true))
            .finally(()=>setIsLoading(false))
        }
        else if(val!==''&&!check)
        {
            const payload={
                title:val,
                status: false,
                id: v4()
            }
            setList([...list,payload])
        }
    }
    useEffect(()=>{getTodos();},[page])
    const getTodos=()=>{
        setIsLoading(true);
        fetch(`http://localhost:30001/tasks?_page=${page}&_limit=2`)
        .then((res)=>res.json())
        .then((res)=>{
            setList(res)
            setIsError(false)
        })
        .catch((err)=>setIsError(true))
        .finally(()=>setIsLoading(false))
    };
  return isLoading? <div>...Loading</div>: isError? <div>Something went wrong</div>:(
    <div>
        <TodoInput addTask={addTask}/>
        {/* <TodoList list={list}/> */}
        <div>
        {
        list.map((item)=>{return <div key={item.id}>
            {item.title}
        </div>})
        }
    </div>
    <button onClick={()=>setPage(page-1)} disabled={page===1}>Prev</button>
    <button onClick={()=>setPage(page+1)}>Next</button>
    </div>
  )
}
