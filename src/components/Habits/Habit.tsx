import styled from "styled-components";
import HabitView from "./HabitView";
import FriendActivity from "./Shared/FriendActivity";
import { useSelector } from "react-redux";

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  overflow: hidden;
  background-color: #1f3227;
  margin: 0;
  padding: 10px;
  justify-content: center;
  height: 100vh;
`;

const HabitContentWrapper = styled.section`
  border-radius: 10px;

  @media (max-width: 900px) {
    height: 100%;
    padding: 0px 20px 0px 20px;
  }

  @media (max-height: 700px) {
    height: 90%;
    padding: 0px 20px 0px 20px;
  }
`;

function Habit() {
  const friendActivityVisible = useSelector(
    (state: any) => state.friendActivityVisible
  );
  return (
    <Wrapper>
      <HabitContentWrapper>
        <HabitView />
      </HabitContentWrapper>
      {friendActivityVisible && <FriendActivity />}
    </Wrapper>
  );
}

export default Habit;
