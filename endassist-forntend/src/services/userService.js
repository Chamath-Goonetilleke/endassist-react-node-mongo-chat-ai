import http from "./httpService";

const endpoint = "/api/v1/user";

export async function LoginUser(user) {
  return await http.post(endpoint + "/login", user);
}

export async function RegisterUser(user) {
  return await http.post(endpoint + "/register", user);
}

export async function deleteUser(id) {
  return await http.delete(endpoint + `/deleteUser/${id}`);
}