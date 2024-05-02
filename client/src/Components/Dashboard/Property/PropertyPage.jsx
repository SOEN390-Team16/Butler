// React imports
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Axios for API calls
import axios from "axios";

// React Icons
import { RxHamburgerMenu } from "react-icons/rx";
import { GoArrowUpRight } from "react-icons/go";
import { IoArrowBack } from "react-icons/io5";
import { FaDownload, FaTrash } from "react-icons/fa";

// Services
import FileService from "../../../service/property/FileService.js";

// Components
import SideNavCMC from "../../SideNav/SideNavCMC.jsx";
import TableCard from "../../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../../Cards/Tables/TableCardHeader.jsx";
import Table from "../../Tables/Table.jsx";
import TableHeader from "../../Tables/TableHeader.jsx";
import TableRow from "../../Tables/TableRow.jsx";
import ModalToggler from "../../Modals/ModalToggler.jsx";
import ModalContent from "../../Modals/ModalContent.jsx";
import Modal from "../../Modals/Modal.jsx";

// Buttons
import AddButton from "../../Buttons/AddButton.jsx";

// Assets
import image from "../../../assets/condo.jpeg";

// Styles
import "../DashBoardHome.css";
import CondoAddForm from "./CondoAddForm.jsx";
import ParkingAddForm from "./ParkingAddForm.jsx";
import { toast } from "react-toastify";
import LockerAddForm from "./LockerAddForm.jsx";

// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
export default function PropertyPage() {
  const { id } = useParams();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [property, setProperty] = useState();
  const [condoUnitsUncompleted, setCondoUnitsUncompleted] = useState([]);
  const [condoUnitsCompleted, setCondoUnitsCompleted] = useState([]);

  const [parkingUnits, setParkingUnits] = useState([]);
  const [assignedParkingUnits, setAssignedParkingUnits] = useState([]);

  const [lockerUnits, setLockerUnits] = useState([]);
  const [assignedLockerUnits, setAssignedLockerUnits] = useState([]);

  const [propertyFiles, setPropertyFiles] = useState([])
  const fileInputRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      await axios
        .get(`http://hortzcloud.com:3000/api/v1/pp/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProperty(res.data);
        })
        .catch((err) => {
          console.error("Error fetching property:", err);
        });
    };

    const fetchCondoUnits = async () => {
      await axios
        .get(`http://hortzcloud.com:3000/api/v1/cu`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCondoUnitsUncompleted(
            res.data.filter(
              (condoUnit) =>
                condoUnit.companyid === userData.cmcId &&
                condoUnit.property_id == id &&
                condoUnit.size == null
            )
          );
          setCondoUnitsCompleted(
            res.data.filter(
              (condoUnit) =>
                condoUnit.companyid === userData.cmcId &&
                condoUnit.property_id == id &&
                condoUnit.size != null
            )
          );
        })
        .catch((err) => {
          console.error("Error fetching condo units:", err);
        });
    };

    const fetchParkingUnits = async () => {
      await axios
        .get(`http://hortzcloud.com:3000/api/v1/ps/getByP/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          res.data.filter((parkingUnit) => {
            parkingUnit.property_id === id &&
              !assignedParkingUnits.includes(parkingUnit);
          });
          setParkingUnits(res.data);
        })
        .catch((err) => {
          console.error("Error fetching parking units:", err);
        });
    };

    const fetchAssignedParkingUnits = async () => {
      await axios
        .get(`http://hortzcloud.com:3000/api/v1/aps`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAssignedParkingUnits(
            res.data.filter(
              (assignedParkingUnit) => assignedParkingUnit.property_id === id
            )
          );
        })
        .catch((err) => {
          console.error("Error fetching assigned parking units:", err);
        });
    };

    const fetchLockerUnits = async () => {
      axios
        .get(`http://hortzcloud.com:3000/api/v1/l/`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLockerUnits(
            res.data.filter((lockerUnit) => {
              lockerUnit.property_id === id;
            })
          );
        })
        .catch((err) => {
          console.error("Error fetching locker units:", err);
        });
    };

    const fetchPropertyFiles = () => {
      FileService.getPropertyFilesByPropertyId(id)
        .then(response => {
          setPropertyFiles(response.data)
        })
    };

    fetchProperty();
    fetchCondoUnits();
    fetchAssignedParkingUnits();
    fetchParkingUnits();
    fetchLockerUnits();
    fetchPropertyFiles();
  }, [id, token, userData.cmcId]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const onAddParkingUnit = (parkingUnit) => {
    for (let key in parkingUnit) {
      if (parkingUnit[key] === "") {
        toast.error("Please fill in all fields");
        return;
      }
    }
    setAssignedParkingUnits((prevState) => [...prevState, parkingUnit]);
  };

  const onAddLockerUnit = (lockerUnit) => {
    for (let key in lockerUnit) {
      if (lockerUnit[key] === "") {
        toast.error("Please fill in all fields");
        return;
      }
    }
    setAssignedLockerUnits((prevState) => [...prevState, lockerUnit]);
  };


  const handleDeleteFile = (property_file_id) => {
    const property_id = id;
    FileService.deletePropertyFilesByPropertyId(property_file_id, property_id)
      .then(() => {
        setPropertyFiles(currentFiles => currentFiles
          .filter(file => file.property_file_id !== property_file_id));
        toast.success("Successfully deleted the file!")
      })
      .catch(err => console.error("Error deleting the file:", err));
  };

  const handleDownloadFile = (url) => {
    window.open(url, '_blank');
  };

  const handleUploadFilesClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      uploadFiles(files);
    }
  };

  const uploadFiles = async (files) => {
    const loadingToast = toast.loading('Uploading files...');
    const property_id = id;
    FileService.uploadPropertyFilesWithPropertyId(files, property_id)
      .then(response => {
        setPropertyFiles(prevFiles => [...prevFiles, ...response.data])
        toast.dismiss(loadingToast);
        toast.success("Files uploaded successfully", { autoClose: 500 })
      })
      .catch(err => {
        console.error(err)
        toast.dismiss(loadingToast);
      })
  };

  if (!token || !userData) {
    navigate("/");
  }

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard__home">
      <div className="sidedrawer__open"></div>
      <button className="patty__button" onClick={toggleDrawer}>
        <RxHamburgerMenu size={40} />
      </button>

      {/* The Side drawer is whats being opened for main navigation */}
      <SideNavCMC isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      {/* Your main content goes here */}
      <div className="container flex flex-col items-center px-24 pb-16 gap-12">
        {/* Property Detail Card */}
        <div className="flex flex-row justify-between w-full gap-8 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
          <div className="flex flex-1 flex-col p-8">
            {/* Card Title */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <Link to={"/DashboardHomeCMC"}>
                <IoArrowBack
                  size={30}
                  className="text-gray-700 hover:text-gray-900"
                />
              </Link>
              <h1 className="text-xl font-semibold text-gray-800">
                {property.property_name} details
              </h1>
              {/* Ghost Icon for alignment */}
              <IoArrowBack
                size={30}
                className="text-gray-700 hover:text-gray-900"
                color="transparent"
              />
            </div>

            <div className="flex flex-1 px-8 flex-col justify-around font-medium text-gray-700">
              <p className="flex justify-between">
                Property Name:{" "}
                <span className="font-bold">{property.property_name}</span>
              </p>
              <p className="flex justify-between">
                Address: <span className="font-bold">{property.address}</span>
              </p>
              <p className="flex justify-between">
                Total Condo Units:{" "}
                <span className="font-bold">{property.unit_count}</span>
              </p>
              <p className="flex justify-between">
                Condo Units Available:{" "}
                <span className="font-bold">
                  {condoUnitsUncompleted.length}
                </span>
              </p>
              <p className="flex justify-between">
                Total Parking Units:{" "}
                <span className="font-bold">{property.parking_count}</span>
              </p>
              <p className="flex justify-between">
                Total Locker Units:{" "}
                <span className="font-bold">{property.locker_count}</span>
              </p>
            </div>
          </div>
          <img src={image} alt="condo" className="object-cover w-[50%]" />
        </div>

        {/* Condo Units Table */}
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Condo Units 🏢"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Condo Units</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Condo Unit?"
                    description="Add the information associated to the condo unit to add it to your account"
                  >
                    <CondoAddForm
                      propertyId={id}
                      condoUnitsUncompleted={condoUnitsUncompleted}
                    />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              {condoUnitsCompleted.length > 0 ? (
                <Table>
                  <TableHeader>
                    <th></th>
                    <th>Unit Number</th>
                    <th>Unit Size</th>
                    <th>Unit Occupant Type</th>
                    <th>Unit Total Fees</th>
                  </TableHeader>
                  {condoUnitsCompleted.map((condoUnit, index) => (
                    <TableRow key={index}>
                      <td>
                        <Link to={``}>
                          <GoArrowUpRight size={24} />
                        </Link>
                      </td>
                      <td>{condoUnit.condo_number}</td>
                      <td>{condoUnit.size}</td>
                      <td>{condoUnit.occupant_type}</td>
                      <td>{condoUnit.total_fees}</td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>Add a condo unit information to see it here!</h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>

        {/* Parking Units Table */}
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Parking Units 🚘"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Parking Units</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Parking Unit?"
                    description="Add the information associated to the parking unit to add it to your account"
                  >
                    <ParkingAddForm
                      propertyId={id}
                      unassignedParkingUnits={parkingUnits}
                      onAddParkingUnit={onAddParkingUnit}
                    />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>

            {/* Body of properties card */}
            <div>
              {assignedParkingUnits.length > 0 ? (
                <Table>
                  {}
                  <TableHeader>
                    <th></th>
                    <th>Unit Number</th>
                    <th>Unit Fee</th>
                    <th>Unit Owner</th>
                    <th>Unit Occupant</th>
                  </TableHeader>
                  {assignedParkingUnits.map((assignedParkingUnit, index) => (
                    <TableRow key={index}>
                      <td>
                        <Link to={``}>
                          <GoArrowUpRight size={24} />
                        </Link>
                      </td>
                      <td>{assignedParkingUnit.parkingUnitNumber}</td>
                      <td>{assignedParkingUnit.parkingUnitFee}</td>
                      <td>{assignedParkingUnit.parkingUnitOwner}</td>
                      <td>{assignedParkingUnit.parkingUnitOccupant}</td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>Add a parking unit information to see it here!</h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>

        {/* Locker Units Table */}
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Locker Units 🔐"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Locker Units</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Locker Unit?"
                    description="Add the information associated to the locker unit to add it to your account"
                  >
                    <LockerAddForm
                      propertyId={id}
                      unassignedLockerUnits={lockerUnits}
                      onAddLockerUnit={onAddLockerUnit}
                    />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>

            {/* Body of properties card */}
            <div>
              {assignedLockerUnits.length > 0 ? (
                <Table>
                  {}
                  <TableHeader>
                    <th></th>
                    <th>Unit Number</th>
                    <th>Unit Fee</th>
                    <th>Unit Owner</th>
                    <th>Unit Occupant</th>
                  </TableHeader>
                  {assignedLockerUnits.map((assignedLockerUnits, index) => (
                    <TableRow key={index}>
                      <td>
                        <Link to={``}>
                          <GoArrowUpRight size={24} />
                        </Link>
                      </td>
                      <td>{assignedLockerUnits.lockerUnitNumber}</td>
                      <td>{assignedLockerUnits.lockerUnitFee}</td>
                      <td>{assignedLockerUnits.lockerUnitOwner}</td>
                      <td>{assignedLockerUnits.lockerUnitOccupant}</td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>Add a locker unit information to see it here!</h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>

        {/* Property files */}
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties files card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Files 📂"}>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <AddButton onClick={handleUploadFilesClick}>Upload Files </AddButton>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              {propertyFiles.length > 0 ? (
                <Table>
                  <TableHeader>
                    <th>File Name</th>
                    <th></th>
                    <th></th>
                  </TableHeader>
                  {propertyFiles.map((propertyFile, index) => (
                    <TableRow key={index}>
                      <td>{propertyFile.file_name}</td>
                      <td>
                        <button onClick={() => handleDownloadFile(propertyFile.url)}
                                className="text-blue-500 hover:text-blue-700">
                          <FaDownload/>
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleDeleteFile(propertyFile.property_file_id)}
                                className="text-red-500 hover:text-red-700">
                          <FaTrash/>
                        </button>
                      </td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>Upload files to see them here!</h3>
                </div>)
              }
            </div>
          </TableCard>
        </div>
      </div>
    </div>
  );
}
