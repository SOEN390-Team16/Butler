import { useEffect, useState } from "react";
import AddButton from "../Buttons/AddButton.jsx";
import { useFormik } from "formik";
import Label from "../Forms/Label.jsx";
import { useModal } from "../Modals/Modal.jsx";
import { object, string } from 'yup';
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function AssignCondoForm({ user }) {
  const [properties, setProperties] = useState([]);
  const {toggle} = useModal();

  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem('userData'));

  let condoSchema = object({
    propertyId: string().required('Selecting a property ID is required'),
  });

  const formik = useFormik({
    initialValues: {
      propertyId: '',
    }, 
    validationSchema: condoSchema, 
    onSubmit: values => handleSubmit(values),
  });

  const errorMessage = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return <span className='text-red-400 text-sm'>{formik.errors[fieldName]}</span>
    }
    return null;
  }

  const handleSubmit = (values) => {
    console.log("values.propertyId:", values.propertyId);
    console.log("user.userid:", user.userid);

    axios.patch(`http://hortzcloud.com:3000/api/v1/cu/assign/${values.propertyId}/${user.userid}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      toast.success("Condo assigned successfully!");
      toggle();
    })
    .catch(() => {
      toast.error("Error assigning condo");
    });
  }

  useEffect(() => {
    axios
      .get("http://hortzcloud.com:3000/api/v1/pp", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const filteredProperties = res.data.filter(property => 
          property.companyid === userData.cmcId && property.property_id >= 44
        );
        setProperties(filteredProperties);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
      });
  }, [token, userData.cmcId]);

  return (<>
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
        <Label htmlFor="propertyId">Property</Label>
        <select 
          id="propertyId" 
          name="propertyId"
          value={formik.values.propertyId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="" disabled>Select Property ID</option>
          {properties.map((prop) => (
            <option key={prop.property_id} value={prop.property_id}>{prop.property_id}</option>
          ))}
        </select>
        {errorMessage("propertyId")}
      </div>
    </form>
    <AddButton onClick={formik.submitForm}>Assign Condo</AddButton>
  </>)
}

AssignCondoForm.propTypes = {
  user: PropTypes.shape({
    userid: PropTypes.number.isRequired
  }).isRequired,
}
