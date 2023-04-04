
import React, { useState, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Map } from "@prisma/client";
import { Plus, Trash } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";
import Router from "next/router";
import { prisma } from "@/lib/prisma";
import { getAllMaps } from "@/repositories/mapsRepositories";



type Maps = {
  maps: Map[];
};

type Image = {
  id: number;
  urlImage: string;
  descriptionImage: string;
  key: string;
  taticId?: number;
};

export default function Create({ maps }: Maps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mapsList, setMapsList] = useState<Map[]>(maps);
  const [side, setSide] = useState("");
  const [selectedOption, setSelectedOption] = useState("null");
  const [taticId, setTaticId] = useState(0);

  const [images, setImages] = useState<Image[]>([]);

  const handleAddImage = () => {
    setImages([
      ...images,
      {
        id: images.length + 1,
        urlImage: "",
        descriptionImage: "",
        key: uuidv4(),
      },
    ]);
  };

  const handleChangeImage = (event: FormEvent<HTMLInputElement>, type: string, index: number) => {

    if (type === 'urlImage') {
      setImages(
        images.map((image) =>
          image.id === images[index].id
            ? { ...image, urlImage: event.currentTarget.value }
            : image
        )
      );
    } else if (type === 'descriptionImage') {
      setImages(
        images.map((image) =>
          image.id === images[index].id
            ? { ...image, descriptionImage: event.currentTarget.value }
            : image
        )
      );
    }
  }

  const handleInsertImage = async (index: number, taticId: number) => {
    const response = await axios.post("images/images", {
      url: images[index].urlImage,
      description: images[index].descriptionImage,
      taticId: taticId,
    });

    const imageId = response.data;

    return imageId;
  };

  const handleSaveImage = async (taticId: number) => {
    images.forEach(async (image, index) => {
      await handleInsertImage(index, taticId);
    });
  };

  const handleRemoveImage = (id: number) => {
    const filteredImages = images.filter((image) => image.id !== id);
    setImages(filteredImages);
  };

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    setSelectedOption(event.currentTarget.value);
  };

  const handleInsertTatic = () => {
    return new Promise(async (resolve, reject) => {
      try {
        
        const response = await axios.post("http://localhost:3000/api/tatics/create", {
          name,
          description,
          side,
          mapId: selectedOption,
        });

        const taticId = response.data;
        setTaticId(taticId);

        if (taticId) {
          await handleSaveImage(taticId);
          resolve(taticId);

        } else {
          reject(false);
        }


      } catch (error) {
        reject(error);
      }
    });
  };


  const handleSaveTatic = async (event: FormEvent) => {
    event.preventDefault();
    const taticSaved = await handleInsertTatic();
    if (taticSaved) {
      toast.success("Tatic created!");
      Router.push(`/tatics/${taticSaved}`);
    } else {
      toast.error("Error creating tatic!");
    }
  };

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Register a Tatic</h1>

      <form className="flex flex-col gap-5 w-80" onSubmit={handleSaveTatic}>
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8 rounded text-zinc-800 p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Proposal</label>

          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded text-zinc-800 p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="maps">Maps:</label>

          <select
            name="maps"
            id="maps"
            className="text-zinc-800 rounded p-1"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="null" disabled>
              Select Map
            </option>
            {mapsList.map((map) => (
              <option key={map.id} value={map.id}>
                {map.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="side">Side</label>
          <select
             id="side" 
             name="side"
             value={side} 
             onChange={(e) => setSide(e.target.value)}
             className="rounded p-1 text-zinc-800">
              <option value="atk">Ataque</option>
              <option value="def">Defesa</option>
             </select>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl flex items-center justify-between mb-2">
            Images:
            <button
              type="button"
              className="rounded bg-violet-500 px-2 py-1 h-8"
              onClick={handleAddImage}
            >
              <Plus size={20} color="#ffffff" />
            </button>
          </h3>

          <input type="hidden" name="taticId" id="taticId" value={taticId} />
          {images?.map((image, index) => (
            <div
              className="w-100 border-t-2 pt-4 pb-4 border-purple-500"
              key={image.key}
            >
              <label htmlFor="image">Step {index + 1}</label>


              <div className="flex">
                <input
                  type="text"
                  className="w-full rounded h-8 rounded-r-none mb-4 px-2 text-zinc-800"
                  placeholder="Step description"
                  value={image.descriptionImage}
                  onChange={(e) =>
                    handleChangeImage(e, "descriptionImage", index)
                  }
                />

                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.id)}
                  className="bg-violet-500 rounded px-2 py-1 h-8 rounded-l-none"
                >
                  <Trash size={26} color="#ffffff" />
                </button>
              </div>
              <input
                type="text"
                className="rounded h-8 w-full mb-2 px-2 text-zinc-800"
                name="image"
                id="image"
                value={image.urlImage}
                onChange={(e) =>
                  handleChangeImage(e, "urlImage", index)
                }
                placeholder="Image URL"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col"></div>
        <div>
          <input
            type="submit"
            value="Register"
            className="bg-violet-600 px-2 py-2 rounded w-full cursor-pointer"
          />
        </div>
        <a href={'/'} className="bg-violet-600 px-2 py-2 rounded w-full cursor-pointer text-center ">Back</a>
      </form>
      <ToastContainer />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const maps = await getAllMaps();

  return {
    props: {
      maps,
    },
  };
};
