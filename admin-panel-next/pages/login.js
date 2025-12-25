import { redirect } from "next/dist/server/api-utils";

export async function getServerSideProps(){
    return {
        redirect:{
            destination:"http://localhost:5173/login",
            permanent:false,
        }
    }
}
export default function Login(){
    return null;
}