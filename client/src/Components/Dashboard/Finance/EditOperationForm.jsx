import React, { useEffect, useState } from "react";
import Input from "../Forms/Input.jsx";
import Label from "../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../Modals/Modal.jsx";
import { number, object, string } from "yup";
import EditButton from "../Buttons/AddButton.jsx";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditOperationForm({operation, propertyList}) {
  //const userData = JSON.parse(localStorage.getItem('userData'));
    const token = localStorage.getItem('token')
  const { toggle } = useModal();
  const [employeeProperty, setEmployeeProperty] = useState()

  let operationSchema = object({
    operation_type: string().required("Please define an operation type."),
    cost: string().required("Please enter an operational cost."),
    property_id: string().required("Please select a property."),
    date: string().required("Please insert date.")
  });

  const formik = useFormik({
    initialValues: {
      operation_type: "",
      cost: 0,
      property_id: 0,
      date: ''
    },
    validationSchema: operationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

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
    console.log(employee.employeeid)
    await axios.patch(`http://localhost:3000/api/v1/emp/${employee.employeeid}`, values,{
      headers: {
        'authorization': `Bearer ${token}`,
      }
    }).then(res => {
      toast.success('Employee edited successfully!');
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    console.log(values)

    toggle();
    // alert(JSON.stringify(values, null, 2));
  };


  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
      
          <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="operation_type">Operation Type:</Label>
          {errorMessage("operation_type")}
          <Input
            onChange={formik.handleChange}
            id="operation_type"
            value={formik.values.operation_type}
            name="operation_type"
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
            value={formik.values.date}
          />
        </div>
      </form>

    <EditButton onClick={formik.submitForm} >
        Confirm Edit
    </EditButton>

    </>
  );
}

