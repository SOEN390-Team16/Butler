import Input from "../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../Forms/Label.jsx";
import { useModal } from "../Modals/Modal.jsx";
import { object, string } from 'yup';
import KeyButton from "../Buttons/KeyButton.jsx";
import { activateRegistrationKey } from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../models/user-roles.enum.js";

export default function RegisterUserForm() {
  const {toggle} = useModal();
  const navigation = useNavigate();

  let schema = object({
    token: string().required('A token is required')
  });

  const formik = useFormik({
    initialValues: {
      token: '',
    }, validationSchema: schema, onSubmit: values => handleSubmit(values),
  });

  const errorMessage = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return <span className='text-red-400 text-sm'>{formik.errors[fieldName]}</span>
    }
    return null;
  }

  const handleSubmit = (values) => {
    const activationToken = values.token;

    activateRegistrationKey(activationToken)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          let userObject = response.data[0];
          delete userObject.password;
          const user = JSON.stringify(userObject)
          console.log(user)
          localStorage.setItem("userData", user);
          toggle()

          if (userObject.role === UserRoles.CONDO_OWNER) {
            navigation("/DashBoardHomeCO")
          } else if (userObject.role === UserRoles.CONDO_RENTER) {
            navigation("/DashBoardHomeCR")
          }
        }
      })
  }

  return (<>
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
        <Label htmlFor="token" className={"justify-start place-content-start start-bg-black"}>Property Name</Label>
        {errorMessage("token")}
        <Input onChange={formik.handleChange} id="token" name="token"/>
      </div>
    </form>
    <KeyButton onClick={formik.submitForm}>Activate Key</KeyButton>
  </>)
}