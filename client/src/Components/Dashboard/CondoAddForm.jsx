import { useEffect, useState } from "react";
import AddButton from "../Buttons/AddButton.jsx";
import Input from "../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../Forms/Label.jsx";
import { useModal } from "../Modals/Modal.jsx";
import { number, object } from 'yup';
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function CondoAddForm(props) {
  const [property, setProperty] = useState([]);
  const {toggle} = useModal();

  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem('userData'));

  let condoSchema = object({
    condoNumber: number()
      .typeError('Condo number must be a number')
      .required('Condo number is required')
      .integer('Condo number must be an integer')
      .min(1, 'You must indicate a minimum of 1'),
    condoSize: number()
      .typeError('Condo size must be a number')
      .required('Condo size is required')
      .integer('Condo size must be an integer')
      .min(100, 'You must indicate a minimum size of 100'),
  });

  const formik = useFormik({
    initialValues: {
      condoNumber: '', condoSize: '',
    }, validationSchema: condoSchema, onSubmit: values => handleSubmit(values),
  });

  const errorMessage = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return <span className='text-red-400 text-sm'>{formik.errors[fieldName]}</span>
    }
    return null;
  }

  const handleSubmit = (values) => {
    const storedPropertyId = localStorage.getItem('propertyId');
    const propertyId = storedPropertyId ? parseInt(storedPropertyId, 10) : null;
    const token = localStorage.getItem('token')
    console.log("company id:", userData.cmcId);
    console.log("property id:", property.property_id);
    const condo = {
      companyid: userData.cmcId,
      condo_number: values.condoNumber,
      size: values.condoSize,
      property_id: property.property_id,
    }

    axios
      .post("http://hortzcloud.com:3000/api/v1/cu/", condo, {
        headers: {
          'authorization': `Bearer ${token}`,
        }
      })
      .then(() => {
        toast.success('Condo Successfully Added!');
        props.onAddCondo(condo)
        toggle()
      })
      .catch((reason) => {
        toast.error(`Something went wrong: ${reason.message}`)
        throw reason
      })
  }

  useEffect(() => {
    const fetchProperties = () => {
      axios
        .get("http://hortzcloud.com:3000/api/v1/pp", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProperty(res.data[37]);
        })
        .catch((err) => {
          console.error("Error fetching properties:", err);
        });
    };

    fetchProperties();
  }, [token, userData.cmcId]);

  return (<>
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
        <Label htmlFor="condoNumber">Condo Number</Label>
        {errorMessage("condoNumber")}
        <Input onChange={formik.handleChange} id="condoNumber" name="condoNumber"/>
      </div>
      <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
        <Label htmlFor="condoSize">Condo Size</Label>
        {errorMessage("condoSize")}
        <Input onChange={formik.handleChange} id="condoSize" name="condoSize"/>
      </div>
    </form>
    <AddButton onClick={formik.submitForm}>Add Condo</AddButton>
  </>)
}

CondoAddForm.propTypes = {
  onAddCondo: PropTypes.func.isRequired,
}