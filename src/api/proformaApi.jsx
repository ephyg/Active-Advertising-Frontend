import axios from "axios";
import baseURL from "./baseURL";

export const AddProforma = async (data) => {
  const addProforma = await axios
    .post(`${baseURL}/proforma`, data)
    .then((response) => response.data);
  return user_email;
};
export const GetAllProforma = async () => {
  const getAllProforma = await axios
    .get(`${baseURL}/proforma`)
    .then((response) => response.data);
  return getAllProforma;
};
export const GetProforma = async (id) => {
  const getProforma = await axios
    .get(`${baseURL}/proforma/${id}`)
    .then((response) => response.data);
  return getProforma;
};


// active_account_number
// : 
// "789XYZ"
// active_email
// : 
// "active@example.com"
// active_phone_number
// : 
// "123-456-7890"
// active_tin_nUmber
// : 
// "123ABC"
// active_vat
// : 
// "VAT123"
// client_name
// : 
// "Client Company"
// client_phone_number
// : 
// "987-654-3210"
// client_tin_number
// : 
// "456DEF"
// contact_person
// : 
// "John Doe"
// created_at
// : 
// "2023-08-11T11:25:10.000000Z"
// id
// : 
// 13
// invoice_date
// : 
// "2023-08-09"
// payment_method
// : 
// "Credit Card"
// payment_request_number
// : 
// "PR1283456"
// price_validity
// : 
// "30 days"
// total_price
// : 
// "1500.00"
// updated_at
// : 
// "2023-08-11T11:25:10.000000