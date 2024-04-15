import React, { useEffect, useState } from "react";
import Input from "../../Forms/Input.jsx";
import Label from "../../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../../Modals/Modal.jsx";
import { object, string } from "yup";
import EditButton from "../../Buttons/AddButton.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";


export default function EditOperationForm({operation, propertyList, type}) {
  //const userData = JSON.parse(localStorage.getItem('userData'));
    const token = localStorage.getItem('token')
  const { toggle } = useModal();
  const [employeeProperty, setEmployeeProperty] = useState()

  let operationSchema = object({
    type: string().required("Please define an operation type."),
    cost: string().required("Please enter an operational cost."),
    property_id: string().required("Please select a property."),
    date: string().required("Please insert date.")
  });

  const formik = useFormik({
    initialValues: {
      type: type,
      cost: operation.cost,
      property_id: operation.property_id,
      date: operation.date
    },
    validationSchema: operationSchema,
    onSubmit: (values) => handleSubmit(values),
  });
  console.log(type)
  const errorMessage = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return (
        <span className="text-red-400 text-sm">{formik.errors[fieldName]}</span>
      );
    }
    return null;
  };
 

  useEffect(() => {
    const fetchPropertyById = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/pp/${employee.property_id}`, {
          headers: {
            'authorization': `Bearer ${token}`,
          }
        });
        // Process the response data here if needed
        setEmployeeProperty(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchPropertyById(); // Call the async function
  
  }, []); // Empty dependency array means this effect runs only once on component mount
  
  
  const handleSubmit = async (values) => {
    values.property_id = parseInt(values.property_id)
    console.log(operation.operation_id)
    await axios.patch(`http://hortzcloud.com:3000/api/v1/op/${operation.operation_id}`, values,{
      headers: {
        'authorization': `Bearer ${token}`,
      }
    }).then(res => {
      toast.success('Operation edited successfully!');
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    console.log(values)

    toggle();
    
  };


  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
      
          <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="type">Operation Type:</Label>
          {errorMessage("type")}
          <Input
            onChange={formik.handleChange}
            id="type"
            value={formik.values.type}
            name="type"
            className=""
          />
        </div>
          <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="cost">Cost:</Label>
          {errorMessage("cost")}
          <Input
            onChange={formik.handleChange}
            id="cost"
            name="cost"
            className=""
            value={formik.values.cost}
          />
          </div>
  
          <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="property_id">Property assigned:</Label>
          {errorMessage("property_id")}
          <select
            id="property_id"
            onChange={formik.handleChange}
            name="property_id"
            value={formik.values.property_id}
            className="border border-gray-400 rounded-lg px-4 py-3"
            >
              
           {employeeProperty && (
              <>
              <option key={employeeProperty.property_id} value={employeeProperty.property_id}>
                {employeeProperty.property_name}
              </option>
            
              </>
           )}
           
               {( propertyList.map((p) => {
                return (
                    <option key={p.property_id} value={p.property_id}>
                    {p.property_name}
                    </option>)}
                ))}
               
                </select>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="date">Date:</Label>
          {errorMessage("date")}
          <Input
            onChange={formik.handleChange}
            id="date"
            name="date"
            type="date"
            value={formik.values.date.substring(0,10)}
          />
        </div>
      </form>

    <EditButton onClick={formik.submitForm} >
        Confirm Edit
    </EditButton>

    </>
  );
}

EditOperationForm.propTypes = {
  propertyList: PropTypes.arrayOf(
    PropTypes.shape({
      property_id: PropTypes.number.isRequired,
      property_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  operation: PropTypes.arrayOf(
    PropTypes.shape({
      property_id: PropTypes.number.isRequired,
      property_name: PropTypes.string.isRequired,
    })
  ),
  type: PropTypes.string.isRequired
};

