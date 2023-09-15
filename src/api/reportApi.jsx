import axios from "axios";
import baseURL from "./baseURL";

export const GetReport = async (token, day) => {
  if (day) {
    const getReport = await axios
      .get(`${baseURL}/report/${day}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);
    return getReport;
  }
  const getReport = await axios
    .get(`${baseURL}/report`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return getReport;
};
