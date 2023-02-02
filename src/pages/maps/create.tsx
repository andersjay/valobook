import { redirect } from "next/dist/server/api-utils";
import { useState, FormEvent } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";
import axios from "axios";
import { apiValorant } from "@/lib/valorant";
import { Map } from "@prisma/client";
import Image from "next/image";
import { GetStaticProps } from "next";


type MapValorant = {
  displayName: string;
  uuid: string;
  splash: string;
}

type MapsValorant = {
  mapsValorant: MapValorant[];
}

export default function Create({ mapsValorant }: MapsValorant) {
  const [name, setName] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [mapsValoratList, setMapsValorantList] = useState(mapsValorant as MapValorant[]);
  const [containImage, setContainImage] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const create = await axios.post('http://localhost:3000/api/maps/maps', {
      name,
      url_image:urlImage
    })

    setName('');
    setUrlImage('');

    if (create.status == 400) {
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

  const chooseMap = () => {
    const map = document.getElementById('maps') as HTMLSelectElement;
    const mapValue = map.value;


    const mapSelected = mapsValoratList.find((map) => map.uuid == mapValue);
    
        if(mapValue == '') {
          setContainImage(false)
        }

    if (mapSelected) {
      setUrlImage(mapSelected.splash);
      setName(mapSelected.displayName);
      setContainImage(true)
    }

   
  }

  return (

    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Register a Map</h1>

      <form className="flex flex-col gap-5 w-80" onSubmit={handleSubmit}>

        <div className="flex flex-col mt-4">
          <select name="maps" id="maps" className=" rounded text-zinc-800 p-2" onChange={chooseMap}>
            <option value="">Select</option>
            {mapsValoratList.map((map) => (
              <option key={map.uuid} value={map.uuid}>{map.displayName}</option>
            ))}
          </select>

        </div>

        <div className="flex flex-col">
            {containImage ? (
              <Image src={urlImage} alt={name} width={400} height={300} />
            ):(
              <h2>Choose a map please</h2>
            )}

        </div>

        {/* <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded text-zinc-800 p-2" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="url_image">Image URL</label>
          <input type="text" name="url_image" id="url_image" value={urlImage} onChange={(e) => setUrlImage(e.target.value)} className="rounded text-zinc-800 p-2" />
        </div> */}
        <div>
          <input type="submit" value="Register" className="bg-violet-600 px-2 py-2 rounded w-full cursor-pointer" />
        </div>
          <a href={'/'} className="bg-violet-600 px-2 py-2 rounded w-full cursor-pointer text-center ">Back</a>
      </form>
  
       
      <ToastContainer />
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const valoMaps = await axios.get('https://valorant-api.com/v1/maps')

  const mapsValorant = valoMaps.data.data

  return {
    props: {
      mapsValorant
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}