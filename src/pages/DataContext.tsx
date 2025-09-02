import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '../api';
import Ingredients from './Products/Ingredients';

interface StaticData {
  ingredients: Ingredients[];
//   areas: any[];
}

// Context'i oluşturun ve varsayılan değerini atayın
const DataContext = createContext<StaticData | undefined>(undefined);

// Veriyi çekecek ve state'i yönetecek Provider bileşenini oluşturun
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<StaticData | undefined>(undefined);

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const ingredients = (await api.get('/ingredients')).data;
        //const areas = (await api.get('/areas')).data;
        setData({ ingredients });
      } catch (error) {
        console.error("Veriler çekilirken hata oluştu:", error);
      }
    };

    fetchStaticData();
  }, []);

  // Tüm alt bileşenlere veriyi sağlar
  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

// Veriye erişmek için özel bir Hook (isteğe bağlı ama önerilir)
export const useStaticData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useStaticData, DataProvider içinde kullanılmalıdır.');
  }
  return context;
};