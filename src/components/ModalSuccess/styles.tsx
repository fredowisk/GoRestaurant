import styled from 'styled-components';

export const Container = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > svg {
      height: 50px;
      width: 50px;
      color: #39b100;
    }
    > p {
      font-weight: 600;
      font-size: 24px;
    }
  }
  .modal-container.mostrar {
    display: flex;
  }
`;
