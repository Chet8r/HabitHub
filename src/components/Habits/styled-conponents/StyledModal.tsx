// StyledComponents.js
import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7); /* Darker backdrop for dark mode */
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: #1e1e1e; /* Dark background for content */
  padding: 20px;
  border-radius: 15px;
  width: 90vw;
  max-width: 500px;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Darker shadow */

  @media (min-width: 768px) {
    padding: 30px;
    width: 60vw;
    max-width: none;
  }

  @media (min-width: 1024px) {
    width: 40vw;
  }

  @media (max-width: 900px) {
    width: auto;
  }
`;

export const ModalHeader = styled.h2`
  margin-top: 0;
  color: #e0e0e0; /* Light color for header text */
  font-size: 1.5em;

  @media (min-width: 768px) {
    font-size: 2em;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  button {
    background-color: #333; /* Dark button background */
    border: none;
    color: #e0e0e0; /* Light text color */
    cursor: pointer;
    font-size: 14px;
    padding: 10px 16px;
    border-radius: 4px;
    margin-left: 8px;
    transition: background-color 0.3s;

    &:hover {
      background-color: green; /* Slightly lighter on hover */
    }
  }

  button.cancel {
    background-color: #555; /* Darker background for cancel button */

    &:hover {
      background-color: darkred; /* Slightly lighter on hover */
    }
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #444; /* Dark border */
  border-radius: 4px;
  font-size: 14px;
  background-color: #444; /* Dark background for input */
  color: #e0e0e0; /* Light text color */
  flex: 1;

  ::placeholder {
    color: #888; /* Placeholder text color */
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #444; /* Dark border */
  border-radius: 4px;
  font-size: 14px;
  background-color: #444; /* Dark background for select */
  color: #e0e0e0; /* Light text color */
  flex: 1;
`;

export const PropertyCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #2e2e2e; /* Dark border */
  border-radius: 8px;
  background-color: #2e2e2e; /* Dark background */
  color: #e0e0e0; /* Light text color */

  .DurationSelection {
    width: 100%;
    display: flex;
    flex-flow: column;
  }

  .marginTop {
    margin-top: 5px !important;
  }
`;

export const PropertyName = styled.div`
  font-size: 14px;
  font-weight: bold;
  width: 100px; /* Adjusted width */
  flex-shrink: 0;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const StyledCheckbox = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  appearance: none;
  background-color: #333; /* Dark checkbox background */
  border: 1px solid #444; /* Dark border */
  border-radius: 4px;
  display: inline-block;
  position: relative;

  &:checked {
    background-color: darkgreen;
    border-color: darkgreen;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;
