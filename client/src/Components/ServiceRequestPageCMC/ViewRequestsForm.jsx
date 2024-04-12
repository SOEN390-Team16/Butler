import React, { useEffect, useState } from "react";
import axios from "axios";
import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import DeleteButton from "../Buttons/DeleteButton.jsx";
import Dropdown from "../Dropdown/Dropdown.jsx";

const ViewRequestsForm = ({ userId }) => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");
  userId = 48;

  const fetchRequests = async () => {
    axios
      .get(`http://hortzcloud.com:3000/api/v1/req?userid=${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((requests) => {
        setRequests(requests.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  };

  useEffect(() => {
    if (requests.length > 0) {
      console.log("all requests:", requests);
    }
  }, [requests]);

  const deleteRequest = (request) => {
    axios
      .delete(`http://hortzcloud.com:3000/api/v1/req/${request.request_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res for deleting request:");
        console.log(res);
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
      });
  };

  const updateRequestStatus = (requestId, newStatus) => {
    // update request status locally
    const updatedRequests = requests.map((req) => {
      if (req.request_id === requestId) {
        return { ...req, status: newStatus };
      }
      return req;
    });
    setRequests(updatedRequests);
    axios
      .patch(
        `http://hortzcloud.com:3000/api/v1/req/${requestId}/status`,
        { status: newStatus },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Updated successfully:", response);
      })
      .catch((error) => {
        console.error("Error updating request status:", error);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, [token, userId]);

  return (
    <TableCard className={"gap-4"}>
      <TableCardHeader title={""}></TableCardHeader>
      <div>
        <Table>
          <TableHeader>
            <th>Request ID</th>
            <th>Request Type</th>
            <th>Request Description</th>
            <th>Request Status</th>
            <th>Edit Status</th>
            <th></th>
          </TableHeader>
          {requests.map((request, index) => (
            <TableRow key={index}>
              <td>{request.request_id}</td>
              <td>{request.type}</td>
              <td>{request.description}</td>
              <td>{request.status}</td>
              <td>
                <Dropdown
                  defaultValue={request.status}
                  options={["Received", "Viewed", "Processed"]}
                  onChange={(e) =>
                    updateRequestStatus(request.request_id, e.target.value)
                  }
                />
              </td>
              <td>
                <DeleteButton onClick={() => deleteRequest(request)}>
                  Delete
                </DeleteButton>
              </td>
            </TableRow>
          ))}
        </Table>
      </div>
    </TableCard>
  );
};

export default ViewRequestsForm;
