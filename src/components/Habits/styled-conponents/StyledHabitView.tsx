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
  /* width: 100%; */
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 10px; */
  font-family: "Roboto", sans-serif;
`;

export const EnableScroll = styled.section`
  /* max-height: 425px;
  overflow-y: scroll; */
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

  .action-button.highlight-red {
    background-color: darkred;
    color: white;
    &:hover {
      background-color: red !important;
    }
  }

  .action-button.highlight-green {
    background-color: darkgreen;
    color: white;
    &:hover {
      background-color: green !important;
    }
  }
`;

// Content wrapper
const contentPadding = "30px";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60vw;
  max-width: 800px;

  background-color: #fff;
  padding: ${contentPadding};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: px auto;

  @media (max-width: 900px) {
    padding: auto;
    width: 100%;
  }
`;

// Header section
export const Header = styled.header`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: medium;
  }
`;

// Table component
export const Table = styled.table`
  /* margin-right: 20px; */
  width: auto;
  border-collapse: collapse;

  @media (max-width: 900px) {
    font-size: 10px;
  }
`;

// Table header cell
export const Th = styled.th`
  background-color: #163020;
  color: #fff;
  font-weight: 600;
  padding: 12px;
  text-align: left;

  @media (max-width: 900px) {
    padding: 10px;
  }
`;

// Table data cell
export const Td = styled.td`
  width: 8vw;
  padding: 12px; //Table sizing
  text-align: left;
  border-bottom: 1px solid #ddd;

  @media (max-width: 900px) {
    padding: 8px;
    min-width: 0px !important;
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
  padding: 10px;
  display: flex;
  align-items: center;

  justify-content: space-between;
  background-color: #ffffff;

  button {
    /* margin-left: 10px; */
    background-color: green;
    color: #ffffff;
    ${buttonStyles}
    padding: 10px 16px;

    &:hover {
      background-color: #01a501;
    }
  }

  .RestBtn {
    background-color: darkred;
    &:hover {
      background-color: red !important;
    }
  }

  .editBtn {
    background-color: orange;

    &:hover {
      background-color: #ffb803 !important;
    }
  }

  @media (max-width: 900px) {
    justify-content: space-evenly;

    button {
      margin-left: 0;
      margin-top: auto;
    }
  }
`;

// Delete button
export const DeleteButton = styled.button`
  background-color: darkred;
  color: white;
  ${buttonStyles}
  padding: 8px 24px;

  &:hover {
    background-color: red;
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

export const HabitRouteWrapper = styled.section`
  display: flex;
  gap: 6px;
  justify-content: center;
  overflow: hidden;
  background-color: #1f3227;
  margin: 0;
  padding: 10px;
  height: 100vh;
`;

export const HabitContentWrapper = styled.section`
  width: 100%;
  @media (max-width: 900px) {
    height: 90%;
    padding: 0px 20px 0px 20px;
  }
`;

export const HabitFriendWrapper = styled.section`
  display: flex;
  justify-content: end;
  flex: 3;
`;
