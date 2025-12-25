export async function getServerSideProps(){
    return{
        redirect:{
            destination:"http://localhost:5173/register",
            permanent:false
        }
    }
}
export default function Register(){
    return null;
}