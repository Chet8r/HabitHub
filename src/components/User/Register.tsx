import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import backgroundImage from "../../../public/bg.jpeg"; // Ensure to provide the correct path
import { useNavigate } from "react-router-dom";
import { registerUser } from "./account";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  font-family: "Roboto", sans-serif;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-bottom: 20vh;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-height: 700px) {
    padding-bottom: 0px;
  }
`;

const LogoWrapper = styled.div`
  padding-top: 50px;
  display: block;

  @media (max-height: 500px) {
    display: none;
  }
`;

const Logo = styled.h1`
  color: white;
  font-size: 30px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.66);
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
  width: 100%;
  margin: 10px 0;
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: #cc5200;
  }
`;

const Text = styled.p`
  font-size: 12px;
  max-width: 400px;
  text-align: center;
  padding: 0px 0px 10px 0px;
  color: white;

  span {
    color: orange;
    cursor: pointer;
  }

  @media (max-width: 768px) {
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;

const SuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0000006f;
  padding: 20px;
  border-radius: 10px;
`;

const SuccessIcon = styled.div`
  font-size: 28px;
  color: white;
`;

const SuccessTitle = styled.h2`
  color: #4caf50;
  font-size: medium;
  font-family: "Roboto", sans-serif;
`;

const SuccessText = styled.p`
  color: #f7f7f7;
  font-family: "Roboto", sans-serif;
  font-size: small;
  margin: 10px 0;
`;

const ContinueButton = styled.button`
  background-color: #e0e0e0;
  color: black;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  padding: 12px 24px;
  margin-top: 20px;
  font-family: "Roboto", sans-serif;

  &:hover {
    background-color: white;
  }
`;

interface FormData {
  firstname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.firstname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response: any = await registerUser({
        firstname: formData.firstname,
        email: formData.email,
        password: formData.password,
      });
      if (response && response.message) {
        setSuccess(true);
        setError("");
      } else {
        setError("Registration failed");
        setSuccess(false);
      }
    } catch (error) {
      setError("Registration failed");
      setSuccess(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <PageWrapper>
      <LogoWrapper>
        <Logo>HabitHub</Logo>
      </LogoWrapper>
      <FormWrapper>
        {success ? (
          <SuccessWrapper>
            <SuccessIcon>
              <FontAwesomeIcon icon={faCircleCheck} />
            </SuccessIcon>
            <SuccessTitle>SUCCESS</SuccessTitle>
            <SuccessText>
              Your account has been successfully created.
            </SuccessText>
            <ContinueButton onClick={navigateToLogin}>Login</ContinueButton>
          </SuccessWrapper>
        ) : (
          <>
            <Title>Register</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <form onSubmit={handleSubmit}>
              <Input
                type="name"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
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
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button type="submit">Register</Button>
              <Text>
                Already have an account?{" "}
                <span onClick={navigateToLogin}>Login here.</span>
              </Text>
            </form>
          </>
        )}
      </FormWrapper>
    </PageWrapper>
  );
};

export default Register;
