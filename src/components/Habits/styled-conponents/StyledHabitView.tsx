import styled from "styled-components";

// Common styles
const buttonStyles = `
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 20px;
  font-family: "Roboto", sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  margin: 5px;
`;

// Wrapper section
export const Wrapper = styled.section`
  width: 100vw;
  min-height: 100vh;
  background-color: #323232;
  display: flex;
  justify-content: center;
  align-items: start;
  font-family: "Roboto", sans-serif;
  padding: 10px;
  color: #ffffff;

  @media (max-width: 900px) {
    padding: 10px;
  }
`;

// Content wrapper
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 950px;
  padding: 0px 40px 40px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  background-color: #1e1e1e;

  @media (max-width: 450px) {
    border-radius: 10px;
    padding: 10px;
    /* width: auto; */
  }

  @media (max-width: 360px) {
    padding: 10px;
  }
`;

// Header section
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    padding-top: 10px;
    font-size: 1.2em;
    font-weight: bold;
    color: #ffffff;
  }

  @media (max-width: 900px) {
    .title {
      margin: 5px;
      padding-top: 10px;
      font-size: 1.2em;
      font-weight: bold;
      color: #ffffff;
    }
  }

  @media (max-width: 450px) {
    .title {
      padding-top: 0px;
    }
  }
`;

export const TableWrapper = styled.div`
  max-height: 55vh;
  overflow-y: auto;
  position: relative;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #181818;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 10px;
    border: 2px solid #000000;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #333;
  }

  @media (max-height: 600px) {
    max-height: 40vh;
  }
`;

// Table component
export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 5px;
  margin-bottom: 0px;
  font-size: 1em;
  color: #ffffff;

  @media (max-width: 650px) {
    font-size: 0.9em;
  }
`;

export const TableHeader = styled.table`
  border-spacing: 0px;
`;

// Table header cell
export const Th = styled.th`
  background-color: #444444;
  color: #ffffff;
  font-weight: 600;
  padding: 16px;
  text-align: left;

  @media (max-width: 900px) {
    padding: 12px;
  }
`;

// Table data cell
export const Td = styled.td`
  padding: 12px;
  text-align: left;
  border: none;
  background-color: #2a2a2a;
  border-radius: 10px;
  color: #ffffff;

  &:nth-child(2) {
    min-width: 120px;
    width: 190px;
  }

  &:nth-child(4) {
    width: 200px;
  }

  @media (max-width: 900px) {
    padding: 10px 12px 10px 12px;
    border-radius: 0px;

    &:nth-child(2) {
      min-width: 80px;
      width: auto;
    }

    &:nth-child(4) {
      width: 120px;
    }
  }

  @media (max-width: 400px) {
    padding: 8px 8px 8px 8px;
    border-radius: 0px;
  }

  @media (max-width: 375px) {
    &:first-child {
      max-width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: 360px) {
    padding: 8px;
    border-radius: 0px;
  }
`;

// Table row
export const Tr = styled.tr`
  &:hover ${Td} {
    background-color: #333333;
  }

  @media (max-width: 900px) {
    font-size: 14px;
  }

  @media (max-width: 750px) {
    font-size: 12px;
  }

  @media (max-width: 490px) {
    font-size: 10px;
  }
`;

// Habit actions cell
export const HabitActions = styled.td`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  max-width: 90px;

  .action-button {
    ${buttonStyles}
    background-color: #444;
    color: #fff;
    &:hover {
      background-color: #555;
    }

    &.highlight-red {
      background-color: darkred;
      color: white;

      &:hover {
        background-color: red;
      }
    }

    &.highlight-green {
      background-color: darkgreen;
      color: white;

      &:hover {
        background-color: green;
      }
    }
  }

  @media (max-width: 900px) {
    gap: 0px;
    .action-button {
      width: 30px;
      height: 30px;
    }
  }
`;

// Action buttons container
export const ActionButtonsContainer = styled.div`
  display: flex;
  /* margin: 0px;
  padding: 0px; */
  height: 40px;
  @media (max-width: 900px) {
    /* height: 35px; */
  }
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

// New habit section
export const NewHabitSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  button {
    ${buttonStyles}
    background-color: #1db954;
    color: white;

    &:hover {
      background-color: #1ed760;
    }
  }

  .RestBtn {
    background-color: #f44336;

    &:hover {
      background-color: #e53935;
    }
  }

  .editBtn {
    background-color: #ff9800;

    &:hover {
      background-color: #fb8c00;
    }
  }

  @media (max-width: 900px) {
    flex-direction: row;
    margin-top: 5px;
  }
`;

// Delete button
export const DeleteButton = styled.button`
  ${buttonStyles}
  width: 116.5px; //remove if any issue
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #e53935;
  }

  @media (max-width: 900px) {
    width: 90px; //remove if any issue
  }
`;

// Toggle button
export const ToggleButton = styled.button`
  ${buttonStyles}
  background-color: #000000;
  color: white;

  &:hover {
    background-color: #1ed760;
  }
`;

export const FriendButton = styled.button`
  ${buttonStyles}
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 1400px) {
    display: none;
  }
`;

export const HabitRouteWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
  justify-content: center;
  background-color: #1c1c1c;
  margin: 0;
  min-height: 100vh;
  height: 100%;
`;

export const HabitContentWrapper = styled.section`
  width: 100%;
  @media (max-width: 900px) {
    width: 100%;
    height: 90%;
    padding: 0px;
  }
`;

export const HabitFriendWrapper = styled.section`
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: end;
  flex: 3;
`;
