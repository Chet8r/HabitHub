import styled from "styled-components";

// Common styles
const buttonStyles = `
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
`;

// Wrapper section
export const Wrapper = styled.section`
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-family: "Roboto", sans-serif;
`;

// Checkmark component
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

// Action buttons container
export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
`;

// Content wrapper
const contentPadding = "30px";

export const ContentWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  background-color: #fff;
  padding: ${contentPadding};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

// Header section
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Table component
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

// Table header cell
export const Th = styled.th`
  background-color: #163020;
  color: #fff;
  font-weight: 500;
  padding: 12px;
  text-align: left;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

// Table data cell
export const Td = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

// Table row
export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

// Habit actions cell
export const HabitActions = styled.td`
  .action-button {
    width: 40px;
    background-color: #d8d8d8;
    color: #3c4043;
    ${buttonStyles}
    padding: 8px 12px;

    &:first-child {
      margin-right: 4px;
    }

    &:hover {
      background-color: #e7e7e7;
    }
  }
`;

// New habit section
export const NewHabitSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  button {
    margin-left: 10px;
    background-color: green;
    color: #ffffff;
    ${buttonStyles}
    padding: 10px 16px;

    &:hover {
      background-color: #01a501;
    }
  }

  .editBtn {
    background-color: orange;

    &:hover {
      background-color: #ffb803 !important;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;

    button {
      margin-left: 0;
      margin-top: 10px;
    }
  }
`;

// Delete button
export const DeleteButton = styled.button`
  background-color: #ce3c3c;
  color: white;
  ${buttonStyles}
  padding: 8px 24px;

  &:hover {
    background-color: #ff6666;
  }
`;

// Toggle button
export const ToggleButton = styled.button`
  background-color: #007bff;
  color: white;
  ${buttonStyles}
  padding: 8px 12px;

  &:hover {
    background-color: #0056b3;
  }
`;
