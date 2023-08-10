import axios from "axios"
import { ROOT_URL } from "../actions/useractions"
const getSignedUrl = (file)=>{
    const fileName = encodeURIComponent(file.name);
    return axios.get(`${ROOT_URL}/sign-s3?file_name = ${fileName}&&file_type = ${file.type}`);
}

const uploadToAws = (signedUrl, file, url)=>{
    return new Promise((fufill, reject)=>{
        axios.put(signedUrl, file, { headers : {'Content-Type' : file.type}}).then(response=>{
            if(response){
                fufill(url);
            }
        }).catch(error=>{
            reject(error);
        })
    })
}


export async function uploadToAmazon(file){
    const signedUrl = await getSignedUrl(file);
    return uploadToAws(signedUrl.data.data, file, signedUrl.data.url);
}