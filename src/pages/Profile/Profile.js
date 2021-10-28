import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectUser } from "../../features/userSlice";
import { db } from "../../firebaseConfig";
import {
  checkUserName,
  updateUser,
} from "../../services/authenticationRequests";
import "./Profile.css";

const Profile = () => {
  const currentUser = useSelector(selectUser);
  const fileRef = useRef();

  const [error, setError] = useState("");
  const [file, setFile] = useState();
  const [imgURL, setImgURL] = useState("");
  const [savedChanges, setSavedChanges] = useState(
    "*Your changes are not saved!"
  );

  // const sampleUserData = {
  //   userName: "testuser",
  //   email: "test@user.com",
  //   photoURL: "",
  //   displayName: "Test User",
  //   status: "",
  //   description: "",
  // };

  const [userData, setUserData] = useState();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const { id } = useParams();

  // image upload & rendering
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImgURL(e.target.result);
      };
      reader.readAsDataURL(file);

      return () => {
        setFile(null);
      };
    }
  }, [file]);

  useEffect(async () => {
    if (id === currentUser?.userName) {
      setUserData(currentUser);
      setShowUpdateForm(true);
    } else {
      setShowUpdateForm(false);
      let value = await checkUserName(id);
      if (!value) {
        try {
          const userRef = db.collection("users").doc(id);
          userRef.get().then((doc) => {
            setUserData({ ...doc.data(), userName: doc.id, photoURL: imgURL });
          });
        } catch (err) {
          console.error(err);
          setError(err);
        }
      } else {
        setError("User not found!");
      }
    }
  }, [id, currentUser]);

  const updateUserProfile = async (e) => {
    e.preventDefault();

    const message = await updateUser(userData);
    console.log(message);
    setSavedChanges(message);
  };

  return (
    <div className="profile">
      {error && <h2>{error}</h2>}

      {userData && (
        <div>
          <div className="userCard">
            <img src={imgURL ? imgURL : "/assets/guestuser.svg"} alt="" />
            <div className="userItem">
              <h3>User Name -</h3>
              <h2>{userData?.userName}</h2>
            </div>
            <div className="userItem">
              <h3>Email -</h3>
              <h2>{userData?.email}</h2>
            </div>
          </div>
          <div className="container">
            <div className="profileCard">
              <div>
                {userData?.photoURL && (
                  <img src={userData?.photoURL} alt="Profile Photo" />
                )}
              </div>
              <div>
                <h3>Name</h3>
                <span>{userData?.displayName}</span>
              </div>
              <div>
                <h3>Status</h3>
                <span>
                  {userData?.status ? userData?.status : "!*Not Found*!"}
                </span>
              </div>
              <div>
                <h3>Description</h3>
                <span>
                  {userData?.description
                    ? userData?.description
                    : "!*Not Found*!"}
                </span>
              </div>
            </div>
            {showUpdateForm && (
              <div className="profileFormCard">
                {userData && (
                  <form
                    className="profileForm"
                    onSubmit={(e) => updateUserProfile(e)}
                  >
                    <label>
                      Full Name
                      <input
                        type="text"
                        value={userData?.displayName}
                        placeholder="Full Name"
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            displayName: e.target.value,
                          });
                        }}
                      />
                    </label>
                    <label>
                      Status
                      <input
                        type="text"
                        value={userData?.status}
                        placeholder="Status"
                        onChange={(e) => {
                          setUserData({ ...userData, status: e.target.value });
                        }}
                      />
                    </label>
                    <label>
                      Description
                      <input
                        type="text"
                        value={userData?.description}
                        placeholder="Description"
                        onChange={(e) => {
                          setUserData({
                            ...userData,
                            description: e.target.value,
                          });
                        }}
                      />
                    </label>
                    <label
                      className="uploadImage"
                      onClick={() => fileRef.current.click()}
                    >
                      Upload Image
                    </label>
                    {savedChanges && (
                      <p className="saveChangesText">{savedChanges}</p>
                    )}
                    <input
                      className="saveChangesButton"
                      type="submit"
                      value="Save Changes"
                    />
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <Fragment>
        <input
          type="file"
          accept=".png, .jpeg, .jpg"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />
      </Fragment>
    </div>
  );
};

export default Profile;
