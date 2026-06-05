import { useState, useEffect } from 'react';

const defaultData = {
  socials: [
    { id: 1, name: 'YouTube', url: 'https://www.youtube.com/@GabzBS', icon: 'YouTube' },
    { id: 2, name: 'Instagram', url: 'https://www.instagram.com/_gabz.bs_', icon: 'Instagram' },
    { id: 3, name: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
    { id: 5, name: 'TikTok', url: 'https://www.tiktok.com/@_gabz.bs_0', icon: 'TikTok' },
    { id: 6, name: 'Discord', url: 'https://discord.gg/WgYuUhGq', icon: 'Discord' }
  ],
  services: [
    { id: 1, title: 'Push de Troféus ( prestigio 1 )', price: 10, oldPrice: 15, description: 'Subo sua seu brawler para o prestigio 1  ( qualquer brawler ) obs : até 48 hrs depois', image: 'https://i.pinimg.com/736x/03/58/36/035836d3f8d007a90cd0a82f3920470e.jpg', features: ['Subida para prestígio 1', 'Qualquer brawler', 'Prazo de até 48h', 'Conta intacta e segura'], badge: '🔥 MAIS VENDIDO' },
    { id: 2, title: 'Coach 1v1 Premium', price: 20, description: '30minutos  de aula particular de Brawl Stars (Call no Discord). ', image: 'https://i.pinimg.com/736x/38/e2/bc/38e2bcb226638d1a7137231cc4d9318f.jpg', features: ['30 min de aula particular', 'Call no Discord', 'Identificação de erros', 'Dicas personalizadas'], badge: '🎯 PREMIUM' },
    { id: 3, title: 'Análise de Gameplay', price: 8, oldPrice: 12, description: 'Envie seu replay e eu analiso seus erros e acertos.', image: 'https://i.pinimg.com/736x/28/b0/2f/28b02f2e7e406ad21ac7b5925548bd47.jpg', features: ['Análise detalhada do replay', 'Relatório escrito', 'Erros e acertos apontados', 'Resposta em até 24h'], badge: '📊 OFERTA' },
    { id: 4, title: 'Push troféu  ( prestigio 2 )', price: 20, description: 'Subo seu brawler para prestigio 2   ( qualquer brawler que esteja prestigio 1 ) obs : até 48 hrs depois', image: 'https://i.pinimg.com/736x/79/1d/46/791d4665b37d3abcd95ab2184c3c483f.jpg', features: ['Subida para prestígio 2', 'Qualquer brawler (prestígio 1+)', 'Prazo de até 48h', 'Conta intacta e segura'], badge: '🔥 MAIS VENDIDO' }
  ],
  reviews: [
    { id: 1, author: 'Kauã_BS', rating: 5, text: 'contratei o push de troféus na sexta à noite e na segunda já tinha entregado, fiquei bem surpreso com a velocidade. a conta ficou intacta e o atendimento foi tranquilo do início ao fim', brawler: 'Colt' },
    { id: 2, author: 'Vitinho_Gamer', rating: 5, text: 'já tinha comprado de outro cara antes e me decepcionei, então vim com um pouco de receio. mas o Gabz foi bem direto, combinou o prazo e cumpriu. não tive nenhum problema', brawler: 'Mortis' },
    { id: 3, author: 'Ana_Brawl', rating: 5, text: 'fiz a aula de uma hora e valeu muito. ele identificou uns erros meus de posicionamento que eu não percebia sozinha. desde aí melhorei bastante nas ranqueadas', brawler: 'Shelly' },
    { id: 4, author: 'PedroX99', rating: 5, text: 'o gabz explica de um jeito bem simples, sem ficar usando termos complicados. aprendi mais nessa hora do que em semanas assistindo vídeos no youtube', brawler: 'Edgar' },
    { id: 5, author: 'Lucas_Pro', rating: 5, text: 'serviço honesto. o combinado foi de 4 dias e terminou em 3. nada de drama, nada de susto na conta. vou contratar de novo quando precisar subir mais', brawler: 'Spike' },
    { id: 6, author: 'Carol_gamer', rating: 5, text: 'achei o site, li os feedbacks e resolvi tentar. não me arrependi. foi tudo muito bem explicado antes de fechar, e o serviço foi entregue como combinado', brawler: 'Piper' },
  ],
  brawlers: [
    { id: 1, name: 'Colt', role: 'Destruidor', level: 'Poder 11', image: 'https://i.pinimg.com/736x/ac/28/8a/ac288a50d38616072c00d6b8531f3a22.jpg' },
    { id: 2, name: 'Mortis', role: 'Assassino', level: 'Poder 11', image: 'https://i.pinimg.com/736x/75/3f/5f/753f5f70f3d16f60938eb6e578ea0938.jpg' }
  ],
  events: [],
  pixKey: '83998198337',
  isLive: false,
  adminPassword: 'admin123'
};

export function useAppStore() {
  const [data, setData] = useState(() => {
    let saved = localStorage.getItem('gabz_bs_data_v5');
    if (!saved) {
      saved = localStorage.getItem('gabz_bs_data_v4');
    }
    if (!saved) {
      saved = localStorage.getItem('gabz_bs_data_v3');
    }
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.reviews) parsed.reviews = defaultData.reviews;
      if (!parsed.brawlers) parsed.brawlers = defaultData.brawlers;
      if (!parsed.events) parsed.events = defaultData.events;
      if (!parsed.adminPassword) parsed.adminPassword = defaultData.adminPassword;
      if (!parsed.pixKey || parsed.pixKey === 'gabz.bs.pagamentos@email.com') {
        parsed.pixKey = defaultData.pixKey;
      }
      if (!Array.isArray(parsed.reviews)) parsed.reviews = defaultData.reviews;
      if (!Array.isArray(parsed.socials)) parsed.socials = defaultData.socials;
      return parsed;
    }
    return defaultData;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('gabz_bs_cart');
    if (savedCart) return JSON.parse(savedCart);
    return [];
  });

  useEffect(() => {
    localStorage.setItem('gabz_bs_data_v5', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('gabz_bs_cart', JSON.stringify(cart));
  }, [cart]);

  const updateService = (id, newService) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => {
        if (s.id !== id) return s;
        const { oldPrice, ...rest } = newService;
        return oldPrice !== undefined ? { ...rest, oldPrice } : rest;
      })
    }));
  };

  const addService = (service) => {
    setData(prev => ({
      ...prev,
      services: [...prev.services, { ...service, id: Date.now() }]
    }));
  };

  const deleteService = (id) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  const updateSocial = (id, newUrl) => {
    setData(prev => ({
      ...prev,
      socials: prev.socials.map(s => s.id === id ? { ...s, url: newUrl } : s)
    }));
  };

  const updatePixKey = (newKey) => {
    setData(prev => ({ ...prev, pixKey: newKey }));
  };

  const addReview = (review) => {
    setData(prev => ({
      ...prev,
      reviews: [...prev.reviews, { ...review, id: Date.now() }]
    }));
  };

  const deleteReview = (id) => {
    setData(prev => ({
      ...prev,
      reviews: prev.reviews.filter(r => r.id !== id)
    }));
  };

  /* ─── Events CRUD ─── */
  const addEvent = (event) => {
    setData(prev => ({
      ...prev,
      events: [...prev.events, { ...event, id: Date.now(), active: true }]
    }));
  };

  const updateEvent = (id, updatedEvent) => {
    setData(prev => ({
      ...prev,
      events: prev.events.map(e => e.id === id ? { ...e, ...updatedEvent } : e)
    }));
  };

  const deleteEvent = (id) => {
    setData(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== id)
    }));
  };

  const addToCart = (service) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === service.id);
      if (exists) return prev.map(item => item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const decrementCartItem = (id) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === id);
      if (!exists) return prev;
      if (exists.quantity > 1) return prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
      return prev.filter(item => item.id !== id);
    });
  };

  const clearCart = () => setCart([]);

  const updateAdminPassword = (newPass) => {
    setData(prev => ({ ...prev, adminPassword: newPass }));
  };

  const importData = (newData) => {
    setData(newData);
  };

  return { 
    data, 
    cart,
    updateService, 
    addService, 
    deleteService, 
    updateSocial,
    updatePixKey,
    addReview,
    deleteReview,
    addEvent,
    updateEvent,
    deleteEvent,
    addToCart,
    removeFromCart,
    decrementCartItem,
    clearCart,
    updateAdminPassword,
    importData
  };
}
