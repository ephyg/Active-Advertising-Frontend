import * as yup from 'yup';

const AddItemValidation = () => {
  return yup.object().shape({
    item_description: yup.string().required('Required'),
    quantity: yup.number()
      .required('Required')
      .typeError('Must be a number')
      .positive('Must be a positive number')
      .integer('Must be an integer'),
    unit_price: yup.number()
      .required('Required')
      .typeError('Must be a number')
      .positive('Must be a positive number'),
    total_price: yup.number()
      .required('Required')
      .typeError('Must be a number')
      .positive('Must be a positive number'),
    unit_measurement: yup.string().required('Required'),
    dealer_name: yup.string().required('Required'),
    purchase_date: yup.date()
      .required('Required')
      .typeError('Invalid date format')
      .max(new Date(), 'Purchase date cannot be in the future'),
    expire_date: yup.date()
      .required('Required')
      .typeError('Invalid date format')
      .min(new Date(), 'Expire date must be after today'),
  });
};

export default AddItemValidation;
