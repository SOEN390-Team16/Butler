import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./DashboardHome.css";
import SideDrawer from "./SideDrawer";
import { LuConstruction } from "react-icons/lu";

// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
const DashBoardHome = () => {
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

  const [dots, setDots] = useState(".");

  setTimeout(() => {
    if (dots === ".") {
      setDots("..");
    } else if (dots === "..") {
      setDots("...");
    } else {
      setDots(".");
    }
  }, 1000);

  return (
    <div className="dashboard__home">
      <div className="sidedrawer__open"></div>
      <button className="patty__button" onClick={toggleDrawer}>
        <RxHamburgerMenu size={40} />
      </button>

      {/* The Side drawer is what's being opened for main navigation */}
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
      <div className="container">
        <div className="construction__sign">
          <LuConstruction size={60} />
          <h1>Site in construction {dots}</h1>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
