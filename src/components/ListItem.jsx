import axios from "axios";
import types from "../constant";
import { formatDate } from "../helpers";
import { useRef, useState } from "react";




const ListItem = ({ setTodos, todo }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  //referansı tanımlanan elemanlara erişme
  const titleRef= useRef()
  const selectRef =useRef()


  
  //!SİLME İŞLEMİ
  const handleDelete = () => {

    axios.delete(`http://localhost:3000/todos/${todo.id}`)
      .then(() => setTodos((todos) => todos.filter((i) => i.id !== todo.id)));
  }

  /* güncelleme */
const handleEdit = () => {
  /* input değerine erişme */
  const newValue ={
    title: titleRef.current.value,
    status: selectRef.current.value
  };
  
  
  /* api'yi güncelle  */
  axios.patch(`http://localhost:3000/todos/${todo.id}`,newValue)

/* state i günceller */
  .then(() =>{
    /* todo objesini günceller */
    const updated = { ...todo, ...newValue}
/* state'te tutulan objeyi çıkar yerine updated objeyi ekle: */
    setTodos((todos) => todos.map((i) => (i.id ===updated.id ? updated : i))
    )
  })
  setIsEditMode(false)

}; 

  return (
    <li className="list-group-item relative px-3 py-3 list-group-item d-flex justify-content-between align-items-center">
      <div>
       
      {/* //*DURUM ALANI KISMINI DÜZENLEME */}
        {isEditMode ? (
          <select ref={selectRef} defaultValue={todo.status}>
            <option value="important">Önemli</option>
            <option value="daily">Günlük</option>
            <option value="job">İş</option>
          </select>
        ) : (<span className={`badge ${types[todo.status].color}`}>
          {types[todo.status]?.text}</span>
   )}
   </div>

   {/* //*YAZI İÇERİĞİ KISMINI DÜZENLEME */}
      {isEditMode ? (
          <input ref={titleRef} defaultValue={todo.title} type="text"/> 
        ) : (<span> {todo.title}</span>
   )}


        {/* //*TARİH */}
      <span className="date">{todo.date}</span>

        {/* //*BUTONLAR ALANI */}
      <div className="btn-group">
      {isEditMode ? ( 
        <>
        <button onClick={() => setIsEditMode(false)} className="btn btn-sm btn-secondary">iptal</button>
        <button onClick={handleEdit} className="btn btn-sm btn-success">kayıt</button>
        </>)
        : (
          <>
        <button onClick={handleDelete} className="btn btn-sm btn-danger">SİL</button>
        <button onClick={() => setIsEditMode(true)} className="btn btn-sm btn-primary">DÜZENLE</button>
        </>
        )
      } 
        
      </div>


    </li>
  )
}

export default ListItem;