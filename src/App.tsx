import { useEffect, useState } from "react"

const App = () => {

  interface Todo{
    // userId:number
    // id:number
    title:string
    completed:boolean
  }

  const [todo,setTodo]= useState<null | Todo>(null)
  const [error,setError] = useState<null | string>("")

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/200")
        if (!response.ok) throw new Error("Error 404: la página no existe")
        const data = await response.json() as Todo
        setTodo(data)
      } catch (e:unknown) {
        if (e instanceof Error) return setError(e.message)
        setError("Error al cargar los datos")
      }
    }
    fetchData()
  },[])
  
  if (error) return <h1 className="text-center  mt-5 text-danger fw-bolder">{error}</h1>
  if (!todo) return <h1 className="text-center mt-5">Cargando datos...</h1>

  return (
    <div className="container mx-auto text-center">
      <h1>Llamada API con fetch async await</h1>
      <h3 className="mt-5 text-secondary">El título es: {todo.title.toUpperCase()}</h3>
      <h3 className={`mt-5 ${todo.completed ? "text-success" : "text-danger"}`}>{todo.completed ? "La tarea está completada" : "La tarea está incompleta"}</h3>
    </div>
  )
}
export default App