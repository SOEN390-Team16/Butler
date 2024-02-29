import {useState} from "react";
import {RxHamburgerMenu} from "react-icons/rx";
import "./DashBoardHome.css";
import SideDrawer from "./SideDrawer";
import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import {Link} from "react-router-dom";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import {GoArrowUpRight} from "react-icons/go";
import ModalToggler from "../Modals/ModalToggler.jsx";
import AddButton from "../Buttons/AddButton.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";
import PropertyAddForm from "./PropertyAddForm.jsx";

// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
const DashBoardHome = () => {
  // toggles the drawer between being open and closed
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const options = [
    {key: 1, option: "Label 1"},
    {key: 2, option: "Label 2"},
    {key: 3, option: "Label 3"},
    {key: 4, option: "Label 4"},
  ];

  const dummyUser = {
    fName: "Condo",
    lName: "Owner",
  };


  return (
    <div className="dashboard__home">
      <div className="sidedrawer__open"></div>
      <button className="patty__button" onClick={toggleDrawer}>
        <RxHamburgerMenu size={40}/>
      </button>

      {/* The Side drawer is whats being opened for main navigation */}
      <SideDrawer
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
      </SideDrawer>
      {/* Your main content goes here */}
      <div className="container flex flex-col items-center px-24">
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"My Properties 🏢"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>See more</Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Property</AddButton>
                  </ModalToggler>
                  <ModalContent title="Want to add a Property"
                                description="Add the information associated to the property to add it to your account"
                                onExit={() => console.log('exit')}
                  >
                    <PropertyAddForm/>
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
                  <td><GoArrowUpRight size={24}/></td>
                  <td>Great Howls</td>
                  <td>1231 Rue Gonebad</td>
                  <td>293</td>
                  <td>200</td>
                  <td>400</td>
                </TableRow>
                <TableRow>
                  <td><GoArrowUpRight size={24}/></td>
                  <td>Property Name</td>
                  <td>Property Address</td>
                  <td>Unit Count</td>
                  <td>Parking Count</td>
                  <td>Locker Count</td>
                </TableRow>
                <TableRow>
                  <td><GoArrowUpRight size={24}/></td>
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
      </div>
    </div>
  );
};

export default DashBoardHome;
