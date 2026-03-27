import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const floatingAnimation = {
  y: ['-15px', '15px'],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut'
  }
};

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-primary min-h-[85vh] flex items-center justify-center perspective-[1000px]">
      <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left side text */}
        <div className="md:w-1/2 text-center md:text-left z-20">
          <motion.h1 
            initial={{ opacity: 0, rotateX: 90, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-5xl md:text-7xl font-extrabold text-secondary mb-6 leading-tight drop-shadow-sm"
          >
            Direct from <br/><span className="text-highlight">Farm to Table</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-secondary opacity-90 mb-10 font-medium max-w-lg"
          >
            Empowering local agriculture with a 3D marketplace. Connect directly with farmers for fresh produce.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/products">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95, y: 4, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
                className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-xl shadow-[0px_6px_0px_#D84315] hover:shadow-[0px_4px_0px_#D84315] hover:translate-y-[2px] transition-all"
              >
                Browse Fresh Produce
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right side floating 3D elements */}
        <div className="md:w-1/2 relative h-[500px] w-full mt-16 md:mt-0" style={{ transformStyle: 'preserve-3d' }}>
           <motion.div animate={floatingAnimation} className="absolute top-10 left-10 text-9xl drop-shadow-2xl z-20" style={{ filter: 'drop-shadow(10px 10px 10px rgba(0,0,0,0.3))' }}>
             🍎
           </motion.div>
           
           <motion.div 
             animate={{ y: ['20px', '-20px'], rotate: [0, 5, -5, 0] }} 
             transition={{ duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} 
             className="absolute top-48 right-10 text-9xl z-10" style={{ filter: 'drop-shadow(15px 25px 15px rgba(0,0,0,0.25))', transform: 'translateZ(-50px)' }}
           >
             🥕
           </motion.div>
           
           <motion.div 
             animate={{ y: ['-10px', '25px'], rotateZ: [-10, 10] }} 
             transition={{ duration: 3.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} 
             className="absolute bottom-10 left-32 text-8xl z-30" style={{ filter: 'drop-shadow(5px 15px 10px rgba(0,0,0,0.4))', transform: 'translateZ(50px)' }}
           >
             🌾
           </motion.div>
           
           <motion.div 
             animate={{ y: ['15px', '-15px'], rotateY: [0, 30, 0] }} 
             transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} 
             className="absolute top-0 right-40 text-7xl z-0 opacity-90" style={{ filter: 'drop-shadow(20px 20px 20px rgba(0,0,0,0.2))', transform: 'translateZ(-100px)' }}
           >
             🍋
           </motion.div>

           {/* Central Platform Graphic */}
           <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-[40%] left-[20%] w-64 h-64 bg-secondary/10 rounded-full blur-[60px] z-0"
           />
        </div>
      </div>
    </div>
  );
};

export default Hero;
