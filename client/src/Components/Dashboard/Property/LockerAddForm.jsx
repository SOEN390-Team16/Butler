import AddButton from "../../Buttons/AddButton.jsx";
import Input from "../../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../../Forms/Label.jsx";
import { useModal } from "../../Modals/Modal.jsx";
import { number, object, string } from "yup";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function LockerAddForm(props) {
  const { toggle } = useModal();

  let lockerUnitSchema = object({
    lockerUnitNumber: number()
      .required("A locker unit number is required")
      .integer("locker unit number must be an integer")
      .min(1, "locker unit number must be a positive integer"),
    lockerUnitFee: number()
      .required("A locker unit fee is required")
      .integer("locker unit fee must be an integer")
      .min(0, "locker unit fee must be a positive integer"),
    lockerUnitOwner: string().required("A locker unit owner is required"),
    lockerUnitOccupant: string(),
  });

  const handleSubmit = (values) => {
    const lockerUnit = {
      lockerUnitNumber: values.lockerUnitNumber,
      lockerUnitFee: values.lockerUnitFee,
      lockerUnitOwner: values.lockerUnitOwner,
      lockerUnitOccupant: values.lockerUnitOccupant,
      propertyId: props.propertyId,
    };

    props.onAddLockerUnit(lockerUnit);
    toast.success("Locker unit added successfully");
    formik.resetForm();
    toggle();
  };

  const formik = useFormik({
    initialValues: {
      lockerUnitNumber: "",
      lockerUnitFee: "",
      lockerUnitOwner: "",
      lockerUnitOccupant: "",
    },
    validationSchema: lockerUnitSchema,
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

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="lockerUnitNumber">Locker Unit Number</Label>
          {errorMessage("lockerUnitNumber")}
          <Input
            onChange={formik.handleChange}
            id="lockerUnitNumber"
            name="lockerUnitNumber"
            value={formik.values.lockerUnitNumber}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="lockerUnitFee">Locker Unit Fee</Label>
          {errorMessage("lockerUnitFee")}
          <Input
            onChange={formik.handleChange}
            id="lockerUnitFee"
            name="lockerUnitFee"
            value={formik.values.lockerUnitFee}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="lockerUnitOwner">Locker Unit Owner</Label>
          {errorMessage("lockerUnitOwner")}
          <Input
            onChange={formik.handleChange}
            id="lockerUnitOwner"
            name="lockerUnitOwner"
            value={formik.values.lockerUnitOwner}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="lockerUnitOccupant">Locker Unit Occupant</Label>
          {errorMessage("lockerUnitOccupant")}
          <Input
            onChange={formik.handleChange}
            id="lockerUnitOccupant"
            name="lockerUnitOccupant"
            value={formik.values.lockerUnitOccupant}
          />
        </div>
      </form>
      <AddButton onClick={formik.submitForm}>Add Locker Unit</AddButton>
    </>
  );
}
LockerAddForm.propTypes = {
  onAddLockerUnit: PropTypes.func.isRequired,
  unassignedLockerUnits: PropTypes.array.isRequired,
  propertyId: PropTypes.number.isRequired,
};
