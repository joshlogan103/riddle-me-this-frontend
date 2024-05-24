import { Avatar, Flex, Separator, Tabs, Text } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { getProfile, updateProfile } from "../../services/serviceRoutes/userServices";
import ProfileInstancesList from "../../components/ProfileInstancesList/ProfileInstancesList";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Loading from "../../components/Loading/Loading";
import uploadProfileImage from "../../utils/firebaseUpload";

const MyProfile = () => {
  const [pastHunts, setPastHunts] = useState(null);
  const [upcomingHunts, setUpcomingHunts] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    console.log("upload this file", selectedFile);
    try {
      const downloadURL = await uploadProfileImage(selectedFile);
      setUserData((prevUserData) => ({
        ...prevUserData,
        profile_pic: downloadURL,
      }));
      await updateProfile({ profile_pic: downloadURL });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const filterParticipations = (participations) => {
    const upcoming = participations.filter((item) => {
      return new Date(item.hunt_instance.end_time) > new Date();
    });
    const past = participations.filter((item) => {
      return new Date(item.hunt_instance.end_time) < new Date();
    });
    setPastHunts(past);
    setUpcomingHunts(upcoming);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getProfile();
        if (response.status === 200) {
          console.log(response);
          setUserData(response.data.profile[0]);
          setLoading(false);
          filterParticipations(response.data.participations);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex direction="column" className="" align="center">
      <div style={{ position: "relative" }}>
        <Avatar src={userData?.profile_pic} fallback={userData?.user.username.charAt() || "U"} size="8" radius="full" m="6" />
        <Pencil2Icon
          onClick={handleIconClick}
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            height: "20px",
            width: "20px",
            padding: "10px",
          }}
        />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
      </div>
      <Text size="6">{userData?.user.username || "Username"}</Text>
      <Separator orientation="horizontal" m="7" style={{ width: "80%" }} />
      <Tabs.Root defaultValue="upcoming">
        <Flex direction="column" align="center">
          <Tabs.List>
            <Tabs.Trigger value="upcoming">Upcoming Games</Tabs.Trigger>
            <Tabs.Trigger value="previous">Previous Games</Tabs.Trigger>
          </Tabs.List>
        </Flex>
        <Tabs.Content value="upcoming">
          <ProfileInstancesList participations={upcomingHunts} />
        </Tabs.Content>
        <Tabs.Content value="previous">
          <ProfileInstancesList participations={pastHunts} />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};

export default MyProfile;
