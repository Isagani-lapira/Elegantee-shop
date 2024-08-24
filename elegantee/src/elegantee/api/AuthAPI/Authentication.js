import { APIClient } from "./APIClient";

export const authenticateUsers = async (username,password)=>{
    try{
        const results = await APIClient.post('/auth/',{
            username: username,
            password: password
        });
        return results;
    }catch(e){
        return e;
    }
}

//Tobe remove
// export const authenticatedUsers = async ()=>{
//     try{
//         const results = await APIClient.get('/account/isaganilapira052133');
//         return results.data;
//     }catch(e){
//         return e;
//     }
// }