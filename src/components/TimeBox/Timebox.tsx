import React, { useState, useEffect, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import {
  ContentWrapper,
  ControlSection,
  Header,
  LeftSection,
  lightTheme,
  MainContent,
  RightSection,
  Table,
  TableWrapper,
  Td,
  Tr,
  Wrapper,
  TimeControlMenu,
  TimeDisplay,
  Overlay,
  ClearButton,
  SaveButton,
  FooterContainer,
} from "./timeBoxStyleConponents";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import useScrollToTopOnBlur from "../hooks/useScrollToTopOnBlur";
import {
  getTimebox,
  updateTimebox,
  clearTimebox,
  updateTaskCompletion,
} from "./actions/timeboxActions"; // Assuming these actions are correctly imported
import { RootState } from "../Habits/Reducers";

interface Task {
  text: string;
  completed: boolean;
}

const TimeboxDaily: React.FC = () => {
  const userId = 1; // Assuming userId comes from some auth state

  const timebox = useSelector((state: RootState) => state.timebox);

  // State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(4);
  const [hours, setHours] = useState<number>(6);
  const [showTimeControl, setShowTimeControl] = useState<boolean>(false);
  const [theme] = useState(lightTheme);
  const [isDirty, setIsDirty] = useState<boolean>(false); // Track if there are unsaved changes

  useScrollToTopOnBlur();

  // Fetch the timebox data on component mount
  useEffect(() => {
    if (!timebox) getTimebox(userId);
  }, [userId]);

  // Handlers
  const toggleTimeControl = () => {
    setShowTimeControl(!showTimeControl);
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], text: value };
    setTasks(newTasks);
    setIsDirty(true);
  };

  const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
    setIsDirty(true);
  };

  const increaseStartTime = () => {
    setStartTime((prev) => (prev < 23 ? prev + 1 : prev));
    setIsDirty(true);
  };

  const decreaseStartTime = () => {
    setStartTime((prev) => (prev > 0 ? prev - 1 : prev));
    setIsDirty(true);
  };

  const increaseHours = () => {
    setHours((prev) => (prev < 24 ? prev + 1 : prev));
    setIsDirty(true);
  };

  const decreaseHours = () => {
    setHours((prev) => (prev > 1 ? prev - 1 : prev));
    setIsDirty(true);
  };

  const handleTaskCompletionToggle = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      completed: !newTasks[index].completed,
    };
    setTasks(newTasks);
    setIsDirty(true);

    // Dispatch the task completion update to the server
    updateTaskCompletion(userId, index, newTasks[index].completed);
  };

  const handleClearAll = () => {
    // Clear local state
    setTasks([]);
    setNotes("");
    setIsDirty(true);

    // Dispatch clear timebox to the server
    clearTimebox();
  };

  const handleSaveChanges = () => {
    const timeboxData = { startTime, hours, notes, tasks };

    // Dispatch save timebox to the server
    updateTimebox(userId, timeboxData);

    // Reset dirty flag after saving
    setIsDirty(false);
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let i = 0; i < hours; i++) {
      const time = startTime + i;
      timeSlots.push(
        <Tr key={i}>
          <Td>{time.toString().padStart(2, "0")}:00</Td>
          <Td>
            <input
              type="text"
              value={tasks[i]?.text || ""}
              onChange={(e) => handleTaskChange(i, e.target.value)}
              style={{
                textDecoration: tasks[i]?.completed ? "line-through" : "none",
              }}
            />
          </Td>
          <Td>
            <input
              type="checkbox"
              checked={tasks[i]?.completed || false}
              onChange={() => handleTaskCompletionToggle(i)}
            />
          </Td>
        </Tr>
      );
    }
    return timeSlots;
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <ContentWrapper>
          <Header>
            <h2 className="title">TIMEBOX</h2>
            <ControlSection>
              <TimeDisplay onClick={toggleTimeControl}>
                <span>Start: {startTime}:00</span>
                <span>Hours: {hours}</span>
              </TimeDisplay>
              {showTimeControl && (
                <>
                  <Overlay onClick={toggleTimeControl} />
                  <TimeControlMenu>
                    <div>
                      <label>Start Time</label>
                      <div className="button-container">
                        <button className="button" onClick={decreaseStartTime}>
                          <FaMinus />
                        </button>
                        <span>{startTime}:00</span>
                        <button className="button" onClick={increaseStartTime}>
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label>Hours</label>
                      <div className="button-container">
                        <button className="button" onClick={decreaseHours}>
                          <FaMinus />
                        </button>
                        <span>{hours}</span>
                        <button className="button" onClick={increaseHours}>
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </TimeControlMenu>
                </>
              )}
            </ControlSection>
          </Header>

          <MainContent>
            <LeftSection>
              <h3>Notes</h3>
              <textarea value={notes} onChange={handleNotesChange} />
            </LeftSection>
            <RightSection>
              <TableWrapper>
                <Table>
                  <tbody>{renderTimeSlots()}</tbody>
                </Table>
              </TableWrapper>
              <FooterContainer>
                <ClearButton onClick={handleClearAll}>
                  <FaTrash /> Clear All
                </ClearButton>
                <SaveButton onClick={handleSaveChanges} disabled={!isDirty}>
                  Save Changes
                </SaveButton>
              </FooterContainer>
            </RightSection>
          </MainContent>
        </ContentWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export default TimeboxDaily;
