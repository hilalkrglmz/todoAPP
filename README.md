# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


    //! OLUŞTURULAN TODO yu ekrana eklemek için:

    // //?FETCH İLE
    // fetch('http://localhost:3000/todos', {
    //   method:"POST",
    //   headers:{
    //     "Content-Type": "application/json" ,

    //   },
    //   body:JSON.stringify(newTodo),

    // })

    //?AXIOS İLE

    axios.post("http://localhost:3000/todos",newTodo)

    # ALTIN KURAL
    -API GÜNCELLENİYORSA ARAYÜZÜ DE GÜNCELLE
    -ARAYÜZÜ GÜNCELLİYORSAN APIYI DE GÜNCELLE# todoAPP
