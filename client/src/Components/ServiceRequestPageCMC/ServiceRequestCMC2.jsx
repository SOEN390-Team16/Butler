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
import DeleteButton from "../Buttons/DeleteButton.jsx";
import { toast } from "react-toastify";
import ViewRequestsForm from "./ViewRequestsForm.jsx";

const ServiceRequestCMC2 = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage, setRequestsPerPage] = useState(10);
  const token = localStorage.getItem("token");

  const getAllRequests = () => {
    axios
      .get(`http://hortzcloud.com:3000/api/v1/req`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  };

  useEffect(() => {
    getAllRequests();
  }, [token]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Calculate the currently displayed requests
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = requests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // change number of rows per page
  const handleRowsChange = (event) => {
    setRequestsPerPage(Number(event.target.value));
    setCurrentPage(1); // reset to the first page to avoid index range issues
  };

  const deleteRequest = (request) => {
    axios
      .delete(`http://hortzcloud.com:3000/api/v1/req/${request.request_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.filter((item) => item.request_id !== request.request_id)
        );
        toast.success("Request deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
      });
  };

  const handleStatusChange = (requestId, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.request_id === requestId ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div className="dashboard__home">
      <IconButton
        onClick={toggleDrawer}
        icon={<RxHamburgerMenu />}
        className="fixed top-10 shadow z-50"
        backgroundColor={"#FFFFFF"}
        rounded={"0 10px 10px 0"}
        _hover={{ backgroundColor: "#CCCCCC" }}
      />
      <SideNavCMC isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <div className="container flex flex-col items-center px-24 pb-16">
        <div className="flex flex-col justify-center items-center w-full">
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"User Service Requests"} />
            <Table>
              <TableHeader>
                <th>User ID</th>
                <th>Request Type</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </TableHeader>
              {currentRequests.map((request, index) => (
                <TableRow key={index}>
                  <td>{request.user_id}</td>
                  <td>{request.type}</td>
                  <td>{request.status}</td>
                  <td>
                    <Modal>
                      <ModalToggler>
                        <RegisterButton>View Details</RegisterButton>
                      </ModalToggler>
                      <ModalContent
                        title=""
                        description=""
                        onExit={() => console.log("exit")}
                      >
                        <ViewRequestsForm
                          userId={request.request_id}
                          onStatusChange={handleStatusChange}
                        />
                      </ModalContent>
                    </Modal>
                  </td>
                  <td>
                    <DeleteButton onClick={() => deleteRequest(request)}>
                      Delete
                    </DeleteButton>
                  </td>
                </TableRow>
              ))}
            </Table>
            <div className="flex justify-between items-center p-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Previous
              </button>
              <span>{`Showing ${indexOfFirstRequest + 1} to ${indexOfLastRequest > requests.length ? requests.length : indexOfLastRequest} of ${requests.length}`}</span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastRequest >= requests.length}
                className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
            <div className="p-4">
              <label className="pr-2">Rows per page:</label>
              <select
                onChange={handleRowsChange}
                className="p-2 rounded bg-white border border-gray-300"
              >
                <option value="5">5</option>
                <option value="10" selected>
                  10
                </option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </TableCard>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestCMC2;
