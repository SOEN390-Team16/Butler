import { useEffect, useState } from "react";
import "./DashBoardHome.css";
import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import { Link } from "react-router-dom";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import { GoPerson } from "react-icons/go";
import ModalToggler from "../Modals/ModalToggler.jsx";
import AddButton from "../Buttons/AddButton.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";
import axios from "axios";
import EditEmployeeForm from "./EditEmployeeForm.jsx";
import CreateEmployeeForm from "./CreateEmployeeForm.jsx";
import DeleteButton from "../Buttons/DeleteButton.jsx";
import EditButton from "../Buttons/EditButton.jsx";
import { toast } from "react-toastify";
import ConfirmButton from "../Buttons/ConfirmButton.jsx";

export default function EmployeeSection() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");
  const [properties, setProperties] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchProperties = () => {
      axios
        .get("http://hortzcloud.com:3000/api/v1/pp", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          res.data.filter((property) => property.companyid === userData.cmcId);
          setProperties(res.data);
        })
        .catch((err) => {
          console.error("Error fetching properties:", err);
        });
    };
    fetchProperties();
  }, [token]);

  // CHange this to localhost later
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/emp", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEmployees(res.data);
        // toast.success('Employees set successfully');
      })
      .catch((err) => {
        toast.error(`Something went wrong: ${err.message}`);
        throw err;
      });
  }, []);
  // console.log(employees)

  const onDelete = async (e, emp) => {
    e.preventDefault();
    console.log(emp);
    await axios
      .delete(`http://localhost:3000/api/v1/emp/${emp.employeeid}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Successfully deleted.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Couldn't delete the employee.");
      });
    // toggle();
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full"
      style={{ paddingTop: 48, paddingBottom: 0 }}
    >
      {/* Properties card goes here */}
      <TableCard className={"gap-4"}>
        <TableCardHeader title={"My Employees"}>
          <div className="flex items-center gap-4">
            {/* See more button should appear when a certain threshold is exceeded */}
            <Link className="underline" to={""}>
              See more
            </Link>

            {/* This is the modal that display once a button is interacted with */}
            <Modal>
              <ModalToggler>
                <AddButton>Add Employee</AddButton>
              </ModalToggler>
              <ModalContent
                title="Create an employee role."
                description="Add the information associated with the employee. We will generate the rest for you!"
                onExit={() => console.log("exit")}
              >
                <CreateEmployeeForm propertyList={properties} />
              </ModalContent>
            </Modal>
          </div>
        </TableCardHeader>
        {/* Body of properties card */}
        <div>
          <Table>
            <TableHeader>
              <th></th>
              <th>Employee Name</th>
              <th>Property</th>
              <th>Role</th>
              <th></th>
              <th></th>
            </TableHeader>
            {/* <TableRow> */}
            {employees &&
              employees.map((emp) => {
                return (
                  <TableRow key={emp.employee_id}>
                    <td>
                      <GoPerson size={24} />
                    </td>
                    <td>
                      {emp.first_name} {emp.last_name}
                    </td>
                    <td>{emp.property_id}</td>
                    <td>{emp.role}</td>
                    <td>
                      <Modal>
                        <ModalToggler>
                          <EditButton>Edit</EditButton>
                        </ModalToggler>
                        <ModalContent
                          title="Edit employee "
                          description="Edit the information associated with the employee. We will generate the rest for you!"
                          onExit={() => console.log("exit")}
                        >
                          <EditEmployeeForm
                            employee={emp}
                            propertyList={properties}
                          />
                        </ModalContent>
                      </Modal>
                    </td>
                    <td>
                      <Modal>
                        <ModalToggler>
                          <DeleteButton>Delete</DeleteButton>
                        </ModalToggler>
                        <ModalContent
                          title="Are you sure you want to delete this employee. "
                          onExit={() => console.log("exit")}
                        >
                          <ConfirmButton
                            to="/DashboardCMC"
                            onClick={(e) => {
                              onDelete(e, emp);
                            }}
                          >
                            Confirm
                          </ConfirmButton>
                        </ModalContent>
                      </Modal>
                    </td>
                  </TableRow>
                );
              })}
          </Table>
        </div>
      </TableCard>
    </div>
  );
}
