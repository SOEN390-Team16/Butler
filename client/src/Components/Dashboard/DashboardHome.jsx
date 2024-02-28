import {useState} from "react";
import {RxHamburgerMenu} from "react-icons/rx";
import "./DashBoardHome.css";
import SideDrawer from "./SideDrawer";
import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import {Link} from "react-router-dom";
import AddButton from "../Buttons/AddButton.jsx";

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
      <div className="container flex flex-col items-center px-4">
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard>
            <TableCardHeader title={"My Properties 🏢"}>
              <div className="flex items-center gap-4">
                <Link className="underline" to={""}>See more</Link>
                <AddButton>Add Property</AddButton>
              </div>
            </TableCardHeader>
          </TableCard>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
