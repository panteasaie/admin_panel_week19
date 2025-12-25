

export async function getServerSideProps(){
    return{
        redirect:{
            destination:"http://localhost:5173/products",
            permanent:false
        }
    }
}
export default function Product(){
    return null
}