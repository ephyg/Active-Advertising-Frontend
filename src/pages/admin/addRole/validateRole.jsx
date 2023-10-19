import * as yup from "yup";
const validateRole = yup.object().shape({
  new_role: yup.string().required("Role is required"),
  
 
});
export default validateRole;
