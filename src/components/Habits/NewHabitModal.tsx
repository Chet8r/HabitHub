import React, { useState } from "react";
import {
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalActions,
  Input,
  Select,
  PropertyCard,
  PropertyName,
  CheckboxContainer,
  StyledCheckbox,
} from "./styled-conponents/StyledModal";

interface NewHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    name: string,
    status: string,
    isSensitive: boolean,
    updateDur: string
  ) => void;
  statusLevels: string[];
  EntryDuration: string[];
}

const NewHabitModal: React.FC<NewHabitModalProps> = ({
  isOpen,
  onClose,
  onSave,
  statusLevels,
  EntryDuration,
}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(statusLevels[0]);
  const [isSensitive, setIsSensitive] = useState(false);
  const [updateDuration, setUpdateDuration] = useState("");

  const handleSave = () => {
    onSave(name, status, isSensitive, updateDuration);
    setName("");
    setStatus(statusLevels[0]);
    setIsSensitive(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackdrop>
      <ModalContent>
        <ModalHeader>Add New Habit</ModalHeader>
        <ModalBody>
          <PropertyCard>
            <PropertyName>Name:</PropertyName>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </PropertyCard>
          <PropertyCard>
            <PropertyName>Status:</PropertyName>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              {statusLevels.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </PropertyCard>
          <PropertyCard>
            <PropertyName>Duration:</PropertyName>
            <Select
              value={updateDuration}
              onChange={(e) => setUpdateDuration(e.target.value)}
            >
              {EntryDuration.map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </Select>
          </PropertyCard>
          <PropertyCard>
            <PropertyName>Sensitive:</PropertyName>
            <CheckboxContainer>
              <StyledCheckbox
                type="checkbox"
                checked={isSensitive}
                onChange={(e) => setIsSensitive(e.target.checked)}
              />
            </CheckboxContainer>
          </PropertyCard>
        </ModalBody>
        <ModalActions>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button onClick={handleSave}>Save</button>
        </ModalActions>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default NewHabitModal;
