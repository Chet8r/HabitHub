import styled from "styled-components";

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bar = styled.div`
  display: flex;
  width: 120px;
  height: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    display: none;
  }
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color || "#f0f0f0"};
  border-right: 1px solid #ccc;

  &:last-child {
    border-right: none;
  }
`;

const ScoreText = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
`;

const ScoreBar = ({ score }: any) => {
  const boxes = Array.from({ length: 10 }, (_, index) => {
    let color = "#f0f0f0";
    if (score > 0 && index >= 5 && index < 5 + score) color = "green";
    if (score < 0 && index < 5 && index >= 5 + score) color = "red";

    return <Box key={index} color={color}></Box>;
  });

  return (
    <BarContainer>
      <ScoreText>{score}</ScoreText>
      <Bar>{boxes}</Bar>
    </BarContainer>
  );
};

export default ScoreBar;
