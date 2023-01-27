import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router"

type Map = {
  id: number;
  name: string;
  url_image: string;

}

export default function Maps(){

  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{}</h1>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3000/api/maps/getAll`);
  const data = await response.json();

  const paths = data.map((map:Map)=>{
    return { params: { id: map.id.toString() } }
  })

  return{
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  
  const id = context.params;



  const response = await fetch(`http://localhost:3000/api/maps/${id}`);
  const data = JSON.stringify(response)
  console.log(data)

  return {
    props: {
      map: data
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }

}