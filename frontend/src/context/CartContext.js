import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i._id === action.payload._id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i._id === action.payload._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i._id !== action.payload) };
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map(i =>
          i._id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case 'DECREMENT': {
      const item = state.items.find(i => i._id === action.payload);
      if (item.quantity === 1) {
        return { ...state, items: state.items.filter(i => i._id !== action.payload) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i._id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem     = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem  = (id)      => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const increment   = (id)      => dispatch({ type: 'INCREMENT', payload: id });
  const decrement   = (id)      => dispatch({ type: 'DECREMENT', payload: id });
  const clearCart   = ()        => dispatch({ type: 'CLEAR_CART' });

  const totalItems  = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice  = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, increment, decrement, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
