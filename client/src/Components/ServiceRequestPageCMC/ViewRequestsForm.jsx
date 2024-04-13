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
  const [request, setRequest] = useState([]);
  const token = localStorage.getItem("token");
  // userId = 48;

  const fetchRequestById = async () => {
    console.log("request id in the form: ", userId);
    axios
      .get(`http://hortzcloud.com:3000/api/v1/req?reqid=${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((req) => {
        setRequest(req.data);
      })
      .catch((error) => {
        console.error("Error fetching request:", error);
      });
  };

  useEffect(() => {
    if (request.length > 0) {
      console.log("request:", request);
    }
  }, [request]);

  useEffect(() => {
    fetchRequestById();
  }, [token, userId]);

  return (
    <TableCard className={"gap-4"}>
      <TableCardHeader title={""}></TableCardHeader>
      <div>
        <Table>
          <TableHeader>
            <th>Request Description</th>
          </TableHeader>
          <TableRow>
            <td>{request.description}</td>
          </TableRow>
        </Table>
      </div>
    </TableCard>
  );
};

export default ViewRequestsForm;
