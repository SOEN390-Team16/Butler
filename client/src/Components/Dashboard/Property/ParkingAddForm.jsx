import AddButton from "../../Buttons/AddButton.jsx";
import Input from "../../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../../Forms/Label.jsx";
import { useModal } from "../../Modals/Modal.jsx";
import { number, object, string } from "yup";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function ParkingAddForm(props) {
  const { toggle } = useModal();

  let parkingUnitSchema = object({
    parkingUnitNumber: number()
      .required("A parking unit number is required")
      .integer("Parking unit number must be an integer")
      .min(1, "Parking unit number must be a positive integer"),
    parkingUnitFee: number()
      .required("A parking unit fee is required")
      .integer("Parking unit fee must be an integer")
      .min(0, "Parking unit fee must be a positive integer"),
    parkingUnitOwner: string().required("A parking unit owner is required"),
    parkingUnitOccupant: string(),
  });

  const handleSubmit = (values) => {
    const parkingUnit = {
      parkingUnitNumber: values.parkingUnitNumber,
      parkingUnitFee: values.parkingUnitFee,
      parkingUnitOwner: values.parkingUnitOwner,
      parkingUnitOccupant: values.parkingUnitOccupant,
      propertyId: props.propertyId,
    };

    props.onAddParkingUnit(parkingUnit);
    toast.success("Parking unit added successfully");
    formik.resetForm();
    toggle();
  };

  const formik = useFormik({
    initialValues: {
      parkingUnitNumber: "",
      parkingUnitFee: "",
      parkingUnitOwner: "",
      parkingUnitOccupant: "",
    },
    validationSchema: parkingUnitSchema,
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
          <Label htmlFor="parkingUnitNumber">Parking Unit Number</Label>
          {errorMessage("parkingUnitNumber")}
          <Input
            onChange={formik.handleChange}
            id="parkingUnitNumber"
            name="parkingUnitNumber"
            value={formik.values.parkingUnitNumber}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="parkingUnitFee">Parking Unit Fee</Label>
          {errorMessage("parkingUnitFee")}
          <Input
            onChange={formik.handleChange}
            id="parkingUnitFee"
            name="parkingUnitFee"
            value={formik.values.parkingUnitFee}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="parkingUnitOwner">Parking Unit Owner</Label>
          {errorMessage("parkingUnitOwner")}
          <Input
            onChange={formik.handleChange}
            id="parkingUnitOwner"
            name="parkingUnitOwner"
            value={formik.values.parkingUnitOwner}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="parkingUnitOccupant">Parking Unit Occupant</Label>
          {errorMessage("parkingUnitOccupant")}
          <Input
            onChange={formik.handleChange}
            id="parkingUnitOccupant"
            name="parkingUnitOccupant"
            value={formik.values.parkingUnitOccupant}
          />
        </div>
      </form>
      <AddButton onClick={formik.submitForm}>Add Parking Unit</AddButton>
    </>
  );
}
ParkingAddForm.propTypes = {
  onAddParkingUnit: PropTypes.func.isRequired,
  unassignedParkingUnits: PropTypes.array.isRequired,
  propertyId: PropTypes.number.isRequired,
};
