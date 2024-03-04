import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./DashBoardHome.css";
import SideDrawerCMC from "./SideDrawerCMC";
import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import { Link } from "react-router-dom";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import { GoArrowUpRight, GoPerson } from "react-icons/go";
import ModalToggler from "../Modals/ModalToggler.jsx";
import AddButton from "../Buttons/AddButton.jsx";
import GenerateKeyButton from "../Buttons/GenerateKeyButton.jsx";
import DeleteButton from "../Buttons/DeleteButton.jsx";
import SearchButton from "../Buttons/SearchButton.jsx";
import RegisterButton from "../Buttons/RegisterButton.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";
import PropertyAddForm from "./PropertyAddForm.jsx";
import GenerateKeyForm from "./GenerateKeyForm.jsx";
import UserRegistrationForm from "./UserRegistrationForm.jsx";
import { IoSearch } from "react-icons/io5";

// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
const DashBoardHomeCMC = () => {
  // test table
  const [selectedHeading, setSelectedHeading] = useState("heading1");

  const handleHeadingClick = (heading) => {
    setSelectedHeading(heading);
  };
  // test table ends

  // toggles the drawer between being open and closed
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const options = [
    { key: 1, option: "Label 1" },
    { key: 2, option: "Label 2" },
    { key: 3, option: "Label 3" },
    { key: 4, option: "Label 4" },
  ];

  const dummyUser = {
    fName: "Condo",
    lName: "Owner",
  };

  return (
    <div className="dashboard__home">
      <div className="sidedrawer__open"></div>
      <button className="patty__button" onClick={toggleDrawer}>
        <RxHamburgerMenu size={40} />
      </button>

      {/* The Side drawer is whats being opened for main navigation */}
      <SideDrawerCMC
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        firstName={dummyUser.fName}
        lastName={dummyUser.lName}
      >
        <div className="link__holder">
          {options &&
            options.map((obj) => {
              return (
                <div key={obj.key} className="link__option">
                  <p>{obj.option}</p>
                </div>
              );
            })}
        </div>
      </SideDrawerCMC>
      {/* Your main content goes here */}
      <div className="container flex flex-col items-center px-24">
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"My Properties 🏢"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Property</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Property?"
                    description="Add the information associated to the property to add it to your account"
                    onExit={() => console.log("exit")}
                  >
                    <PropertyAddForm />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              <Table>
                <TableHeader>
                  <th></th>
                  <th>Property Name</th>
                  <th>Property Address</th>
                  <th>Unit Count</th>
                  <th>Parking Count</th>
                  <th>Locker Count</th>
                </TableHeader>
                <TableRow>
                  <td>
                    <GoArrowUpRight size={24} />
                  </td>
                  <td>Great Howls</td>
                  <td>1231 Rue Gonebad</td>
                  <td>293</td>
                  <td>200</td>
                  <td>400</td>
                </TableRow>
                <TableRow>
                  <td>
                    <GoArrowUpRight size={24} />
                  </td>
                  <td>Property Name</td>
                  <td>Property Address</td>
                  <td>Unit Count</td>
                  <td>Parking Count</td>
                  <td>Locker Count</td>
                </TableRow>
                <TableRow>
                  <td>
                    <GoArrowUpRight size={24} />
                  </td>
                  <td>Property Name</td>
                  <td>Property Address</td>
                  <td>Unit Count</td>
                  <td>Parking Count</td>
                  <td>Locker Count</td>
                </TableRow>
              </Table>
            </div>
          </TableCard>
        </div>

        {/* second table */}
        <div
          className="flex flex-col justify-center items-center w-full"
          style={{ paddingTop: 48, paddingBottom: 0 }}
        >
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"My Clients"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <GenerateKeyButton>Generate Key</GenerateKeyButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to generate a Registration Key?"
                    description="Add the information associated to the unit. We will generate the Registration Key for you!"
                    onExit={() => console.log("exit")}
                  >
                    <GenerateKeyForm />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              <Table>
                <TableHeader>
                  <th></th>
                  <th>Client Name</th>
                  <th>Unit Address</th>
                  <th>Status</th>
                  <th>Parking</th>
                  <th>Locker</th>
                </TableHeader>
                <TableRow>
                  <td>
                    <GoPerson size={24} />
                  </td>
                  <td>Client Name</td>
                  <td>Unit Address</td>
                  <td>Public</td>
                  <td>1</td>
                  <td>2</td>
                </TableRow>
                <TableRow>
                  <td>
                    <GoPerson size={24} />
                  </td>
                  <td>Client Name</td>
                  <td>Unit Address</td>
                  <td>Rental</td>
                  <td>1</td>
                  <td>2</td>
                </TableRow>
                <TableRow>
                  <td>
                    <GoPerson size={24} />
                  </td>
                  <td>Client Name</td>
                  <td>Unit Address</td>
                  <td>Owner</td>
                  <td>1</td>
                  <td>2</td>
                </TableRow>
              </Table>
            </div>
          </TableCard>
        </div>

        {/* third & fourth tables */}
        <div
          className="flex flex-col justify-center items-center w-full"
          style={{ paddingTop: 48, paddingBottom: 64 }}
        >
          {/* Properties card goes here */}
          <TableCard className={"gap-8"}>
            {/* Body of properties card */}

            <div className="flex flex-row justify-around button-container">
              <button
                className={
                  selectedHeading === "allUsers" ? "selected-button" : ""
                }
                onClick={() => handleHeadingClick("allUsers")}
              >
                All Users
              </button>
              <button
                className={
                  selectedHeading === "registerUsers" ? "selected-button" : ""
                }
                onClick={() => handleHeadingClick("registerUsers")}
              >
                Register Users
              </button>
            </div>
            <div className="flex flex-row items-center gap-8">
              <div className="relative">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-[24px] text-gray-600" />
                <input
                  type="text"
                  placeholder="Email Address..."
                  className="border border-gray-300 py-2 w-[360px] rounded-md pl-10"
                />
              </div>

              <SearchButton>Search</SearchButton>
            </div>
            <div>
              {selectedHeading === "allUsers" && (
                <Table>
                  <TableHeader>
                    <th></th>
                    <th>Client Name</th>
                    <th>Email Address</th>
                    <th>Status</th>
                    <th>Token</th>
                    <th>Delete</th>
                  </TableHeader>
                  <TableRow>
                    <td>
                      <GoPerson size={24} />
                    </td>
                    <td>Client Name</td>
                    <td>Email Address</td>
                    <td>Public</td>
                    <td>/</td>
                    <td>
                      <DeleteButton>Delete</DeleteButton>
                    </td>
                  </TableRow>
                  <TableRow>
                    <td>
                      <GoPerson size={24} />
                    </td>
                    <td>Client Name</td>
                    <td>Email Address</td>
                    <td>Rental</td>
                    <td>****_****_****</td>
                    <td>
                      <DeleteButton>Delete</DeleteButton>
                    </td>
                  </TableRow>
                  <TableRow>
                    <td>
                      <GoPerson size={24} />
                    </td>
                    <td>Client Name</td>
                    <td>Email Address</td>
                    <td>Owner</td>
                    <td>****_****_****</td>
                    <td>
                      <DeleteButton>Delete</DeleteButton>
                    </td>
                  </TableRow>
                </Table>
              )}
              {selectedHeading === "registerUsers" && (
                <Table>
                  <TableHeader>
                    <th></th>
                    <th>Client Name</th>
                    <th>Email Address</th>
                    <th>Status</th>
                    <th>Token</th>
                    <th>Register</th>
                  </TableHeader>
                  <TableRow>
                    <td>
                      <GoPerson size={24} />
                    </td>
                    <td>Client Name</td>
                    <td>Email Address</td>
                    <td>Public</td>
                    <td>/</td>
                    <td>
                      <Modal>
                        <ModalToggler>
                          <RegisterButton>Register</RegisterButton>
                        </ModalToggler>
                        <ModalContent
                          title="User Registration"
                          description="Is this the user you would like to register? A Registration Key will automatically be associated to their account."
                          onExit={() => console.log("exit")}
                        >
                          <UserRegistrationForm />
                        </ModalContent>
                      </Modal>
                    </td>
                  </TableRow>
                  <TableRow>
                    <td>
                      <GoPerson size={24} />
                    </td>
                    <td>Client Name</td>
                    <td>Email Address</td>
                    <td>Public</td>
                    <td>/</td>
                    <td>
                      <Modal>
                        <ModalToggler>
                          <RegisterButton>Register</RegisterButton>
                        </ModalToggler>
                        <ModalContent
                          title="User Registration"
                          description="Is this the user you would like to register? A Registration Key will automatically be associated to their account."
                          onExit={() => console.log("exit")}
                        >
                          <UserRegistrationForm />
                        </ModalContent>
                      </Modal>
                    </td>
                  </TableRow>
                  <TableRow>
                    <td>
                      <GoPerson size={24} />
                    </td>
                    <td>Client Name</td>
                    <td>Email Address</td>
                    <td>Public</td>
                    <td>/</td>
                    <td>
                      <Modal>
                        <ModalToggler>
                          <RegisterButton>Register</RegisterButton>
                        </ModalToggler>
                        <ModalContent
                          title="User Registration"
                          description="Is this the user you would like to register? A Registration Key will automatically be associated to their account."
                          onExit={() => console.log("exit")}
                        >
                          <UserRegistrationForm />
                        </ModalContent>
                      </Modal>
                    </td>
                  </TableRow>
                </Table>
              )}
            </div>
          </TableCard>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHomeCMC;
