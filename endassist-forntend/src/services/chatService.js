import axios from "axios";

export async function getAnswer(data){
    return await axios.post("http://localhost:8000/get", data);
}