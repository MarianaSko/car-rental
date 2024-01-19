import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(18, 20, 23, 0.5);
  /* backdrop-filter: blur(45px);
  z-index: 20; */
  /* @media only screen and (max-width: 540px) {
    backdrop-filter: blur(50px); */
  /* } */
`;

export const ModalBackground = styled.div`
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 541px;
  padding: 40px 36px;
  background-color: #fff;
  border-radius: 24px;

  img {
    border-radius: 14px;
    margin: 0 auto;
    margin-bottom: 14px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    column-gap: 6px;
    row-gap: 4px;
    margin-bottom: 14px;
    width: 461px;

    li {
      color: rgba(18, 20, 23, 0.5);
      font-size: 12px;
    }
  }
  h2 + ul {
    width: 277px;
  }
  li:not(:last-child)::after {
    content: "|";
    margin-left: 6px;
    color: rgba(18, 20, 23, 0.1); /* Set the color of the pipe */
  }
  p {
    line-height: 1.43;
    font-size: 14px;
    margin-bottom: 24px;
    width: 461px;
  }
  h3 {
    font-size: 14px;
    line-height: 1.43;
    margin-bottom: 8px;
  }
  h2 {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.33;
    margin-bottom: 8px;
  }
  span {
    color: #3470ff;
  }
  ul + button {
    padding: 12px 50px;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
`;
