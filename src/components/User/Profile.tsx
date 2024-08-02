import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../Habits/Reducers";
import Loading from "../Shared/Loading";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #121212;
  color: #ffffff;
  min-height: 100vh;
  padding: 40px 20px;
`;

const BackButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    color: #1db954;
  }
`;

const ProfileCard = styled.div`
  background: #282828;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProfileTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
`;

const ProfileDetail = styled.p`
  font-size: 18px;
  margin: 5px 0;
`;

const StatWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const StatBox = styled.div`
  text-align: center;
`;

const StatNumber = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const StatLabel = styled.p`
  font-size: 16px;
  color: #b3b3b3;
  margin: 0;
`;

const Button = styled.button`
  background-color: #1db954;
  color: #ffffff;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #14833b;
  }
`;

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>();
  const { data, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    data && data.user && setUser(data);
  }, [data]);

  const navigate = useNavigate();
  const DemoUser = {
    firstname: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150", // Replace with actual profile picture URL
    numberOfFriends: 4,
    numberOfHabits: 6,
  };

  return (
    <ProfileWrapper>
      <BackButton onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </BackButton>
      <ProfileCard>
        <ProfilePicture src={DemoUser.profilePicture} alt="Profile Picture" />
        <ProfileTitle>{user?.user.name}</ProfileTitle>
        <ProfileDetail>{DemoUser.email}</ProfileDetail>
        <StatWrapper>
          <StatBox>
            <StatNumber>{DemoUser.numberOfFriends}</StatNumber>
            <StatLabel>Friends</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>{user?.habits.length}</StatNumber>
            <StatLabel>Habits</StatLabel>
          </StatBox>
        </StatWrapper>
        <Button>Edit Profile</Button>
      </ProfileCard>
    </ProfileWrapper>
  );
};

export default Profile;
