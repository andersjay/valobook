import { redirect } from "next/dist/server/api-utils";
import { useState, FormEvent } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";

export default function Create() {
  const [name, setName] = useState('');
  const [urlImage, setUrlImage] = useState('');



  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if(!name || !urlImage) {
      toast.error('Preencha todos os campos!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }


    const create = await fetch('http://localhost:3000/api/maps/maps', {
      method: 'POST',
      body: JSON.stringify({
        name,
        url_image: urlImage
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setName('');
    setUrlImage('');

    if(create.status == 400){
      toast.error('Erro ao adicionar!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
    return
  }

  toast.success('Adicionado com sucesso!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",

  })

  Router.push('/')

}

  return (

    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Register a Map</h1>

      <form className="flex flex-col gap-5 w-80" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-8 rounded text-zinc-800 p-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="url_image">Description</label>
          
          <input type="text" name="url_image" id="url_image" value={urlImage} onChange={(e) => setUrlImage(e.target.value)} className="h-8 rounded text-zinc-800 p-2" />
        </div>
        <div>
          <input type="submit" value="Register" className="bg-violet-600 px-2 py-2 rounded w-full cursor-pointer" />
        </div>
      </form> 
      <ToastContainer />
    </section>
  )
}