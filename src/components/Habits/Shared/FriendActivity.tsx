import styled from "styled-components";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleFriendActivity } from "../Actions/actions";

const ActivityContainer = styled.div`
  width: 15vw;
  min-width: 250px;
  padding: 20px;
  background-color: #121212;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #1db954; /* Spotify Green */
  }
`;

const FriendCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #181818;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FriendName = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const LastActive = styled.span`
  font-size: 0.8rem;
  color: #b3b3b3;
`;

const ScoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ScoreUp = styled.span`
  color: green;
`;

const ScoreDown = styled.span`
  color: red;
`;

const FriendActivity = ({}) => {
  const dispatch = useDispatch();

  const friends = [
    {
      id: 1,
      name: "David Goggins",
      lastActive: "2 hr",
      scoreUp: 5,
      scoreDown: 3,
    },
    {
      id: 2,
      name: "Chet",
      lastActive: "13 hr",
      scoreUp: 2,
      scoreDown: 6,
    },
    {
      id: 3,
      name: "Naval",
      lastActive: "5 hr",
      scoreUp: 4,
      scoreDown: 1,
    },
  ];

  return (
    <ActivityContainer>
      <Header>
        <Title>Friend Activity</Title>
        <ButtonContainer>
          <IconButton>
            <FaPlus />
          </IconButton>
          <IconButton onClick={() => dispatch(toggleFriendActivity())}>
            <FaTimes />
          </IconButton>
        </ButtonContainer>
      </Header>
      {friends.map((friend) => (
        <FriendCard key={friend.id}>
          <FriendInfo>
            <FriendName>{friend.name}</FriendName>
            <LastActive>{friend.lastActive}</LastActive>
          </FriendInfo>
          <ScoreInfo>
            <ScoreUp>+{friend.scoreUp}</ScoreUp>
            <ScoreDown>-{friend.scoreDown}</ScoreDown>
          </ScoreInfo>
        </FriendCard>
      ))}
    </ActivityContainer>
  );
};

export default FriendActivity;
