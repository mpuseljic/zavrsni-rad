import axios from "axios";

const Service = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

axiosInstance
  .get("/secure-route")
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Request failed:", error.response.data));

export { Service };
