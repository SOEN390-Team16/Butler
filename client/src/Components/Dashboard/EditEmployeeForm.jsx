import React, { useEffect, useState } from "react";
import Input from "../Forms/Input.jsx";
import Label from "../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../Modals/Modal.jsx";
import { number, object, string } from "yup";
import EditButton from "../Buttons/AddButton.jsx";
import axios from "axios";

export default function EditEmployeeForm({employee, propertyList}) {
  const userData = JSON.parse(localStorage.getItem('userData'));
    const token = localStorage.getItem('token')
  const { toggle } = useModal();
  const [employeeProperty, setEmployeeProperty] = useState()

  let employeeSchema = object({
    first_name: string().required("A first name is required"),
    last_name: string().required("A last name is required"),
    role: string().required("A role is required."),
    property_id: number().required("An input is required")
  
  });

  
  const formik = useFormik({
    initialValues: {
      employeeid: employee.employeeid,
      first_name: employee.first_name,
      last_name: employee.last_name,
      companyid: employee.property_id,
      role: employee.role,
      property_id: employee.property_id,
    },
    validationSchema: employeeSchema,
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
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    console.log(values)

    toggle();
    alert(JSON.stringify(values, null, 2));
  };


  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
      
          <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="first_name">First Name:</Label>
          {/* {errorMessage("firstName")} */}
          <Input
            onChange={formik.handleChange}
            id="first_name"
            value={formik.values.first_name}
            name="first_name"
            className=""
          />
        </div>
          <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="last_name">Last Name:</Label>
          {/* {errorMessage("lastName")} */}
          <Input
            onChange={formik.handleChange}
            id="last_name"
            name="last_name"
            className=""
            value={formik.values.last_name}
          />
          </div>
  
          <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="property">Property assigned:</Label>
          {/* {errorMessage("role")} */}
          <select
            id="property"
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
              <option> -- </option>
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
          <Label htmlFor="role">Role:</Label>
          {/* {errorMessage("role")} */}
          <Input
            onChange={formik.handleChange}
            id="role"
            name="role"
            value={formik.values.role}
          />
        </div>
      </form>

    <EditButton onClick={formik.submitForm} >
        Confirm Edit
    </EditButton>

    </>
  );
}
