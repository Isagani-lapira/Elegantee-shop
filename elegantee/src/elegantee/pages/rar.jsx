import { authenticatedUsers } from "../api/AuthAPI/Authentication"


export default function SamplePage(){

    const handleUserData = async()=>{
        const result = await authenticatedUsers()
        console.log(result);
    }
    return (<div>
        <button onClick={handleUserData}>rar</button>
        </div>)
}