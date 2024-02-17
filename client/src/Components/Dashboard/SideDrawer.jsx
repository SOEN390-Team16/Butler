import React from 'react';
import './SideDrawer.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import image from '../../pictures/loginHero.jpg'


// The sidedrawer container has all information for navigating between links to see the different features.


const SideDrawer = props => {

  return (

    // Conditional rendering on wether the drawer is open or not.
    <div className={`sideDrawer ${props.isOpen ? 'open' : ''}`}>
      <div className="closeButton" onClick={props.onClose}>
      <FaArrowLeft style={{color:'black'}}/>
      </div>
      <div className="company__tag">
        <Link to ="/DashboardHome">
          <h1>Butler.</h1>
        </Link>     
        <div className="profile__info">
            <div className="profile__picture">
                  <img src={image} alt="Uploaded" style={{ maxWidth:'100%', objectFit:'cover' }} />
            </div>
            <div className="greeting">
                <p>Welcome back <MdWavingHand /></p>
                <p className="user__name">{props.firstName + " " + props.lastName}</p>
            </div>
        </div>
     
      </div>
      <ul className="">
        {props.children}
      </ul>
      <div className="drawer__buttons">
          <div className="edit__profile">
           <Link to="/DashboardHome/editUser"> <button>Edit Profile</button></Link>
          </div>
          <div className="log__out">
              <Link to="/"><button> Log Out</button></Link>
          </div>
      </div>
    </div>
  );
};

export default SideDrawer;
