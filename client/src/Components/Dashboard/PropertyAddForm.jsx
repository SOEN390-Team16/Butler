import AddButton from "../Buttons/AddButton.jsx";
import Input from "../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../Forms/Label.jsx";
import { useModal } from "../Modals/Modal.jsx";
import { number, object, string } from 'yup';
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function PropertyAddForm(props) {
  const {toggle} = useModal();

  let propertySchema = object({
    propertyName: string().required('A property name is required'),
    propertyAddress: string().required('A property address is required'),
    numberOfCondoUnits: number()
      .typeError('Number of condo units must be a number')
      .required('A number of units is required')
      .integer('Number of lockers must be an integer')
      .min(1, 'You must indicate a minimum of 1'),
    numberOfParkingUnits: number()
      .typeError('Number of parking units must be a number')
      .required('A number of parking units is required')
      .integer('Number of lockers must be an integer')
      .min(0, 'You must indicate a minimum of 0'),
    numberOfLockers: number()
      .typeError('Number of lockers must be a number')
      .required('A number of lockers is required')
      .integer('Number of lockers must be an integer')
      .min(0, 'You must indicate a minimum of 0'),
  });

  const formik = useFormik({
    initialValues: {
      propertyName: '', propertyAddress: '', numberOfCondoUnits: '', numberOfParkingUnits: '', numberOfLockers: '',
    }, validationSchema: propertySchema, onSubmit: values => handleSubmit(values),
  });

  const errorMessage = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return <span className='text-red-400 text-sm'>{formik.errors[fieldName]}</span>
    }
    return null;
  }

  const handleSubmit = (values) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = localStorage.getItem('token')
    const property = {
      companyid: userData.cmcId,
      property_name: values.propertyName,
      address: values.propertyAddress,
      unit_count: values.numberOfCondoUnits,
      parking_count: values.numberOfParkingUnits,
      locker_count: values.numberOfLockers
    }

    axios
      .post("http://localhost:3000/api/v1/pp", property, {
        headers: {
          'authorization': `Bearer ${token}`,
        }
      })
      .then(() => {
        toast.success('Property Successfully Added!');
        props.onAddProperty(property)
        toggle()
      })
      .catch((reason) => {
        toast.error(`Something went wrong: ${reason.message}`)
        throw reason
      })
  }

  return (<>
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
        <Label htmlFor="propertyName">Property Name</Label>
        {errorMessage("propertyName")}
        <Input onChange={formik.handleChange} id="propertyName" name="propertyName"/>
      </div>
      <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
        <Label htmlFor="propertyAddress">Property Address</Label>
        {errorMessage("propertyAddress")}
        <Input onChange={formik.handleChange} id="propertyAddress" name="propertyAddress"/>
      </div>
      <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
        <Label htmlFor="numberOfCondoUnits">Number of Condo Units</Label>
        {errorMessage("numberOfCondoUnits")}
        <Input onChange={formik.handleChange} id="numberOfCondoUnits" name="numberOfCondoUnits"/>
      </div>
      <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
        <Label htmlFor="numberOfParkingUnits">Number of Parking Units</Label>
        {errorMessage("numberOfParkingUnits")}
        <Input onChange={formik.handleChange} id="numberOfParkingUnits" name="numberOfParkingUnits"/>
      </div>
      <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
        <Label htmlFor="numberOfLockers">Number of Parking Lockers</Label>
        {errorMessage("numberOfLockers")}
        <Input onChange={formik.handleChange} id="numberOfLockers" name="numberOfLockers"/>
      </div>
    </form>
    <AddButton onClick={formik.submitForm}>Add Property</AddButton>
  </>)
}

PropertyAddForm.propTypes = {
  onAddProperty: PropTypes.func.isRequired,
}