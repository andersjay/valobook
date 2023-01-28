import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router"

type Map = {
  id: number;
  name: string;
  url_image: string;

}

export default async function Maps({map}){



  const router = useRouter();



  return (
    <div>
      <h1>{}</h1>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3000/api/maps/`, {
    method: 'GET',
  });
  const data = await response.json();

  const paths = data.map((map:Map)=>{
    return { params: { id: map.id } }
  })

  return{
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context:any) => {
  
  const {id} = context.params;

  console.log(id)


  const response = await fetch(`http://localhost:3000/api/maps/${id}/map`);
  const data = response.json(); 
  console.log(data)

  return {
    props: {

    }
  }

}