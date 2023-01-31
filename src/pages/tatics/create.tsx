
import React, { useState, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Map } from "@prisma/client";
import { Plus, Trash } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";



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

  const handleChangeImage = (event: FormEvent<HTMLInputElement>, type: string, index:number) => {
    
    if(type === 'urlImage'){
      setImages(
        images.map((image) =>
          image.id === images[index].id
            ? { ...image, urlImage: event.currentTarget.value }
            : image
        )
      );
    }else if(type === 'descriptionImage'){
      setImages(
        images.map((image) =>
          image.id === images[index].id
            ? { ...image, descriptionImage: event.currentTarget.value }
            : image
        )
      );
    }
  }

  const handleInsertImage = async (index:number) => {
    const response = await axios.post("http://localhost:3000/api/images/images", {
      url: images[index].urlImage,
      description: images[index].descriptionImage,
      taticId: taticId,

    });

    const imageId = response.data;

    return imageId;
    
  };

  const handleSaveImage = async () => {
    images.forEach(async (image,index) => {
      await handleInsertImage(index)
    })

  };

  const handleRemoveImage = (id: number) => {
    const filteredImages = images.filter((image) => image.id !== id);
    setImages(filteredImages);
  };

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    setSelectedOption(event.currentTarget.value);
  };

  const handleInsertTatic = async () => {

    const response = await axios.post("http://localhost:3000/api/tatics/tatics", {
      name,
      description,
      mapId: selectedOption,
    });

    const taticId = response.data;

    setTaticId(taticId);
   
    if(taticId){
      toast.success("Tatic created successfully!");

      for (let index = 0; index < images.length; index++) {
        await handleInsertImage(index)
      }
    }else{
      toast.error("Error creating tatic!");
    }

  }

  const handleSaveTatic = async (event: FormEvent) => {
    event.preventDefault();
    handleInsertTatic()

  };

  console.log(images, )

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

          {images?.map((image, index) => (
            <div
              className="w-100 border-t-2 pt-4 pb-4 border-purple-500"
              key={image.key}
            >
              <label htmlFor="image">Step {index + 1}</label>

              <input type="hidden" name="" id="" />

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
      </form>
      <ToastContainer />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/maps/maps");
  const maps = response.data;

  return {
    props: {
      maps,
    },
  };
};
