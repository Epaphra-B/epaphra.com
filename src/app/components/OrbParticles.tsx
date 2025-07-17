"use client";
// OrbParticles.tsx (if using OrbParticles.module.scss)
import React from 'react';
// import styles from './OrbParticles.module.scss'; // Import the CSS module
import styles from '@/app/components/OrbParticles.module.scss';

interface OrbParticlesProps {
  totalParticles?: number;
}

const OrbParticles: React.FC<OrbParticlesProps> = ({
  totalParticles = 300,
}) => {
  return (
    <>
      {/* Global styles (best in globals.css or layout.tsx) */}
      <style global jsx>{`
        html, body {
          height: 100%;
        }
        body {
          background: black;
          overflow: hidden;
        }
      `}</style>

      <div className={styles.wrap}>
        {Array.from({ length: totalParticles }).map((_, index) => (
          <div key={index} className={styles.c}></div>
        ))}
      </div>
    </>
  );
};

export default OrbParticles;