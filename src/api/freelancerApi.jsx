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

export const SingleFreelancer = async (token, id) => {
  const addFreelancer = await axios
    .get(`${baseURL}/freelancer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return addFreelancer;
};
export const FreelancerOrderList = async (token, id) => {
  const freelancerOrder = await axios
    .get(`${baseURL}/employee/freelancer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return freelancerOrder;
};
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
export const DeleteFreelancer = async (token, id) => {
  const deleteFreelancer = await axios
    .delete(`${baseURL}/freelancer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return deleteFreelancer;
};
// export const DeleteItems = async (id) => {
//   const deleteItems = await axios
//     .delete(`${baseURL}/stock/${id}`)
//     .then((response) => response.data);
//   return deleteItems;
// };
