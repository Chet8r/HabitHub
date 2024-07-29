import styled from "styled-components";

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 20px 0; */
  width: 100%;
`;

const Bar = styled.div`
  display: flex;
  min-width: 0px;
  width: 100%;
  height: 10px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 600px) {
    height: 5px;
    /* width: 30px; */
    /* border-radius: 20px; */
  }
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color || "#444"};
  border-right: 1px solid #222;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 600px) {
    border-right: 0px solid #222;
  }
`;

const ScoreText = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ScoreBar = ({ score }: any) => {
  const boxes = Array.from({ length: 10 }, (_, index) => {
    let color = "#444";
    if (score > 0 && index >= 5 && index < 5 + score) color = "darkgreen";
    if (score < 0 && index < 5 && index >= 5 + score) color = "darkred";

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
