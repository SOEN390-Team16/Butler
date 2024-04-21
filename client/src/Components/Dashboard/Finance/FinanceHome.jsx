import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "../DashBoardHome.css";
import SideDrawerCMC from "../../SideNav/SideNavCMC.jsx";
import TableCard from "../../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../../Cards/Tables/TableCardHeader.jsx";
import { Link } from "react-router-dom";
import Table from "../../Tables/Table.jsx";
import TableHeader from "../../Tables/TableHeader.jsx";
import TableRow from "../../Tables/TableRow.jsx";
import { GoArrowUpRight } from "react-icons/go";
import ModalToggler from "../../Modals/ModalToggler.jsx";
import AddButton from "../../Buttons/AddButton.jsx";
import SearchButton from "../../Buttons/SearchButton.jsx";
import ModalContent from "../../Modals/ModalContent.jsx";
import Modal from "../../Modals/Modal.jsx";
import EditButton from "../../Buttons/EditButton.jsx";
import EditOperationForm from "./EditOperationForm.jsx";
import { toast } from 'react-toastify'
import axios from "axios";
import AddOperationForm from "./AddOperationForm.jsx";


// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
const FinanceHome = () => {
  // test table
 
  const [operations, setOperations] = useState([])

  // test table ends

  // toggles the drawer between being open and closed
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [totalOperationCost, setTotalOperationCost] = useState([])
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  // const deletePublicUser = (user) => {
  //   axios
  //     .delete(`http://hortzcloud.com:3000/api/v1/pu/${user.userid}`, {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log("res for deleting user:");
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting user:", error);
  //     });
  // };

  useEffect(() => {
    const fetchProperties = () => {
      axios
        .get("http://hortzcloud.com:3000/api/v1/pp", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProperties(
            res.data.filter((property) => property.companyid === userData.cmcId)
          );
        })
        .catch((err) => {
          console.error("Error fetching properties:", err);
        });
    };

    fetchProperties();
  }, [token, userData.cmcId]);

console.log(userData)
// REMEMBER TO CHANGE THIS TO HORTZCLOUD
useEffect(() => {
  const fetchOperations = () => {
    axios.get(`http://hortzcloud.com:3000/api/v1/op/${userData.cmcId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setOperations(res.data)
    }).catch(err => {
      toast.error(err)
    })
  }
  fetchOperations()
}, [token])

  // TODO: Add the property to the database
  const handleSubmit = async (values) => {
    values.property_id = parseInt(values.property_id);
    setOperations((prevOperations) => [...prevOperations, values])
    await axios
      .post("http://hortzcloud.com:3000/api/v1/op", values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Operation added successfully!");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // toggle();
    // alert(JSON.stringify(values, null, 2));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

// REMEMBER TO CHANGE THIS TO HORTZCLOUD
  useEffect(()=> {
    const fetchTotalOperations= () => {
      axios.get(`http://hortzcloud.com:3000/api/v1/op/total-cost/${userData.cmcId}`,{
        headers: {
          authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setTotalOperationCost(res.data.Operations)
      }).catch(err=>{
        console.log(err)
  })
} 
      fetchTotalOperations()
  },[token])


 




  // for register users table
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCurrentPage, setTotalCurrentPage] = useState(1)
  const itemsPerPage = 3;


  const totalPages = Math.ceil(operations.length / itemsPerPage);
  const totalCurrentPageCount = Math.ceil(totalOperationCost.length / itemsPerPage);
  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleTotalClickNext = () => {
    setTotalCurrentPage((prevPage) => prevPage + 1);
  };

  const handleTotalClickPrevious = () => {
    setTotalCurrentPage((prevPage) => prevPage - 1);
  };

  const totalStartIndex = (totalCurrentPage - 1) * itemsPerPage;
  const totalEndIndex = Math.min(totalStartIndex + itemsPerPage, totalOperationCost.length);
  const visibleTotal = totalOperationCost.slice(totalStartIndex, totalEndIndex);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleOperations = operations.slice(startIndex, endIndex);

  return (
    <div className="dashboard__home">
      <div className="finance__hero"></div>
      <button className="patty__button" onClick={toggleDrawer}>
        <RxHamburgerMenu size={40} />
      </button>

      {/* The Side drawer is whats being opened for main navigation */}
      <SideDrawerCMC
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
      
      >
    
      </SideDrawerCMC>
      {/* Your main content goes here */}
      <div className="container flex flex-col items-center px-24 pb-16">
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Total Operation Cost🏦"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                {/* <Link className="underline" to={""}>
                  See more
                </Link> */}
                
                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                <p className="font-bold">Current Operational Budget: </p>
                  <ModalContent
                    title="Want to add a Transaction?"
                    description="Add the information associated to the transaction to add it to your account."
                  >
                    <AddOperationForm onClick={handleSubmit}/>
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              {operations.length > 0 ? (
                <div>
                <Table>
                  <TableHeader>
                    <th></th>                 
                    <th>Property</th>
                    <th>Operational Costs</th>
                  </TableHeader>
                  {visibleTotal.map((property, index) => (
                    <TableRow key={index}>
                      <td>
                        <Link
                          to={`/DashboardHomeCMC/property/${property.property_id}`}
                        >
                          <GoArrowUpRight size={24} />
                        </Link>
                      </td>
                      <td>{property.property_name}</td>
                      <td> ${property.total_cost}</td>
                      
                    </TableRow>
                  ))}
                </Table>
                    <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                      alignItems: "center",
                      paddingTop: "2%",
                    }}
                  >
                    <SearchButton
                      onClick={handleTotalClickPrevious}
                      disabled={totalCurrentPage === 1}
                    >
                      Previous
                    </SearchButton>
                    <span
                      style={{ fontSize: "1.2rem" }}
                    >{`Page ${totalCurrentPage} of ${totalCurrentPageCount}`}</span>
                    <SearchButton
                      onClick={handleTotalClickNext}
                      disabled={totalCurrentPage === totalCurrentPage}
                    >
                      Next
                    </SearchButton>
                  </div>
                  </div>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>No fees collected yet.</h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>
       
        
      </div>
      <div className="container flex flex-col items-center px-24 pb-16">
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Finance History 🏦"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Transaction</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Transaction?"
                    description="Add the information associated to the transaction to add it to your account."
                  >
                    <AddOperationForm 
                    propertyList={properties}
                    onClick={handleSubmit}
                    />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              {operations.length > 0 ? (
                <div>
                <Table>
                  <TableHeader>
                    <th>Property</th>
                    <th>Operation Type</th>
                    <th>Cost</th>
                    <th>Date</th>
                    <th></th>
                   
                  </TableHeader>
                  {visibleOperations.map((operation, index) => (
                    <TableRow key={index}>
                      <td>{operation.property_name}</td>
                      <td>{operation.type}</td>
                      <td>${operation.cost}</td>
                      <td>{operation.date.substring(0,10)}</td>
                      <td>
                      <Modal>
                        <ModalToggler>
                          <EditButton>Edit</EditButton>
                        </ModalToggler>
                        <ModalContent
                          title="Edit Transaction "
                          description="Edit the information associated with the operation. We will generate the rest for you!"
                          onExit={() => console.log("exit")}
                        >
                          <EditOperationForm
                            operation={operation} // CHANGE PROPERTY TO THE OPERATION
                            type={operation.type}
                            propertyList={properties}
                          />
                        </ModalContent>
                      </Modal>
                      </td>
                    </TableRow>
                  ))}
                </Table>
                   <div
                   style={{
                     display: "flex",
                     justifyContent: "center",
                     gap: "1rem",
                     alignItems: "center",
                     paddingTop: "2%",
                   }}
                 >
                   <SearchButton
                     onClick={handleClickPrevious}
                     disabled={currentPage === 1}
                   >
                     Previous
                   </SearchButton>
                   <span
                     style={{ fontSize: "1.2rem" }}
                   >{`Page ${currentPage} of ${totalPages}`}</span>
                   <SearchButton
                     onClick={handleClickNext}
                     disabled={currentPage === totalPages}
                   >
                     Next
                   </SearchButton>
                 </div>
                 </div>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>Click on the add operation button to start!</h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>
       
        
      </div>
    </div>
  );
};

export default FinanceHome;

    