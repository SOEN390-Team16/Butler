import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { uploadImage } from "../../utils/cloudinary";
import "./EditAccount.css";
import Modal from "../Modals/Modal.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import ModalToggler from "../Modals/ModalToggler.jsx";
import RegisterUserForm from "./RegisterUserForm.jsx";
import usePublicUserStore from "../../store/user/public-user.store.js";
import { toast } from "react-toastify";

const EditAccount = () => {
  const publicUserStore = usePublicUserStore()
  const entity = publicUserStore.getEntity()
  const [image, setImage] = useState(null);
  const [editProfile, setEditProfileActive] = useState(false);
  const [newProfile, setNewProfile] = useState({
    first_name: entity.first_name ? entity.first_name : "",
    last_name: entity.last_name ? entity.last_name : "",
    email: entity.email ? entity.email : "",
    profile_picture: image,
  });

  const navigate = useNavigate();

  // Function to update email in userData and localStorage
  const handleEmailChange = (e) => {
    setNewProfile((prev) => ({ ...prev, email: e.target.value }));

    handleProfileChange(e);
  };

  // Function to update first name in userData and localStorage
  const handleFirstNameChange = (e) => {
    setNewProfile((prev) => ({ ...prev, first_name: e.target.value }));

    handleProfileChange(e);
  };

  // Function to update last name in userData and localStorage
  const handleLastNameChange = (e) => {
    setNewProfile((prev) => ({ ...prev, last_name: e.target.value }));

    handleProfileChange(e);
  };

  const handleProfileChange = async (e) => {
    setNewProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setNewProfile((prev) => ({ ...prev, profile_picture: reader.result }));
      };
      reader.readAsDataURL(file);
    }

    console.log("Image: ", file);
  };

  // const token = sessionStorage.getItem("token");
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();

    newProfile.userid = entity.userid;
    delete newProfile.profile_picture
    publicUserStore.updatePublicUser(newProfile);

    // Upload image to cloudinary
    uploadImage(newProfile.profile_picture)
      .then((res) => {
        setNewProfile((prev) => ({ ...prev, profile_picture: res }));

        toast.success("Public Profile Updated Successfully!")
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });

    console.log("Form submitted", newProfile);
    console.log("token: ", token);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-start items-center bg-profile-hero bg-cover bg-no-repeat
      bg-center relative"
    >
      {entity.role !== "public_user" && (
        <div className={"absolute top-0 left-0"}>
          <button onClick={() => navigate(-1)}>
            <MdKeyboardDoubleArrowLeft size={40}/>
          </button>
        </div>
      )}
      <div className="flex flex-col flex-grow w-full justify-center">
        <div
          className="flex flex-row bg-white min-w-fit min-h-fit self-center overflow-hidden
          border-none rounded-lg shadow-md"
        >
          <form
            className="flex flex-col px-16 py-8 gap-8 w-full"
            onSubmit={handleSubmit}
          >
            <h2 className="self-center font-inter font-bold text-3xl">
              User Page
            </h2>
            <div className="flex items-center justify-center gap-16">
              {/* Avatar Image */}
              <div
                className="relative rounded-full overflow-hidden w-32 h-32 bg-gray-200 flex
                items-center justify-center"
              >
                {image && (
                  <img
                    src={image}
                    alt="Uploaded"
                    style={{ maxWidth: "100%", objectFit: "cover" }}
                  />
                )}
                {!image && (
                  <>
                    <label htmlFor="imageInput">
                      <p>Upload Image</p>
                    </label>
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </>
                )}
              </div>
              {/* Content of the form */}
              <div className="flex flex-col min-w-[360px]">
                <div className="row justify-content-center">
                  <div className="col-lg-5 col-sm-2 headers">
                    <p>First name: </p>
                    <p>Last name: </p>
                    <p>Email: </p>
                    <p>Current Plan: </p>
                  </div>
                  <div
                    className={`col-lg-5 col-sm-4 information ${
                      !editProfile ? "" : "editable"
                    }`}
                  >
                    {!editProfile ? (
                      <>
                        <p>{newProfile.first_name}</p>
                        <p>{newProfile.last_name}</p>
                        <p>{newProfile.email}</p>
                        <p>{entity.role}</p>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={newProfile.first_name}
                          onChange={handleFirstNameChange}
                          name="first_name"
                        />
                        <input
                          type="text"
                          value={newProfile.last_name}
                          onChange={handleLastNameChange}
                          name="last_name"
                        />
                        <input
                          type="email"
                          value={newProfile.email}
                          onChange={handleEmailChange}
                          name="email"
                        />
                        <p>{entity.role}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 editpage__buttons">
                <button
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={() => setEditProfileActive(!editProfile)}
                >
                  Update Info
                </button>
                <button
                  style={{ color: "white", backgroundColor: "black" }}
                  onClick={() => setEditProfileActive(!editProfile)}
                  type="submit"
                >
                  Done
                </button>
                <Modal>
                  <ModalToggler>
                    <button
                      style={{ backgroundColor: "black", color: "white" }}
                      onClick={() => setEditProfileActive(!editProfile)}
                    >
                      Activate Registration Key
                    </button>
                  </ModalToggler>
                  <ModalContent
                    title={"Account Activation"}
                    description={
                      "Enter the token you have been given by the company to activate your " +
                      "account."
                    }
                  >
                    <RegisterUserForm/>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditAccount;
