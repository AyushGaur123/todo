import { useState, useEffect } from 'react'
import "./App.css"
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let t = JSON.parse(localStorage.getItem("todos"))
      settodos(t)
      }
  }, [])

  const toggle = () => {
    setshowFinished(!showFinished)
  }

  const Edit = (e, id) => {
    let t = todos.filter(i => i.id == id)
    settodo(t[0].todo)
    console.log("edit")
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))    
  }
  
  const Delete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });

    settodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos)) //1
    
  }
  const Add = () => {
    let a = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    settodos(a)
    settodo("")
    localStorage.setItem("todos", JSON.stringify(a))

  }
  const change = (e) => {
    settodo(e.target.value)  
    
  }

  const Check = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos))
  }
  return (
    <>
     

      <div className=" flex justify-center ">
        <div className="box w-[600px] border-2  h-[600px] mt-8 rounded-2xl">
          <div className="box1 mb-6 mt-6 p-[12px] text-[30px] flex font-serif border-2 ">Just do it</div>
          <div className='   todos  text-[23px]'>
            
            <div>ADD A TASK TO YOUR PROJECT </div>
            <div className='flex'>
            <div><input type="text" onChange={change} value={todo} className='hi border-2' /></div>
           
            <div>
              <button onClick={Add} disabled={todo.length < 3}>Add</button>
            </div>
            </div>
            <input onChange={toggle} type="checkbox" checked={showFinished} />showFinished
            <div>Your todos</div>
            {todos.length === 0 && <div>No todos </div>}
            {todos.map(item => {
              return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo border-2 rounded-2xl  justify-between my-2 py-2 flex"}>

                <div className=' flex break-words gap-3 hi'>
                  <input name={item.id} onChange={Check} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className='flex gap-2 h-full'>
                  <button onClick={(e) => { Edit(e, item.id) }}>Edit</button>
                  <button onClick={(e) => { Delete(e, item.id) }}>delete</button>
                </div>
              </div>

            })}
          </div>
        </div>
      </div >
    </>
  )
}

export default App
