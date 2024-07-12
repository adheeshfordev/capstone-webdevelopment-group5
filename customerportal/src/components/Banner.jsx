import React from 'react';

const Banner = () => {
  return (
    <div style={styles.banner}>
      <button style={styles.button}>Shop from our collection of games</button>
    </div>
  );
};

const styles = {
  banner: {
    height: '100vh', // Full viewport height
    backgroundImage: 'url("path/to/your/image.jpg")', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#ff6600',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default Banner;
