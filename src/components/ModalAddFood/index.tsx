import React, { useRef, useCallback, useState } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import ModalSuccess from '../ModalSuccess';
import Input from '../Input';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface ICreateFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<IFoodPlate, 'id' | 'available'>) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // função que será disparada após concluir a criação da food
  const handleSubmit = useCallback(
    async (data: ICreateFoodData) => {
      // envie a food para a função do dashboard
      handleAddFood(data);
      // feche o modal
      setIsOpen();
    },
    [handleAddFood, setIsOpen],
  );

  function toggleSuccessModal(): void {
    setSuccessModalOpen(!successModalOpen);
  }
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button
            type="submit"
            onClick={toggleSuccessModal}
            data-testid="add-food-button"
          >
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
      <ModalSuccess isOpen={successModalOpen} setIsOpen={toggleSuccessModal} />
    </>
  );
};

export default ModalAddFood;
