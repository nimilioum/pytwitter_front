import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile, updateProfilePic } from "../../store/user/userActions";
import { selectCurrentUser, selectUpdatingProfile } from "../../store/user/userSelector";
import TextButton from "../Button/TextButton/TextButton";
import Input from "../Input/Input";
import Textarea from "../Input/Textarea";
import SimpleSpinner from "../Loader/SimpleSpinner";
import RootModel from "./../../models/RootModel/RootModel";


export default function EditProfile() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let user = selectCurrentUser(state);
  const updatingProfile = selectUpdatingProfile(state)
  const [username, setUsername] = useState(user.username ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [profilePic, setProfilePic] = useState(user.avatar);
  const navigate = useNavigate();
  const handelProfilePicChange = (e) => {
    try {
      const [file] = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = ()=>{
        setProfilePic(reader.result) 
      }
    } catch (error) {
      alert(error.message);
    }
  };
  // const handelpbcPicChange = (e) => {
  //   try {
  //     const [file] = e.target.files;
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file)
  //     reader.onload = ()=>{
  //       setBcPic(reader.result) 
  //     }
     
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };
  const handelFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(bio, username))
    dispatch(updateProfilePic(profilePic))
    // dispatch update profile func
  };
  return (
    <RootModel hideHeader className="edit-profile-model">
      <form method="post" id="profileEditForm" onSubmit={handelFormSubmit}>
      {updatingProfile && <SimpleSpinner/>}
        <div className="edit-profile-header">
          <div className="model-close-btn" onClick={() => navigate(-1)}>
            <i className="far fa-times"></i>
          </div>
          <div className="edit-profile-text-container">
            <span className="edit-profile-text">Edit profile</span>
          </div>
          <div className="edit-profile-btn-container">
            <TextButton
              cBlue
              rounded
              disabled={!bio || !username}
              type="submit"
            >
              Save
            </TextButton>
          </div>
        </div>

        <div className="pic-bc-container">
          <div className="profile-pic">
            <input
              type="file"
              accept="image/*"
              alt="profile pic"
              id="profilePic"
              name="profilePic"
              hidden
              multiple={false}
              onChange={handelProfilePicChange}
            ></input>
            <span
              className="edit-icon"
              onClick={() => document.getElementById("profilePic").click()}
            >
              <i className="far fa-camera"></i>
            </span>
            <img src={profilePic} alt="user-profile-pic" />
          </div>
        </div>
        <div className="user-details-inputs">
          <Input
            placeholder="username"
            className="user-input"
            onChange={(e) => setUsername(e.target.value)}
            focused={username}
            value={username}
            name='fullName'
          />
          <Textarea
            placeholder="Bio"
            className="user-input"
            rows={3}
            onChange={(e) => setBio(e.target.value)}
            focused={bio}
            value={bio}
            name='bio'
          />
        </div>
      </form>
    </RootModel>
  );
}
