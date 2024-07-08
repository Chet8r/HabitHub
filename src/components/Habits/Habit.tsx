import styled from "styled-components";
import HabitView from "./HabitView";

const Wrapper = styled.section`
  background-color: #163020;
  color: white;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  height: 92vh;
`;

const ContentWrapper = styled.section`
  width: 90%;
  max-width: 800px;
  background-color: #0e1e15;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Ul = styled.ul`
  list-style-type: none;
  padding: 16px;
  background-color: #163020;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Li = styled.li`
  color: #eef0e5;
`;

function Habit() {
  return (
    <Wrapper>
      <ContentWrapper>
        <Header>
          <Ul>
            <Li>Initiation</Li>
            <Li>Progress</Li>
            <Li>Consistency</Li>
            <Li>Habit</Li>
          </Ul>
        </Header>
        <HabitView />
      </ContentWrapper>
    </Wrapper>
  );
}

export default Habit;
