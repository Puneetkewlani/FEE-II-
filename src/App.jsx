  import React from 'react';
import home from './Home';
import about from './about';
import product from './Product';
import Counter from './Counter';

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#333',
          color: '#fff',
          padding: '12px 24px',
        }}
      >
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>MyApp</div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Services</a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
        </div>

        <button
          style={{
            background: '#4CAF50',
            color: '#fff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </nav>

      <div style={{ padding: '20px' }}>
        <Counter />
      </div>
    </div>
  );
}
