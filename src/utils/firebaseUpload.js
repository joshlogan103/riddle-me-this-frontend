// src/utils/firebaseUpload.js
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "../services/serviceRoutes/userServices";

const uploadProfileImage = async (file, userId) => {
  try {
    const storageRef = ref(storage, `profile_pictures/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Update profile picture URL in the backend
    const response = await updateProfile({ profile_pic: downloadURL });
    if (response.status === 200) {
      console.log('Profile picture updated successfully');
    }
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};

export default uploadProfileImage;
