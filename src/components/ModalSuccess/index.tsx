import React from 'react';

import { FiThumbsUp } from 'react-icons/fi';

import { Container } from './styles';
import Modal from '../Modal';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalAddSuccess: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  function initModalSuccess(): any {
    setIsOpen();
  }

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Container onClick={initModalSuccess}>
          <div id="modal-sucesso" className="modal-container">
            <FiThumbsUp />
            <p>Prato adicionado!</p>
          </div>
        </Container>
      </Modal>
    </>
  );
};

export default ModalAddSuccess;
