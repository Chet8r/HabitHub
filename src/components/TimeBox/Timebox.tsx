import React, { useState, ChangeEvent } from "react";
import styled, { ThemeProvider } from "styled-components";

interface Task {
  text: string;
  completed: boolean;
}

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

const TimeboxDaily: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(4);
  const [hours, setHours] = useState<number>(6);
  const [theme] = useState(lightTheme);

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], text: value };
    setTasks(newTasks);
  };

  const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleStartTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartTime(parseInt(event.target.value));
  };

  const handleHoursChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHours(parseInt(event.target.value));
  };

  const handleTaskCompletionToggle = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      completed: !newTasks[index].completed,
    };
    setTasks(newTasks);
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

  // const toggleTheme = () => {
  //   setTheme(theme === lightTheme ? darkTheme : lightTheme);
  // };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <ContentWrapper>
          <Header>
            <h2 className="title">TIMEBOX</h2>
            <ControlSection>
              <label>
                Start Time:
                <input
                  type="number"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  min="0"
                  max="23"
                />
              </label>
              <label>
                Hours:
                <input
                  type="number"
                  value={hours}
                  onChange={handleHoursChange}
                  min="1"
                  max="24"
                />
              </label>
              {/* <button onClick={toggleTheme}>
                {theme === lightTheme ? "Dark Mode" : "Light Mode"}
              </button> */}
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
            </RightSection>
          </MainContent>
        </ContentWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export default TimeboxDaily;

// Styled Components

const Wrapper = styled.section`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 10px;
`;

const ContentWrapper = styled.div`
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

const Header = styled.header`
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

const ControlSection = styled.div`
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

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0px;
  }
`;

const LeftSection = styled.section`
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
    resize: none;
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

const RightSection = styled.section`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TableWrapper = styled.div`
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

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 5px;
  font-size: 1em;
  color: ${({ theme }) => theme.color};
`;

const Tr = styled.tr`
  &:hover td {
    background-color: ${({ theme }) => theme.inputBackground};
  }
`;

const Td = styled.td`
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
