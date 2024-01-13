import { useState } from "react";

export function CreateTodo(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return <div>
    <input type="text" placeholder="title" id="title" onChange={function(e){
      const value = e.target.value;
      setTitle(e.target.value);
    }}/> <br /><br />
    <input type="text" placeholder="description" id="desc" onChange={function(e){
      const value = e.target.value;
      setDescription(e.target.value);
    }}/>
    <br /><br />
    <button 
    onClick={()=>{
      fetch("http://localhost:3000/todo",{
        method: 'POST',
        body: JSON.stringify({
          title: title,
          description: description
        }),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(async (res)=>{
        const json = await res.json();
        alert("Todo Added")
      })
    }}>
      Add todo</button>
  </div>
}