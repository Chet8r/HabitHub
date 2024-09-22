import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  darkTheme,
} from "./timeBoxStyleConponents";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import useScrollToTopOnBlur from "../hooks/useScrollToTopOnBlur";
import {
  getTimebox,
  updateTimebox,
  clearTimebox,
  updateTaskCompletion,
} from "./actions/timeboxActions";
import { RootState } from "../Habits/Reducers";
import { UserData } from "../Shared/types";
import { Task } from "./types/timeboxActionTypes";

const TimeboxDaily: React.FC = () => {
  const dispatch = useDispatch();
  const timebox = useSelector((state: RootState) => state.timebox.timebox);
  const { data } = useSelector((state: RootState) => state.user);
  const sensitiveDataHidden = useSelector(
    (state: RootState) => state.nav.sensitiveDataHidden
  );

  // State
  const [user, setUser] = useState<UserData>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(4);
  const [hours, setHours] = useState<number>(6);
  const [showTimeControl, setShowTimeControl] = useState<boolean>(false);
  const [theme] = useState(sensitiveDataHidden ? lightTheme : darkTheme);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const userId = user?.user.userId;

  useScrollToTopOnBlur();

  useEffect(() => {
    if (data && data.user) {
      setUser(data);
    }
  }, [data]);

  // Fetch the timebox data on component mount
  useEffect(() => {
    if (userId) {
      dispatch(getTimebox(userId));
    }
  }, [userId, dispatch]);

  // Populate state with fetched timebox data
  useEffect(() => {
    if (timebox) {
      setTasks(timebox.tasks || []);
      setNotes(timebox.notes || "");
      setStartTime(timebox.startTime || 4);
      setHours(timebox.hours || 6);
    }
  }, [timebox]);

  // Handlers
  const toggleTimeControl = () => {
    setShowTimeControl(!showTimeControl);
  };

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], taskText: value };
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
    dispatch(updateTaskCompletion(userId, index, newTasks[index].completed));
  };

  const handleClearAll = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all tasks and notes?"
    );
    if (confirmClear) {
      setTasks([]);
      setNotes("");
      dispatch(clearTimebox(user?.user?.userId));
    }
  };

  const handleSaveChanges = () => {
    const timeboxId = timebox?.timeboxId;
    const timeboxData = { startTime, hours, notes, tasks, timeboxId };
    dispatch(updateTimebox(userId, timeboxData));
    setIsDirty(false);
  };

  const CheckTaskTextEmpty = (index: number): boolean => {
    if (timebox) {
      return (
        timebox?.tasks?.length > 0 && timebox.tasks[index]?.taskText === ""
      );
    } else {
      return false;
    }
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
              value={tasks[i]?.taskText || ""}
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
              disabled={isDirty || CheckTaskTextEmpty(i)}
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
                <span>Start: {startTime}</span>
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
