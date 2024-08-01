import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import backgroundImage from "../../../public/bg.jpeg"; // Ensure to provide the correct path
import { loginUser } from "./account";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { fetchUserData } from "../Habits/Actions/userActions";
import { useDispatch } from "react-redux";

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  font-family: "Roboto", sans-serif;

  .mobileView {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
    .mobileView {
      display: block;
    }
  }
`;

export const LeftSection = styled.div`
  padding: 0px 50px 30px 100px;
  flex: 6;
  display: flex;
  flex-direction: column;
  color: white;
  background: rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 0px;
    padding-top: 50px;
    background: rgba(0, 0, 0, 0);
    flex: 0;
  }
`;

const LogoWrapper = styled.div`
  padding-top: 50px;
  display: flex;
  position: absolute;
  flex: 30%;
  @media (max-width: 768px) {
    padding-top: 0px;
    height: 10px;
    flex: 0%;
  }
  @media (max-height: 450px) {
    height: 10px;
    flex: 0%;
    padding-top: 0px;
  }
`;

const Logo = styled.h1`
  /* padding: 1%; */
  font-size: 30px;
  font-weight: bold;
`;

const MiddleContent = styled.div`
  flex: 60%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
    align-items: center;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Description = styled.p`
  font-size: 12px;
  max-width: 400px;
  text-align: left;
  padding: 0px 0px 10px 0px;
  color: white;

  text {
    color: orange;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Text = styled.p`
  font-size: 12px;
  max-width: 400px;
  text-align: left;
  padding: 0px 0px 10px 0px;
  color: white;

  span {
    color: orange;
    cursor: pointer;
  }

  @media (max-width: 768px) {
  }
`;

const RegisterButton = styled.button`
  background-color: #ff6600;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  padding: 12px 24px;
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: #cc5200;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  background: rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding-top: 20vh;
    background: rgba(0, 0, 0, 0);
    align-items: start;
  }
`;

const Form = styled.form`
  width: 25vw;
  max-width: 500px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70%;
    max-width: 500px;
  }
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.66); /* Set the placeholder text color */
  }
`;

const Button = styled.button`
  background-color: #ff6600;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  padding: 12px;
  width: 120px;
  margin: 10px 0;
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: #cc5200;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;

interface FormData {
  email: string;
  password: string;
}

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response: any = await loginUser(formData);
      if (response && response.token && response.userid) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userid", response.userid);
        authLogin(response.token);
        dispatch(fetchUserData(response.userid));
        navigate("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <PageWrapper>
      <LeftSection>
        <LogoWrapper>
          <Logo>HabitHub</Logo>
        </LogoWrapper>
        <MiddleContent>
          <Title>Welcome to HabitHub</Title>
          <Description>
            Welcome to HabitHub, your personal habit tracker. Keep track of your
            daily habits and Build Break Habits effortlessly.
          </Description>
          <Description>
            If you don't have a login yet, click below to activate your account
            today.
          </Description>
          <RegisterButton onClick={() => navigate("/register")}>
            Register
          </RegisterButton>
        </MiddleContent>
      </LeftSection>
      <RightSection>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ color: "white" }}>Sign In</h2>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="email"
            name="email"
            placeholder="Email or username"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit">Login</Button>
          <Text className="mobileView">OR</Text>
          <Button onClick={() => navigate("/register")} className="mobileView">
            Register
          </Button>
          <Text>
            Forgotten your password? <span>Reset it here.</span>
          </Text>
        </Form>
      </RightSection>
    </PageWrapper>
  );
};

export default Login;
