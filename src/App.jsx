
import React, { useState, useEffect } from 'react';
import { Pizza } from 'lucide-react';
import ReceptionView from './components/ReceptionView';
import KitchenView from './components/KitchenView';
import DeliveryMenuView from './components/receptiondom'; // componente a agregar
<link id="favicon" rel="icon" href="%PUBLIC_URL%/favicon.ico" />

const App = () => {
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('reception');

  useEffect(() => {
    // Cambia el título de la pestaña según la vista
    if (view === 'reception') {
      document.title = "Recepción - GRASSOS PIZZA";
    } else if (view === 'kitchen') {
      document.title = "Cocina - GRASSOS PIZZA";
    } else if (view === 'receptiondom') {
      document.title = "Menú de Domicilio - GRASSOS PIZZA";
    }
  }, [view]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'grassosOrders') {
        setOrders(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('grassosOrders', JSON.stringify(orders));
  }, [orders]);

  const toggleView = () => {
    setView(view === 'reception' ? 'kitchen' : 'reception');
  };

  const toggleToDeliveryMenu = () => {
    setView(view === 'receptiondom' ? 'kitchen' : 'receptiondom');
  };

  return (
    <div className="flex flex-col h-screen bg-orange-100">
      <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <img 
            src="/Img/logo.jpg" 
            alt="GRASSOS PIZZAAS" 
            className="mr-2 w-15 h-12" 
          />
          GRASSOS pizza
        </h1>
        <div className="flex space-x-4">
          <button 
            onClick={toggleView}
            className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded transition-all duration-1000"
          >
            Cambiar a {view === 'reception' ? 'Cocina' : 'Recepción'}
          </button>
          <button 
            onClick={toggleToDeliveryMenu}
            className="bg-orange-600 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded transition-all duration-1000"
          >
            Cambiar a {view === 'receptiondom' ? 'Cocina' : 'Menú de Domicilio'}
          </button>
        </div>
      </header>
      <main className="flex-grow overflow-hidden">
        {view === 'reception' && <ReceptionView orders={orders} setOrders={setOrders} />}
        {view === 'kitchen' && <KitchenView orders={orders} />}
        {view === 'receptiondom' && <DeliveryMenuView orders={orders} setOrders={setOrders} />}
      </main>
      <footer className="bg-gray-200 p-2 text-center text-xs text-gray-600">
        © 2024 GRASSOS pizza
      </footer>
    </div>
  );
};

export default App;
