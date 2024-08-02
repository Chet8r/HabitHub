import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 20px;
  padding-bottom: 40px;
  color: #ffffff;
`;

const Spinner = styled(FontAwesomeIcon)`
  font-size: 48px;
  animation: ${spin} 1s linear infinite;
`;

const Loading: React.FC = () => (
  <LoadingWrapper>
    <Spinner icon={faSpinner} />
  </LoadingWrapper>
);

export default Loading;
