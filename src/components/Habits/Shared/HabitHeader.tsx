import styled from "styled-components";

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px 20px 0px 20px;

  @media (max-width: 900px) {
    ul {
      margin: 0px;
    }
  }
`;

const Ul = styled.ul`
  list-style-type: none;
  padding: 16px;
  background-color: #000000;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
`;

const Li = styled.li`
  color: #eef0e5;
`;

const HabitHeader: React.FC = () => {
  return (
    <Header>
      <Ul>
        <Li>Failing</Li>
        <Li>Progress</Li>
        <Li>Consistency</Li>
        <Li>Habit</Li>
      </Ul>
    </Header>
  );
};

export default HabitHeader;
