import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import { FaImagePortrait } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import './EditAccount.css';



const EditAccount = (props) => {

    // Image is the image as a URL that is being sent to the Database for image persistence
        const [image, setImage] = useState(null);
     
        const [editProfile, setEditProfileActive] = useState(false);
        const [newProfile, setNewProfile] = useState({
            profilePicture: {image},
            firstName: 'First name',
            lastName:'Last name',
            email: 'test@gmail.com',
            phone: '+1 514 123 4567',
            status: 'Public User'
            
        });

    const handleProfileChange = async e => {
        setNewProfile(prev => ({...prev, [e.target.name]:e.target.value}));
        console.log(newProfile)
    }

    
        const handleImageChange = (e) => {
          const file = e.target.files[0];
      
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result);
              setNewProfile(prev => ({...prev,[e.target.name]:e.target.value}))
            };
            reader.readAsDataURL(file);
          }
        };
        
    return (
        <div className="edit__account__home">
                <div>
                    <Link to="/DashBoardHome"><MdKeyboardDoubleArrowLeft size={40}/></Link>
                </div>
                <div className="body__container">
              <div className="card__container">
                    <div className="container">
                    <div className="col-lg-12 user__title">
                            <p>User Page</p>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-sm-12 profile__img">
                                {image && <img src={image} alt="Uploaded" style={{ maxWidth:'100%', objectFit:'cover' }} />}
                                {!image && (
                                    <>
                                      <label htmlFor="imageInput" >
                                      <FaImagePortrait size={90}/>
                                      <p>Upload Image <MdOutlineFileUpload size={25}/></p>
                                    </label>
                                        <input
                                            type="file"
                                            id="imageInput"
                                            accept="image/*"
                                            onChange={handleImageChange}                 
                                            style={{ display: 'none' }}
                                        />
                                    </>
                                )}
                            </div>
                            <div className="col-lg-8 col-sm-12">
                                <div className="row justify-content-center">
                                <div className= "col-lg-5 col-sm-2 headers">
                                   
                                    <p>First name: </p>
                                    <p>Last name: </p>
                                    <p>Phone Number: </p>
                                    <p>Email: </p>   
                                    <p>Current Plan: </p>
                                </div>
                                <div className= {`col-lg-5 col-sm-4 information ${!editProfile ? '':'editable'}`} >
                                   {!editProfile ? (
                                    <>
                                        {/* <input type="text" value="Condo UserName" style={{margin:'0'}}/>
                                        <input type="text" value="Condo FirstName"/>
                                        <input type="email"value="test@gmail.com"/>
                                        <input type="text" value="+1 514 123 4567"/>
                                        <input type="text" value="Public User"/> */}
                                            <p>{newProfile.firstName}</p>
                                            <p>{newProfile.lastName}</p>
                                            <p>{newProfile.phone} </p>
                                            <p>{newProfile.email}</p>
                                            <p>{newProfile.status}</p>
                                     </>
                                   ):(
                                    <>
                                        <input type="text" value={newProfile.firstName} style={{margin:'0'}} onChange={handleProfileChange} name="firstName"/>
                                        <input type="text" value={newProfile.lastName} onChange={handleProfileChange} name="lastName" />
                                        <input type="text" value={newProfile.phone}  onChange={handleProfileChange} name="phone"/>
                                        <p>{newProfile.email}</p>
                                        <p>{newProfile.status}</p>
                                        {/* <input type="text" value={newProfile.status}  name="status"/> */}
                                 </>
                                   )}
                                    {/* <p>Condo User Name</p>
                                    <p>Condo User Last Name</p>
                                    <p>test@gmail.com</p>
                                    <p> +1 514 123 4567</p>
                                    <p>Public User</p> */}
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 editpage__buttons">
                                <button style={{backgroundColor:'#B1C6D3',color:'white'}} onClick={()=> setEditProfileActive(!editProfile)}>Update Info</button>
                                <button style={{color:'white', backgroundColor:'black'}} >Done</button>
                            </div>
                        </div>                 
                    </div>  
                   </div>
                   </div>
                
          
        </div>
    )
}
export default EditAccount;