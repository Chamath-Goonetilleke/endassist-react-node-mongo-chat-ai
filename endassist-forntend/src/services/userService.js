import http from "./httpService";

const endpoint = "/api/v1/user";

export async function LoginUser(user) {
  return await http.post(endpoint + "/login", user);
}

export async function RegisterUser(user) {
  return await http.post(endpoint + "/register", user);
}

export async function DeleteUser(id) {
  return await http.delete(endpoint + `/deleteUser/${id}`);
}

export async function SendOTPMail(email) {
  return await http.post(endpoint + "/send-otp", {email:email});
}

export async function VerifyOtp(email, otp) {
  return await http.post(endpoint + "/verify-otp", {email:email, otp:otp});
}

export async function UpdateUser(data) {
  return await http.put(endpoint + "/update-user", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function updatePassword(data) {
  return await http.put(endpoint + "/update-password", data);
}

export async function UpdateMeals(data) {
  return await http.put(endpoint + "/update-meal", data);
}

export async function GetMeals(id){
  return await http.get(endpoint + `/meals/${id}`);
}