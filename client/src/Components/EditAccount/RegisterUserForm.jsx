import Input from "../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../Forms/Label.jsx";
import { useModal } from "../Modals/Modal.jsx";
import { object, string } from 'yup';
import KeyButton from "../Buttons/KeyButton.jsx";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../models/user-roles.enum.js";
import RegistrationKeyService from "../../service/key/registration-key.service.js";
import usePublicUserStore from "../../store/user/public-user.store.js";
import { parseUserObjectToLocalStorage } from "../../../utils/localstorage-parser.js";

export default function RegisterUserForm() {
  const { toggle } = useModal();
  const navigation = useNavigate();
  const publicUserStore = usePublicUserStore()

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

  const handleSubmit = async (values) => {
    const activationToken = values.token;
    const registeredUser = await RegistrationKeyService
      .registerUser(activationToken, publicUserStore.getEntity().userid).then(res => res.data)
    const updatedUserStatus = await publicUserStore.updatePublicUser(registeredUser)

    if (updatedUserStatus) {
      let user = publicUserStore.getEntity()
      parseUserObjectToLocalStorage(user)
      toggle()

      if (user.role === UserRoles.CONDO_OWNER) {
        navigation("/DashBoardHomeCO")
      } else if (user.role === UserRoles.CONDO_RENTER) {
        navigation("/DashBoardHomeCR")
      }
    }
  }

  return (<>
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
        <Label htmlFor="token" className={"justify-start place-content-start start-bg-black"}>Activation Key</Label>
        {errorMessage("token")}
        <Input onChange={formik.handleChange} id="token" name="token"/>
      </div>
    </form>
    <KeyButton onClick={formik.submitForm}>Activate Key</KeyButton>
  </>)
}