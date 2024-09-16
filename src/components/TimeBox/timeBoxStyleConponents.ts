// Styled Components

export const lightTheme = {
  background: "#1f3227",
  containColour: "#ffffff",
  color: "#333333",
  inputBackground: "#f0f0f0",
  inputBorder: "#cccccc",
  buttonBackground: "#e0e0e0",
  buttonColor: "#333333",
};

export const darkTheme = {
  background: "#323232",
  containColour: "#212121",
  color: "#ffffff",
  inputBackground: "#333333",
  inputBorder: "#555555",
  buttonBackground: "#444444",
  buttonColor: "#ffffff",
};

import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 10px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 950px;
  padding: 20px 40px 40px 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.containColour};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.color};

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 10px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .title {
    padding: 0px 2px;
    font-size: 1.2em;
    font-weight: bold;
    color: ${({ theme }) => theme.color};
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    height: 50px;
    margin-bottom: 0px;

    .title {
      font-size: 1.1em;
      font-weight: bold;
      color: ${({ theme }) => theme.color};
    }
  }
`;

export const ControlSection = styled.div`
  display: flex;
  align-items: center;

  label {
    font-size: 1em;
    margin-right: 10px;
    color: ${({ theme }) => theme.color};

    input {
      margin-left: 5px;
      width: 50px;
      padding: 5px;
      background-color: ${({ theme }) => theme.inputBackground};
      border: 1px solid ${({ theme }) => theme.inputBorder};
      color: ${({ theme }) => theme.color};
      border-radius: 5px;
    }
  }

  button {
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonColor};
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    display: block;
    align-items: center;
    align-self: center;

    label {
      font-size: 0.9em;

      input {
        margin-left: 5px;
        width: 38px;
        padding: 10px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    label {
      margin-bottom: 10px;
    }

    button {
      margin-top: 10px;
    }
  }
`;

export const MainContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0px;
  }
`;

export const LeftSection = styled.section`
  width: 45%;
  display: flex;
  flex-direction: column;

  h3 {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.color};
  }

  textarea {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.inputBackground};
    border: 1px solid ${({ theme }) => theme.inputBorder};
    border-radius: 5px;
    resize: vertical;
    color: ${({ theme }) => theme.color};
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;

    h3 {
      margin: 0px;
      font-size: 1em;
      margin-bottom: 10px;
      color: ${({ theme }) => theme.color};
    }
  }
`;

export const RightSection = styled.section`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TableWrapper = styled.div`
  max-height: 60vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.inputBackground};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.inputBorder};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.color};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 5px;
  font-size: 1em;
  color: ${({ theme }) => theme.color};
`;

export const Tr = styled.tr`
  &:hover td {
    background-color: ${({ theme }) => theme.inputBackground};
  }
`;

export const Td = styled.td`
  padding: 5px;
  text-align: left;
  background-color: ${({ theme }) => theme.containerBackground};
  border-bottom: 1px solid ${({ theme }) => theme.inputBorder};

  input[type="text"] {
    width: 100%;
    padding: 8px;
    background-color: ${({ theme }) => theme.inputBackground};
    border: 1px solid ${({ theme }) => theme.inputBorder};
    border-radius: 5px;
    color: ${({ theme }) => theme.color};
    font-family: "Roboto", sans-serif;
    text-decoration: none;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    accent-color: ${({ theme }) => theme.color};
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 10;
`;

export const TimeControlMenu = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) =>
    theme.containColour}; /* Use container background color */
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Ensure items stretch to full width */
  gap: 16px;
  width: 90%;
  max-width: 360px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 12px;

    label {
      font-size: 1em;
      color: ${({ theme }) => theme.color};
      font-weight: 500;
      text-transform: uppercase;
      width: 50%; /* Ensure label takes up half the width */
    }

    .button-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 50%; /* Ensure button container takes up the remaining half */
    }

    .button {
      background-color: ${({ theme }) => theme.buttonBackground};
      color: ${({ theme }) => theme.buttonColor};
      border: none;
      padding: 12px;
      /* border-radius: 50%; */
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: ${({ theme }) => theme.inputBorder};
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      svg {
        font-size: 1.2em;
      }
    }
  }
`;

export const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightskyblue;
  color: BLACK;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b7e1fc;
  }

  span {
    font-size: 1.1em;
    margin: 0 10px;
  }
`;

export const TimeControlButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.inputBorder};
  }

  svg {
    font-size: 1.1em;
  }
`;

export const ClearButton = styled.button`
  background-color: darkred;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;

  &:hover {
    background-color: red;
  }

  svg {
    font-size: 1.2em;
  }
`;