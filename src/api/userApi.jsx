import axios from "axios";
import baseURL from "./baseURL";

export const LoginUser = async (Credential) => {
  const user = await axios
    .post(`${baseURL}/login`, Credential)
    .then((response) => response.data);
  return user;
};

export const AuthenticatedUser = async (token) => {
  const authUser = await axios
    .get(`${baseURL}/user/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return authUser;
};

export const AllStaffs = async (token, role) => {
  const allStaffs = await axios
    .get(`${baseURL}/employee/${role}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return allStaffs;
};
export const SingleStaff = async (token, id) => {
  const singleStaff = await axios
    .get(`${baseURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return singleStaff;
};
export const DeleteStaff = async (token, id) => {
  const deleteStaff = await axios
    .delete(`${baseURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return deleteStaff;
};
// employeeList
export const EmployeeFreelancerList = async (token) => {
  const employeeList = await axios
    .get(`${baseURL}/employeeList/freelancer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return employeeList;
};
// list of the staffs 
export const EmployeeStaffList = async (token) => {
  const employeeList = await axios
    .get(`${baseURL}/employeeList/staff`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return employeeList;
};
// order of the employee
export const staffOrderList = async (token, id) => {
  const staffOrder = await axios
    .get(`${baseURL}/employee/staff/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return staffOrder;
};

