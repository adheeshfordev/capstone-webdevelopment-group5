import React from 'react';

const Banner = () => {
  return (
    <div style={styles.banner}>
      <a href="/shop" style={styles.button}>Shop from our collection of games</a>
    </div>
  );
};

const styles = {
  banner: {
    height: '100vh', // Full viewport height
    backgroundImage: 'url("src/images/banner.jpg")', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: '20px',
    fontSize: '18px',
    backgroundColor: '#3b5d50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    textDecoration: 'none'
  },
};

export default Banner;
