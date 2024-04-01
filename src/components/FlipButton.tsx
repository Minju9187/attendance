import React, { useState } from "react";
import styled from "styled-components";
import checkImg from "@/assets/images/check-img.png";

export default function FlipButton({ isChecked, onClick, disabled }) {
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
            <CheckBox>
              <CheckImg src={checkImg} alt="check" />
            </CheckBox>
          ) : (
            <CheckButton disabled={disabled}>Check</CheckButton>
          )}
        </Front>
        <Back>
          {isChecked ? (
            <CheckButton disabled={disabled}>Check</CheckButton>
          ) : (
            <CheckBox>
              <CheckImg src={checkImg} alt="check" />
            </CheckBox>
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

const CheckImg = styled.img`
  width: 100px;
  height: 80px;
`;

const CheckBox = styled.div`
  width: 180px;
  height: 80px;
  border-radius: 10px;
  border: 1px solid black;
  margin-top: 10px;
`;
