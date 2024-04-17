import { useState } from "react";
import AddButton from "../Buttons/AddButton.jsx";
import Label from "../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../Modals/Modal.jsx";
import { object, string } from "yup";

export default function UserRegistrationForm() {
  const { toggle } = useModal();
  const [userRole, setUserRole] = useState(""); // State for selected user role
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to control button enable/disable
  const [showError, setShowError] = useState(false); // State to control visibility of error message

  let propertySchema = object({
    propertyName: string().required("A property name is required"),
    propertyAddress: string().required("A property address is required"),
  });

  const formik = useFormik({
    initialValues: {
      propertyName: "",
      propertyAddress: "",
    },
    validationSchema: propertySchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
    setIsButtonEnabled(true); // Enable the button when a radio input is selected
    setShowError(false); // Hide the error message when a radio input is selected
  };

  const handleSubmit = (values) => {
    if (!userRole) {
      // If no radio input is selected, show the error message and prevent form submission
      setShowError(true);
      return;
    }
    values.userRole = userRole; // Assign selected user role to form values
    toggle(); // Close the form
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {showError && (
          <h4 className="flex flex-row text-red-500 text-sm place-items-center justify-center">
            Please select a user role
          </h4>
        )}
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="propertyName">Users Name</Label>
          <h2>John Doe</h2>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="propertyAddress">Users Registration Token</Label>
          <h2>DFLKJG-FGKCNGJTO-F4H9</h2>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="userRole">Users Role</Label>
          <div>
            <input
              type="radio"
              id="condoOwner"
              name="userRole"
              value="Condo Owner"
              checked={userRole === "Condo Owner"}
              onChange={handleUserRoleChange}
            />
            <label htmlFor="condoOwner" style={{ marginLeft: "5px" }}>
              Condo Owner
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="rentalUser"
              name="userRole"
              value="Rental User"
              checked={userRole === "Rental User"}
              onChange={handleUserRoleChange}
            />
            <label htmlFor="rentalUser" style={{ marginLeft: "5px" }}>
              Rental User
            </label>
          </div>
        </div>
      </form>
      <AddButton
        onClick={() => {
          if (isButtonEnabled) {
            formik.submitForm();
            toggle();
          } else {
            // If button is clicked without selecting a user role, show the error message
            setShowError(true);
          }
        }}
        disabled={!isButtonEnabled}
      >
        Register User
      </AddButton>
    </>
  );
}
