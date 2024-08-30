import { APIClient } from "./AuthAPI/APIClient";


export const registerAccount = async(data)=>{
    try{
        return await APIClient.post('/users/register',data)
    }catch(error){
        throw error;
    }
}