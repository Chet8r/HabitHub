import React, { useState, ChangeEvent, useEffect } from "react";
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
  ClearButton, // Import the new styled component
} from "./timeBoxStyleConponents";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

interface Task {
  text: string;
  completed: boolean;
}

const TimeboxDaily: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(4);
  const [hours, setHours] = useState<number>(6);
  const [showTimeControl, setShowTimeControl] = useState<boolean>(false);
  const [theme] = useState(lightTheme);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Event listener to scroll to the top when an input field loses focus
    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        scrollToTop();
      }
    };

    // Add event listener to the document
    document.addEventListener("blur", handleBlur, true);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("blur", handleBlur, true);
    };
  }, []);

  const toggleTimeControl = () => {
    setShowTimeControl(!showTimeControl);
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], text: value };
    setTasks(newTasks);
  };

  const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const increaseStartTime = () => {
    setStartTime((prev) => (prev < 23 ? prev + 1 : prev));
  };

  const decreaseStartTime = () => {
    setStartTime((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const increaseHours = () => {
    setHours((prev) => (prev < 24 ? prev + 1 : prev));
  };

  const decreaseHours = () => {
    setHours((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleTaskCompletionToggle = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      completed: !newTasks[index].completed,
    };
    setTasks(newTasks);
  };

  const handleClearAll = () => {
    setTasks([]);
    setNotes("");
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
              <ClearButton onClick={handleClearAll}>
                <FaTrash /> Clear All
              </ClearButton>
            </RightSection>
          </MainContent>
        </ContentWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export default TimeboxDaily;
