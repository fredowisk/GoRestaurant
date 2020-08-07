import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    // função que carrega todas as foods
    async function loadFoods(): Promise<void> {
      // utilizando o get e setando no estado
      const foodsList = await api.get('/foods');
      setFoods(foodsList.data);
    }
    loadFoods();
  }, []);
  // função que adiciona uma nova food
  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const newFood = {
        // Se o id tiver uma ultima posição, some + 1, senão deixe 1
        id: foods[foods.length - 1] ? foods[foods.length - 1].id + 1 : 1,
        // passando todas as informações, o id, e o available
        ...food,
        available: true,
      };
      // dando um post na rota foods passando a nova food
      await api.post('/foods', newFood);
      // atualizando o estado, para renderizar em tela a nova food
      setFoods([...foods, newFood]);
    } catch (err) {
      throw new Error(err);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      // criando uma lista nova com as foods que não possuirem o id da food que será editada
      const updatedFoodsList = foods.map(selectedFood =>
        selectedFood.id !== editingFood.id
          ? selectedFood
          : { id: editingFood.id, ...food, available: editingFood.available },
      );
      // utilizando o put pois iremos alterar todos os campos
      // na rota foods passando o ID da food editada
      await api.put(`/foods/${editingFood.id}`, {
        // enviando todos os campos
        id: editingFood.id,
        ...food,
        available: editingFood.available,
      });
      // trazendo de volta todas as foods para atualizar o estado
      setFoods(updatedFoodsList);
    } catch (err) {
      throw new Error(err);
    }
  }
  // função que deleta uma food
  async function handleDeleteFood(id: number): Promise<void> {
    // liste todas as foods que não sejam iguais a selecionada.
    setFoods(foods.filter(food => food.id !== id));
    // delete ela
    await api.delete(`/foods/${id}`);
  }
  // função que abre o modal
  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  // função que abre o modal de edição
  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  // função que recebe a food que será editada
  function handleEditFood(food: IFoodPlate): void {
    // passando a food para o modal
    setEditingFood(food);
    // abrindo o modal
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
