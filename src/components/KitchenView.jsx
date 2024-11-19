import React from 'react';
import { Clock } from 'lucide-react';

const KitchenView = ({ orders }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 overflow-y-auto">
      {orders.filter(order => order.status === 'pending').map(order => (
        <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Clock className="mr-2" /> Pedido #{order.number} {/* Usamos order.number en lugar de order.id */}
          </h2>

          <p className="text-gray-600 mb-4">{order.timestamp}</p>
          {order.items.map((item, index) => (
            <div key={index} className="mb-2">
              <span className="text-3xl font-extrabold">{item.name}</span> {/* Nombre del producto resaltado */}
            </div>
          ))}
          <div className="mt-4 text-sm text-gray-500 font-light">
            Total: ${order.total.toFixed(2)} {/* Precio con menor relevancia */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KitchenView;
