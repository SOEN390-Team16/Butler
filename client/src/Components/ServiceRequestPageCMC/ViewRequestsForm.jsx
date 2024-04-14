import { useEffect, useState } from "react";
import axios from "axios";
import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import Dropdown from "../Dropdown/Dropdown.jsx";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ViewRequestsForm = ({ userId, onStatusChange }) => {
  const [request, setRequest] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRequestById = async () => {
    console.log("request id in the form: ", userId);
    axios
      .get(`http://hortzcloud.com:3000/api/v1/req?reqid=${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((req) => {
        setRequest(req.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching request:", error);
      });
  };

  useEffect(() => {
    fetchRequestById();
  }, [token, userId]);

  const updateRequestStatus = (requestId, newStatus) => {
    // Update request status locally
    const updatedRequest = { ...request, status: newStatus };
    setRequest(updatedRequest);

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
      .then(() => {
        toast.success("Request status updated successfully!");
        // call the callback function to update the parent component
        onStatusChange(requestId, newStatus);
      })
      .catch((error) => {
        console.error("Error updating request status:", error);
      });
  };

  return (
    <TableCard className={"gap-4"}>
      <TableCardHeader title={""}></TableCardHeader>
      <div>
        <Table>
          <TableHeader>
            <th>Request Description</th>
            <th>Set Status</th>
          </TableHeader>
          <TableRow>
            <td>{request.description}</td>
            <td>
              <Dropdown
                value={request.status}
                options={["Received", "Viewed", "Processed"]}
                onChange={(e) =>
                  updateRequestStatus(request.request_id, e.target.value)
                }
              />
            </td>
          </TableRow>
        </Table>
      </div>
    </TableCard>
  );
};

ViewRequestsForm.propTypes = {
  userId: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default ViewRequestsForm;
