import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;

  button {
    padding: 14px 44px;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  label {
    color: #8a8a89;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.29;
  }
`;
