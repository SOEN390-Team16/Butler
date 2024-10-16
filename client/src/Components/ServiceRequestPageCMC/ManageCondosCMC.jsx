import { useEffect, useState } from "react";
import axios from "axios";
import { IconButton } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import Modal from "../Modals/Modal.jsx";
import ModalToggler from "../Modals/ModalToggler.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import RegisterButton from "../Buttons/RegisterButton.jsx";
import SideNavCMC from "../SideNav/SideNavCMC.jsx";
import { toast } from "react-toastify";
import { GoPerson } from "react-icons/go";
import CondoAddForm from "../Dashboard/CondoAddForm.jsx";
import AddButton from "../Buttons/AddButton.jsx";
import AssignCondoForm from "../Dashboard/AssignCondoForm.jsx";

const ManageCondosCMC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [condoOwners, setCondoOwners] = useState([]);
  const [condoRenters, setCondoRenters] = useState([]);
  const [condoCurrentPage, setCondoCurrentPage] = useState(1);
  const [condosPerPage, setCondosPerPage] = useState(5);
  const [property, setProperty] = useState([]);
  const [selectedHeading, setSelectedHeading] = useState("condoOwners");
  const [condos, setCondos] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  const handleHeadingClick = (heading) => {
    setSelectedHeading(heading);
  };

  const getAllCondoOwners = () => {
    axios
      .get(`http://hortzcloud.com:3000/api/v1/co`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCondoOwners(response.data);
      })
      .catch((error) => {
        console.error("Error fetching owners:", error);
      });
  };

  const getAllCondoRenters = () => {
    axios
      .get(`http://hortzcloud.com:3000/api/v1/cr`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCondoRenters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching renters:", error);
      });
  };

  useEffect(() => {
    getAllCondoOwners();
    getAllCondoRenters();
  }, [token]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Calculate the currently displayed condos
  const indexOfLastCondo = condoCurrentPage * condosPerPage;
  const indexOfFirstCondo = indexOfLastCondo - condosPerPage;
  const currentCondos = condos.slice(
    indexOfFirstCondo,
    indexOfLastCondo
  );

  // change page
  const paginateCondos = (pageNumber) => setCondoCurrentPage(pageNumber);

  // change number of rows per page
  const handleCondoRowsChange = (event) => {
    setCondosPerPage(Number(event.target.value));
    setCondoCurrentPage(1); // reset to the first page to avoid index range issues
  };

  const assignCondo = (user) => {
    localStorage.setItem("propertyId", property.property_id.toString());

    axios.patch(`http://hortzcloud.com:3000/api/v1/cu/assign/${property.property_id}/${user.userid}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success("Condo assigned successfully!");
      })
      .catch(() => {
        toast.error("Error assigning condo");
      });
  };

  const assignParking = (user) => {
    var id = user.userid;

    axios.post(`http://hortzcloud.com:3000/api/v1/aps/byU/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success("Parking assigned successfully!");
      })
      .catch(() => {
        toast.error("Error assigning parking");
      });
  };

  const assignLocker = (user) => {
    var id = user.userid;

    axios.post(`http://hortzcloud.com:3000/api/v1/al/byU/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        toast.success("Locker assigned successfully!");
      })
      .catch(() => {
        toast.error("Error assigning locker");
      });
  };

  useEffect(() => {
    const fetchProperties = () => {
      axios
        .get("http://hortzcloud.com:3000/api/v1/pp", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProperty(res.data[37]);
        })
        .catch((err) => {
          console.error("Error fetching properties:", err);
        });
    };

    fetchProperties();
  }, [token, userData.cmcId]);

  useEffect(() => {
    const fetchCondosByPropertyId = () => {
      axios
        .get(`http://hortzcloud.com:3000/api/v1/cu/?companyid=${userData.cmcId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCondos(res.data);
        })
        .catch((err) => {
          console.error("Error fetching condos:", err);
        });
    };

    fetchCondosByPropertyId();
  }, [token, userData.cmcId]);

  // add the condo to the database
  const addCondoToState = (newCondo) => {
    setCondos((prevCondos) => [...prevCondos, newCondo]);
  };

  return (
    <div className="dashboard__home">
      <IconButton
        onClick={toggleDrawer}
        icon={<RxHamburgerMenu/>}
        className="fixed top-10 shadow z-50"
        backgroundColor={"#FFFFFF"}
        rounded={"0 10px 10px 0"}
        _hover={{ backgroundColor: "#CCCCCC" }}
      />
      <SideNavCMC isOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
      <div className="container flex flex-col items-center px-24 pb-16">

        {/* fetch/add condo units table */}
        <div
          className="flex flex-col justify-center items-center w-full"
          style={{ paddingTop: 48, paddingBottom: 0 }}
        >
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Condo Units"}>
              <div className="flex items-center gap-4">
                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Condo</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Condo?"
                    description="Please add the required info below."
                  >
                    <CondoAddForm onAddCondo={addCondoToState}/>
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of condo card */}
            <div>
              {condos.length > 0 ? (
                <Table>
                  <TableHeader>
                    <th>Condo Number</th>
                    <th>Condo Size</th>
                  </TableHeader>
                  {currentCondos.map((condo, index) => (
                    <TableRow key={index}>
                      <td>{condo.condo_number}</td>
                      <td>{condo.size || 'N/A'}</td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>Click on the add condo button to start!</h3>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center p-4">
              <button
                onClick={() => paginateCondos(condoCurrentPage - 1)}
                disabled={condoCurrentPage === 1}
                className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Previous
              </button>
              <span>{`Showing ${indexOfFirstCondo + 1} to ${indexOfLastCondo > condos.length ? condos.length : indexOfLastCondo} of ${condos.length}`}</span>
              <button
                onClick={() => paginateCondos(condoCurrentPage + 1)}
                disabled={indexOfLastCondo >= condos.length}
                className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
            <div className="p-4">
              <label className="pr-2">Rows per page:</label>
              <select
                onChange={handleCondoRowsChange}
                className="p-2 rounded bg-white border border-gray-300"
              >
                <option value="5" selected>5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </TableCard>
        </div>
        <div
          className="flex flex-col justify-center items-center w-full"
          style={{ paddingTop: 48, paddingBottom: 0 }}
        >
          <TableCard className={"gap-8"}>
            <div className="flex flex-row justify-around button-container">
              <button
                className={
                  selectedHeading === "condoOwners" ? "selected-button" : ""
                }
                onClick={() => handleHeadingClick("condoOwners")}
              >
                Condo Owners
              </button>
              <button
                className={
                  selectedHeading === "condoRenters" ? "selected-button" : ""
                }
                onClick={() => handleHeadingClick("condoRenters")}
              >
                Condo Renters
              </button>
            </div>
            <div>
              {selectedHeading === "condoOwners" && (
                <div>
                  <Table>
                    <TableHeader>
                      <th></th>
                      <th>Client Name</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </TableHeader>
                    {condoOwners.map((user, index) => (
                      <TableRow key={index}>
                        <td>
                          <GoPerson size={24}/>
                        </td>
                        <td>{user.first_name + " " + user.last_name}</td>
                        <td>
                          <div className="flex items-center gap-4">
                            {/* This is the modal that display once a button is interacted with */}
                            <Modal>
                              <ModalToggler>
                                <RegisterButton>Assign Condo</RegisterButton>
                              </ModalToggler>
                              <ModalContent
                                title="Want to assign a condo?"
                                description="Please select property ID."
                              >
                                <AssignCondoForm user={user}/>
                              </ModalContent>
                            </Modal>
                          </div>
                        </td>
                        <td>
                          <RegisterButton onClick={() => assignParking(user)}>
                            Assign Parking
                          </RegisterButton>
                        </td>
                        <td>
                          <RegisterButton onClick={() => assignLocker(user)}>
                            Assign Locker
                          </RegisterButton>
                        </td>
                      </TableRow>
                    ))}
                  </Table>
                </div>
              )}
              <div>
                {selectedHeading === "condoRenters" && (
                  <div>
                    <Table>
                      <TableHeader>
                        <th></th>
                        <th>Client Name</th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </TableHeader>
                      {condoRenters.map((user, index) => (
                        <TableRow key={index}>
                          <td>
                            <GoPerson size={24}/>
                          </td>
                          <td>{user.first_name + " " + user.last_name}</td>
                          <td>
                            <RegisterButton onClick={() => assignCondo(user)}>
                              Assign Condo
                            </RegisterButton>
                          </td>
                          <td>
                            <RegisterButton onClick={() => assignParking(user)}>
                              Assign Parking
                            </RegisterButton>
                          </td>
                          <td>
                            <RegisterButton onClick={() => assignLocker(user)}>
                              Assign Locker
                            </RegisterButton>
                          </td>
                        </TableRow>
                      ))}
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </TableCard>
        </div>
      </div>
    </div>
  );
};

export default ManageCondosCMC;
