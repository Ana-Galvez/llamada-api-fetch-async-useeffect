import { useEffect, useState } from "react"

const App = () => {
  const [todo,setTodo]= useState(null)
  const [error,setError] = useState("")

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
        const data = await response.json()
        setTodo(data)
      } catch (e) {
        setError("Error al cargar los datos")
      }
    }
    fetchData()
  },[])
  
  if (error) return <h1 className="text-center text-danger fw-bolder">{error}</h1>
  if (!todo) return <h1 className="text-center">Cargando datos...</h1>
  return (
    <div className="container mx-auto text-center">
      <h1>Llamada API con fetch async await</h1>
      <h3 className=" mt-5">El título es: {todo.title}</h3>
      <h3 className={`mt-5 ${todo.completed ? "text-success" : "text-danger"}`}>{todo.completed ? "La tarea está completada" : "La tarea está incompleta"}</h3>
    </div>
  )
}
export default App