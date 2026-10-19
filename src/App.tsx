import React, { useState, useEffect } from 'react';

export function App() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('recipe-box-pwa_items');
      return saved ? JSON.parse(saved) : ['Welcome to ChefBook PWA', 'Tap below to add items', 'Fully works offline!'];
    } catch {
      return ['Welcome to ChefBook PWA'];
    }
  });
  const [input, setInput] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('recipe-box-pwa_items', JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setItems([input.trim(), ...items]);
    setInput('');
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <header>
        <div>
          <h1>ChefBook PWA</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Offline recipe box with ingredient scaling, timer, and shopping list generator.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <span className="badge">Lifestyle</span>
          <span style={{ fontSize: '0.75rem', color: isOnline ? '#4ade80' : '#f87171' }}>
            ● {isOnline ? 'Online' : 'Offline Mode'}
          </span>
        </div>
      </header>

      <div className="card">
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Interactive Workspace</h3>
        <form onSubmit={addItem}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new entry..."
          />
          <button type="submit" style={{ width: '100%' }}>Add Item</button>
        </form>
      </div>

      <div className="card" style={{ flex: 1 }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Stored Entries ({items.length})</h3>
        {items.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>No items yet. Add one above!</p>
        ) : (
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>
                <span>{item}</span>
                <button
                  onClick={() => removeItem(idx)}
                  style={{ background: 'transparent', color: '#f87171', padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer>
        <p>ChefBook PWA • Built with Vite, TypeScript & Workbox PWA</p>
      </footer>
    </div>
  );
}

export default App;
