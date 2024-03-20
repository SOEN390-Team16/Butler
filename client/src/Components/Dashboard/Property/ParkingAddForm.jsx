import AddButton from "../../Buttons/AddButton.jsx";
import Input from "../../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../../Forms/Label.jsx";
import { useModal } from "../../Modals/Modal.jsx";
import { number, object, string } from "yup";
import axios from "axios";
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

const handleSubmit = (values) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("token");
    const parkingUnit = {
        companyid: userData.cmcId,
        propertyid: props.propertyId,
        parkingUnitNumber: values.parkingUnitNumber,
        parkingUnitFee: values.parkingUnitFee,
        parkingUnitOwner: values.parkingUnitOwner,
        parkingUnitOccupant: values.parkingUnitOccupant,
    };
};

    axios
      .post("http://hortzcloud.com:3000/api/v1/pp", condoUnit, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Condo Unit Successfully Added!");
        props.onAddCondoUnit(condoUnit);
        toggle();
      })
      .catch((reason) => {
        toast.error(`Something went wrong: ${reason.message}`);
        throw reason;
      });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="condoUnitNumber">Condo Unit Number</Label>
          {errorMessage("condoUnitNumber")}
          <Input
            onChange={formik.handleChange}
            id="condoUnitNumber"
            name="condoUnitNumber"
            value={formik.values.condoUnitNumber}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="condoUnitSize">Condo Unit Size</Label>
          {errorMessage("condoUnitSize")}
          <Input
            onChange={formik.handleChange}
            id="condoUnitSize"
            name="condoUnitSize"
            value={formik.values.condoUnitSize}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="condoUnitOccupantType">
            Condo Unit Occupant Type
          </Label>
          {errorMessage("condoUnitOccupantType")}
          <Input
            onChange={formik.handleChange}
            id="condoUnitOccupantType"
            name="condoUnitOccupantType"
            value={formik.values.condoUnitOccupantType}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="condoUnitTotalFees">Condo Unit Total Fees</Label>
          {errorMessage("condoUnitTotalFees")}
          <Input
            onChange={formik.handleChange}
            id="condoUnitTotalFees"
            name="condoUnitTotalFees"
            value={formik.values.condoUnitTotalFees}
          />
        </div>
      </form>
      <AddButton onClick={formik.submitForm}>Add Condo Unit</AddButton>
    </>
  );
}

CondoAddForm.propTypes = {
  onAddCondoUnit: PropTypes.func.isRequired,
  propertyId: PropTypes.number.isRequired,
};
