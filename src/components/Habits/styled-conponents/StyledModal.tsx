// StyledComponents.js
import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  width: 90vw;
  max-width: 500px;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 30px;
    width: 60vw;
    max-width: none;
  }

  @media (min-width: 1024px) {
    width: 40vw;
  }
`;

export const ModalHeader = styled.h2`
  margin-top: 0;
  color: #163020;
  font-size: 1.5em;

  @media (min-width: 768px) {
    font-size: 2em;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  button {
    background-color: #163020;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    padding: 10px 16px;
    border-radius: 4px;
    margin-left: 8px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #145319;
    }
  }

  button.cancel {
    background-color: #b6c4b6;

    &:hover {
      background-color: #becdbe;
    }
  }
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  flex: 1;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  flex: 1;
`;

export const PropertyCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

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
  font-size: 16px;
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
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-block;
  position: relative;

  &:checked {
    background-color: orange;
    border-color: orange;
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
