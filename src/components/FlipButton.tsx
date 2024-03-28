import React, { useState } from "react";
import styled from "styled-components";
import checkImg from "@/assets/images/check-img.png";

export default function FlipButton({ isChecked, onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onClick && onClick();
  };

  return (
    <FlipContainer onClick={handleClick}>
      <Flipper className={isFlipped ? "flipped" : ""}>
        <Front>
          {isChecked ? (
            <img src={checkImg} alt="check" />
          ) : (
            <CheckButton>check</CheckButton>
          )}
        </Front>
        <Back>
          {isChecked ? (
            <CheckButton>check</CheckButton>
          ) : (
            <img src={checkImg} alt="check" />
          )}
        </Back>
      </Flipper>
    </FlipContainer>
  );
}

const FlipContainer = styled.div`
  perspective: 1000px;
`;

const Flipper = styled.div`
  transition: 0.6s;
  transform-style: preserve-3d;

  position: relative;
  width: 180px;
  height: 80px;

  &.flipped {
    transform: rotateY(180deg);
  }
`;

const Front = styled.div`
  backface-visibility: hidden;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Back = styled.div`
  backface-visibility: hidden;

  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(180deg);
`;

const CheckButton = styled.button`
  width: 180px;
  height: 80px;
  color: white;
  font-size: 25px;
  background-color: #ff4948;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  border-radius: 10px;
  margin-top: 10px;
`;
