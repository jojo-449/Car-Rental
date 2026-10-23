import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { wishlistApi } from '../api';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState([]);

  const refresh = useCallback(() => {
    wishlistApi.list().then(setItems).catch(() => {});
  }, []);

  useEffect(() => {
    if (user) refresh();
    else setItems([]);
  }, [user, refresh]);

  const ids = useMemo(() => items.map((i) => i.car_id), [items]);

  // returns false when the visitor must log in first
  const toggle = useCallback(
    async (carId) => {
      if (!user) {
        navigate('/login', { state: { from: location.pathname + location.search } });
        return false;
      }
      await wishlistApi.toggle(carId);
      refresh();
      return true;
    },
    [user, navigate, location, refresh]
  );

  const value = useMemo(() => ({ items, ids, toggle, refresh }), [items, ids, toggle, refresh]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
