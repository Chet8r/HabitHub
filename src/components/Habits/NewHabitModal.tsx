import React, { ChangeEvent, useState } from "react";
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
import { habitHubConstants } from "./Constants";
import { DurationType } from "../Shared/types";
import useScrollToTopOnBlur from "../hooks/useScrollToTopOnBlur";

interface NewHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    name: string,
    isSensitive: boolean,
    status: string,
    updateEntryDurName: string,
    updateEntryDurValue: number
  ) => void;
  statusLevels: string[];
  EntryDuration: DurationType[];
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
  const [updateDuration, setUpdateDuration] = useState({
    updateEntryDurName: "Daily",
    updateEntryDurValue: 1,
  });

  useScrollToTopOnBlur();

  const handleSave = () => {
    onSave(
      name,
      isSensitive,
      status,
      updateDuration.updateEntryDurName,
      updateDuration.updateEntryDurValue
    );
    setName("");
    setStatus(statusLevels[0]);
    setIsSensitive(false);
  };

  if (!isOpen) {
    return null;
  }

  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedDuration = EntryDuration.find(
      (duration) => duration.name === selectedName
    );
    if (selectedDuration) {
      setUpdateDuration({
        updateEntryDurName: selectedName,
        updateEntryDurValue: selectedDuration.value,
      });
    }
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <ModalHeader>Add New Habit</ModalHeader>
        <ModalBody>
          <PropertyCard>
            <PropertyName>Name:</PropertyName>
            <Input
              maxLength={16}
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
            <div className="DurationSelection">
              <Select
                value={updateDuration.updateEntryDurName}
                onChange={handleDurationChange}
              >
                {EntryDuration.map((duration) => (
                  <option key={duration.value} value={duration.name}>
                    {duration.name}
                  </option>
                ))}
              </Select>
              {updateDuration.updateEntryDurName ===
                habitHubConstants.CUSTOM && (
                <>
                  <Input
                    required
                    className="marginTop"
                    placeholder="Enter the number of days (e.g. 12)"
                    type="text"
                    value={updateDuration.updateEntryDurValue}
                    onChange={(e) =>
                      setUpdateDuration({
                        ...updateDuration,
                        updateEntryDurValue: Number(e.target.value),
                      })
                    }
                  />
                </>
              )}
            </div>
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
