import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import Modal from "../Modals/Modal.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import ModalToggler from "../Modals/ModalToggler.jsx";
import RegisterUserForm from "./RegisterUserForm.jsx";
import usePublicUserStore from "../../store/user/public-user.store.js";
import CloudinaryImageService from "../../service/asset/image.service.js";

const EditAccount = () => {
  const publicUserStore = usePublicUserStore();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const entity = publicUserStore.getEntity();
  const [editProfile, setEditProfileActive] = useState(false);
  const [newProfile, setNewProfile] = useState({
    userid: entity.userid ? entity.userid : "",
    first_name: entity.first_name ? entity.first_name : "",
    last_name: entity.last_name ? entity.last_name : "",
    email: entity.email ? entity.email : "",
  });
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setNewProfile((prev) => ({ ...prev, email: e.target.value }));
    if (userData) {
      const updatedUserData = { ...userData, email: e.target.value };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    handleProfileChange(e);
  };

  const handleFirstNameChange = (e) => {
    setNewProfile((prev) => ({ ...prev, first_name: e.target.value }));
    if (userData) {
      const updatedUserData = { ...userData, firstName: e.target.value };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    handleProfileChange(e);
  };

  const handleLastNameChange = (e) => {
    setNewProfile((prev) => ({ ...prev, last_name: e.target.value }));
    if (userData) {
      const updatedUserData = { ...userData, lastName: e.target.value };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    handleProfileChange(e);
  };

  const handleProfileChange = async (e) => {
    setNewProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    let url;
    if (!file) return;

    const loadingToast = toast.loading("Saving image...");
    try {
      const response = await CloudinaryImageService.uploadImage(file);
      url = response.data.url;
    } catch (err) {
      toast.dismiss(loadingToast);
      console.log(err);
      return;
    }

    if (url) {
      const publicUser = publicUserStore.getEntity();
      await publicUserStore.updatePublicUser({
        ...publicUser,
        profile_picture: url,
      });
    }
    toast.dismiss(loadingToast);
    toast.success("Profile picture updated successfully", { autoClose: 500 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await publicUserStore.updatePublicUser(newProfile);
    if (status) {
      toast.success("Account updated successfully", { autoClose: 500 });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-profile-hero bg-cover bg-no-repeat bg-center relative">
      {entity.role !== "public_user" && (
        <div className="absolute top-0 left-0">
          <button onClick={() => navigate(-1)}>
            <MdKeyboardDoubleArrowLeft size={40} />
          </button>
        </div>
      )}
      <div className="flex flex-col w-full max-w-md justify-center items-center rounded-lg shadow-md bg-white">
        <form
          className="flex flex-col px-8 py-6 gap-4 w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="self-center font-inter font-bold text-3xl">
            User Page
          </h2>
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Avatar Image */}
            <div className="relative rounded-full overflow-hidden w-32 h-32 bg-gray-200 flex items-center justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}>
              {publicUserStore.getEntity().profile_picture ? (
                <>
                  <img
                    src={publicUserStore.getEntity().profile_picture}
                    alt="Uploaded"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <label
                    htmlFor="imageInput"
                    className={`absolute inset-0 z-10 flex items-center justify-center cursor-pointer ${
                      isHovering ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transition: 'opacity 0.3s' }}
                  >
                    <p className="text-white text-center bg-black bg-opacity-50 px-2 py-1 rounded">Upload Image</p>
                  </label>
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              ) : (
                <>
                  <label
                    htmlFor="imageInput"
                    className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer">
                    <p className="text-white text-center bg-black bg-opacity-50 px-2 py-1 rounded">Upload Image</p>
                  </label>
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              )}
            </div>
            {/* Content of the form */}
            <div className="flex flex-col min-w-[360px]">
              <div className="flex justify-between">
                <p className="font-bold">First name:</p>
                {!editProfile ? (
                  <p>{newProfile.first_name}</p>
                ) : (
                  <input
                    type="text"
                    value={newProfile.first_name}
                    onChange={handleFirstNameChange}
                    name="first_name"
                    className="border rounded p-1"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Last name:</p>
                {!editProfile ? (
                  <p>{newProfile.last_name}</p>
                ) : (
                  <input
                    type="text"
                    value={newProfile.last_name}
                    onChange={handleLastNameChange}
                    name="last_name"
                    className="border rounded p-1"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Email:</p>
                {!editProfile ? (
                  <p>{newProfile.email}</p>
                ) : (
                  <input
                    type="email"
                    value={newProfile.email}
                    onChange={handleEmailChange}
                    name="email"
                    className="border rounded p-1"
                  />
                )}
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Current Plan:</p>
                <p>{entity.role}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={() => setEditProfileActive(!editProfile)}
            >
              {editProfile ? "Cancel" : "Edit Profile"}
            </button>
            {editProfile && (
              <button
                className="bg-black text-white px-4 py-2 rounded"
                type="submit"
              >
                Done
              </button>
            )}
            <Modal>
              <ModalToggler>
                <button className="bg-black text-white px-4 py-2 rounded">
                  Activate Registration Key
                </button>
              </ModalToggler>
              <ModalContent
                title="Account Activation"
                description="Enter the token you have been given by the company to activate your account."
              >
                <RegisterUserForm />
              </ModalContent>
            </Modal>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;


