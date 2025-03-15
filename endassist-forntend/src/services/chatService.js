import axios from "axios";

export async function getAnswer(data){
    return await axios.post("http://127.0.0.1:5000/get", data);
}

export async function getRecommendation(data) {
  return await axios.post("http://127.0.0.1:5000/recommend", data);
}