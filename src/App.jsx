import { useEffect, useState } from "react"
import Form from "./components/Form"
import ListItem from "./components/listItem"
import axios from "axios"
import Loading from "./components/loading"

function App() {

  const[todos,setTodos] =useState(null)
  const [page,setPage] =useState(1)
  const [totalCount,setTotalCount] =useState()
  const[maxPage,setMaxPage] =useState()
  
  /* APIYE GÖNDERECEĞİMİZ PARAMETRELER */
  const params = {
    _limit:4,
    _page:page,
  }

/* her sayfa değiştiğinde güncel verileri al */
  useEffect(() =>{

    /* her sayfa değiştiğinde todo state i sıfırlıyorum ki sayfa değişikliklerindek de Loading ekrana basılsın. */
    setTodos(null)
 /* axios ile get isteği */
axios
.get(`http://localhost:3000/todos`, {params})
.then((res) => {
  
  //toplam sayfa sayısını bulalım:
  const count= Number((res.headers["x-total-count"]));
  
  setMaxPage(Math.ceil(count / params._limit));
  setTotalCount(count);

  setTodos(res.data)})},[page]);



  return (
    <div className="container p-5">

      <h2 className="text-center">SERVER <span className="text-primary">CRUD</span></h2>
      <Form 
      totalCount={totalCount}
      maxPage={maxPage}
      setPage={setPage}
      todos={todos}
      setTodos= {setTodos}
      params ={params} 
      />

      <ul className="list-group">
        {/* veriler henüz gelmediyse */}
        {!todos && <Loading/>}

        {/* optional chaining */}
        {todos?.map((todo) => (<ListItem setTodos={setTodos} key={todo.id} todo={todo}/>))}
      </ul>

    {/* SAYFAYA YÖNLENDİRME BUTONLARI */}
    <div className="d-flex justify-content-between my-5">
      <button disabled={page ===1} onClick={() => setPage((prev) => prev-1)}className="btn btn-primary">{'< GERİ'}</button>
      <span className="lead fw-bold">{page}</span>
      <button disabled={page == maxPage} onClick={() => setPage((prev) => prev+1)} className="btn btn-primary">{'İLERİ > '}</button>
    </div>

    </div>
  )
}

export default App
