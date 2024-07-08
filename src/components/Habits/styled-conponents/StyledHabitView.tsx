import styled from "styled-components";

export const Wrapper = styled.section`
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-family: "Roboto", sans-serif;
`;

export const CheckMark = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: green;
  border-radius: 50%;
  color: white;
  font-size: 16px;
  margin: 4px;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
`;

export const ContentWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// const TitleContainer = styled.div`
//   flex: 1; /* Take as much space as possible */
// `;

// const Title = styled.h1`
//   margin: 0;
// `;

// const EyeIcon = styled.div`
//   font-size: 1.2em;
// `;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const Th = styled.th`
  background-color: #163020;
  color: #fff;
  font-weight: 500;
  padding: 12px;
  text-align: left;
`;

export const Td = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const HabitActions = styled.td`
  .action-button {
    width: 40px;
    background-color: #d8d8d8;
    border: none;
    color: #3c4043;
    cursor: pointer;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 4px;
    font-family: "Roboto", sans-serif;
  }

  .action-button:first-child {
    margin-right: 4px;
  }

  .action-button:hover {
    background-color: #e7e7e7;
  }
`;

export const NewHabitSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  button {
    margin-left: 10px;
    background-color: green;
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
    padding: 10px 16px;
    border-radius: 4px;
    font-family: "Roboto", sans-serif;
  }

  button:hover {
    background-color: #01a501;
  }

  .editBtn {
    background-color: orange;
  }

  .editBtn:hover {
    background-color: #ffb803 !important;
  }
`;

export const DeleteButton = styled.button`
  background-color: #ce3c3c;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 24px;
  border-radius: 4px;

  &:hover {
    background-color: #ff6666;
  }
`;

export const ToggleButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;
