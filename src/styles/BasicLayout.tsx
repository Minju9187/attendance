import React from "react";
import styled from "styled-components";

export default function BasicLayout({ children }) {
  return (
    <>
      <ParentContainer>
        <LayoutContainer>
          <Screen>{children}</Screen>
        </LayoutContainer>
      </ParentContainer>
    </>
  );
}

const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const LayoutContainer = styled.div`
  position: relative;
  width: 390px;
  height: 100vh;
  min-height: calc(100vh - 45px);
  box-shadow: rgb(0 0 0 / 14%) 0px 0px 7px;
  background: white;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
  /* @media (max-width: 768px) {
    margin: 0 auto;
    max-width: 100%;
    transform: none;
  } */
`;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;
