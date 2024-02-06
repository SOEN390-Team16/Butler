import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import './EditAccount.css';



const EditAccount = () => {












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
                            <div className="col-lg-4 col-sm-12 edit__picture">

                            </div>
                            <div className="col-lg-8 col-sm-12">
                                <div className="row justify-content-center">
                                <div className= "col-lg-5 col-sm-2 headers">
                                    <p>First Name: </p>
                                    <p>Last Name: </p>
                                    <p>Email: </p>
                                    <p>Phone Number: </p>
                                    <p>Current Plan: </p>
                                </div>
                                <div className= "col-lg-5 col-sm-4 information">
                                    <p>Condo User Name</p>
                                    <p>Condo User Last Name</p>
                                    <p>test@gmail.com</p>
                                    <p> +1 514 123 4567</p>
                                    <p>Public User</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 editpage__buttons">
                                <button style={{backgroundColor:'#B1C6D3',color:'white'}}>Update Info</button>
                                <button style={{color:'white', backgroundColor:'black'}}>Done</button>
                            </div>
                        </div>                 
                    </div>  
                   </div>
                   </div>
                
          
        </div>
    )
}
export default EditAccount;