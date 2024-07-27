import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import backgroundImage from "../../../public/bg.jpeg"; // Ensure to provide the correct path

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
  padding-bottom: 130px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const LogoWrapper = styled.div`
  padding-top: 50px;
  display: block;
`;

const Logo = styled.h1`
  color: white;
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

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;

interface FormData {
  firstname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Registration successful", formData);
  };

  return (
    <PageWrapper>
      <LogoWrapper>
        <Logo>HabitHub</Logo>
      </LogoWrapper>
      <FormWrapper>
        <Title>Register</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <Input
            type="name"
            name="name"
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
        </form>
      </FormWrapper>
    </PageWrapper>
  );
};

export default Register;
