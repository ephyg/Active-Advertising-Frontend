import axios from "axios";
import baseURL from "./baseURL";

export const AddFreelancer = async (token, data) => {
  const addFreelancer = await axios
    .post(`${baseURL}/freelancer/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return addFreelancer;
};
// export const EditItem = async (id, data) => {
//   const editItems = await axios
//     .put(`${baseURL}/stock/${id}`, data)
//     .then((response) => console.log(response, data));
//   return editItems;
// };
export const GetAllFreelancer = async (token) => {
  const getAllFrrelancer = await axios
    .get(`${baseURL}/freelancer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return getAllFrrelancer;
};

// export const DeleteItems = async (id) => {
//   const deleteItems = await axios
//     .delete(`${baseURL}/stock/${id}`)
//     .then((response) => response.data);
//   return deleteItems;
// };
