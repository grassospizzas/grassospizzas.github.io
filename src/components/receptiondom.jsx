import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const menuItems = {
  pizzas: [
    { id: 1, name: 'Promocion 2 pizzas', price: 325.0 },
    { id: 2, name: 'Hawaiana', price: 219.0 },
    { id: 3, name: 'Pepperoni', price: 219.0 },
    { id: 4, name: 'Queso', price: 219.0 },
    { id: 5, name: 'Mexicana', price: 219.0 },
    { id: 6, name: 'Carnes frías', price: 243.0 },
    { id: 7, name: 'Norteña', price: 243.0 },
    { id: 8, name: 'Vegetariana', price: 243.0 },
    { id: 9, name: 'Grasso', price: 243.0 },
    { id: 10, name: 'Suprema', price: 243.0 },
  ],
  extras: [
    { id: 10, name: 'Nachos acompañados de cheddar', price: 59.0 },
    { id: 11, name: 'Dedo de queso', price: 84.0 },
    { id: 13, name: 'Papas gajo', price: 84.0 },
    { id: 14, name: 'Papas a la francesa', price: 84.0 },
    { id: 15, name: 'Aros de cebolla', price: 84.0 },
    { id: 16, name: 'Poppers de jalapeño', price: 84.0 },

  ],
  mitades: [
    { id: 17, name: 'Mitad Hawaiana', price: 72.5 },
    { id: 18, name: 'Mitad Pepperoni', price: 72.5 },
    { id: 19, name: 'Mitad Queso', price: 72.5 },
    { id: 20, name: 'Mitad Mexicana', price: 72.5 },
    { id: 21, name: 'Mitad Canes frias', price: 72.5 },
    { id: 22, name: 'Mitad Norteña', price: 72.5 },
    { id: 23, name: 'Mitad Vegetariana', price: 72.5 },
    { id: 24, name: 'Mitad Grasso', price: 72.5 },
    { id: 25, name: 'Mitad Suprema', price: 72.5 },
    
  ],
};

const receptiondom = ({ orders, setOrders }) => {
  const [currentOrder, setCurrentOrder] = useState({ items: [], total: 0 });
  const [nextOrderNumber, setNextOrderNumber] = useState(1);

  useEffect(() => {
    const maxOrderNumber = orders.reduce((max, order) => Math.max(max, order.number || 0), 0);
    setNextOrderNumber(maxOrderNumber + 1);
  }, [orders]);

  const addToOrder = (item) => {
    setCurrentOrder((prev) => {
      const updatedItems = [...prev.items, { ...item }];
      return {
        items: updatedItems,
        total: prev.total + item.price,
      };
    });
  };

  const removeFromOrder = (itemIndex) => {
    setCurrentOrder((prev) => {
      const updatedItems = [...prev.items];
      const itemToRemove = updatedItems[itemIndex];
      updatedItems.splice(itemIndex, 1);
      return {
        items: updatedItems,
        total: prev.total - itemToRemove.price,
      };
    });
  };

  const submitOrder = () => {
    if (currentOrder.items.length > 0) {
      const newOrder = {
        id: nextOrderNumber,
        number: nextOrderNumber,
        items: currentOrder.items,
        total: currentOrder.total,
        status: 'pending',
        timestamp: new Date().toLocaleTimeString(),
      };
      setOrders((prev) => [...prev, newOrder]);
      setCurrentOrder({ items: [], total: 0 });
      setNextOrderNumber((prev) => prev + 1);
    }
  };

  const completeOrder = (id) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status: 'completed' } : order))
    );
  };

  return (
    <div className="flex h-full">
      <div className="w-2/3 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Menú de domicilio </h2>

        <h3 className="text-lg font-semibold mt-4">Pizzas</h3>
        <div className="grid grid-cols-3 gap-4">
          {menuItems.pizzas.map((item) => (
            <button
              key={item.id}
              onClick={() => addToOrder(item)}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold">{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-4">Extras</h3>
        <div className="grid grid-cols-3 gap-4">
          {menuItems.extras.map((item) => (
            <button
              key={item.id}
              onClick={() => addToOrder(item)}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold">{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-4">Mitades</h3>
        <div className="grid grid-cols-3 gap-4">
          {menuItems.mitades.map((item) => (
            <button
              key={item.id}
              onClick={() => addToOrder(item)}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold">{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="w-1/3 bg-white p-4 shadow-lg overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Pedido Actual</h2>
        {currentOrder.items.map((item, index) => (
          <div key={index} className="mb-2 flex justify-between items-center">
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>
            <button
              onClick={() => removeFromOrder(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X />
            </button>
          </div>
        ))}
        <div className="font-bold mt-4">Total: ${currentOrder.total.toFixed(2)}</div>
        <button
          onClick={submitOrder}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Enviar Pedido
        </button>

        <h2 className="text-xl font-bold mt-8 mb-4">Pedidos Pendientes</h2>
        {orders
          .filter((order) => order.status === 'pending')
          .map((order) => (
            <div key={order.id} className="bg-orange-100 p-4 rounded mb-4">
              <div className="font-bold">Pedido #{order.number}</div>
              <div>{order.timestamp}</div>
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className="text-sm">
                    {item.name} - ${item.price.toFixed(2)}
                  </div>
                ))}
              </div>
              <div className="font-bold mt-2">Total: ${order.total.toFixed(2)}</div>
              <button
                onClick={() => completeOrder(order.id)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
              >
                Marcar como Completado
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default receptiondom;
