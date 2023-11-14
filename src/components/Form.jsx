import axios from 'axios';
import {v4} from 'uuid'

const Form = ({setTodos, maxPage, totalCount, setPage, todos, params}) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    /* formdan verileri alma */
    const title = e.target[0].value;
    const status = e.target[1].value;

    /* verileri kontrol et */
    if(!title){
      return alert("lütfen yapılacak işi yazınız!")
    }

    /* veri tabanına kaydedilecek veri */

    const newTodo = {
      title,
      status,
      id: v4(),
      date:new Date().toLocaleDateString(),
      isDone: false,
    };
    
    //! OLUŞTURULAN TODO yu ekrana eklemek için:
    //?AXIOS İLE

    axios.post("http://localhost:3000/todos",newTodo)

    //?state i güncelleme
    .then(() => {

      /* önündeki sayfa doluysa son sayfaya yönlendir */
      if (todos.length === params._limit) {
        setPage(
          totalCount % params._limit === 0 ? maxPage +1 : maxPage
        );
        return;
      }
      setTodos((todos) =>[...todos,newTodo]);
      
    });


  };

  return (
    <form
    onSubmit={handleSubmit}
     className="d-flex justify-content-center gap-3 my-5">
        <input className="form-control shadow" 
        placeholder="örn:java script projesi hazırla" 
        type="text"/>
        <select defaultValue={'daily'} className="form-select w-50">
            <option value="important">Önemli</option>
            <option value="daily">Günlük</option>
            <option value="job">İş</option>
        </select>
        <button className="btn btn-warning shadow">GÖNDER</button>
    </form>
  )
}

export default Form