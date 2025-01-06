import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCog } from 'react-icons/fa';
import { FiChevronsDown } from "react-icons/fi";
import { FaPenNib } from "react-icons/fa6";
import { GiTargetShot } from "react-icons/gi";
import { BsDatabaseFillUp, BsDatabaseFill } from "react-icons/bs";

import './VerticalBar.css';

const VerticalBar = () => {
    const [buttonCollapse, setButtonCollapse] = React.useState(false);

    const collapseButtonHandler = () => {
        setButtonCollapse((btnState) => !btnState);
    }

    return (
        <>
        <div className='collapse-btn'>
            <button className='clp-btn' onClick={collapseButtonHandler}> <FiChevronsDown /> </button>
        </div>
        <AnimatePresence>
            {buttonCollapse && 
            <motion.div 
                className="vertical-bar"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.div className="icon drawing-icon" whileHover={{ scale: 1.2 }}>
                <FaPenNib />
              </motion.div>
              <motion.div className="icon" whileHover={{ scale: 1.2 }}>
                <BsDatabaseFill />
              </motion.div>
              <motion.div className="icon" whileHover={{ scale: 1.2 }}>
                <BsDatabaseFillUp />
              </motion.div>
              <motion.div className="icon" whileHover={{ scale: 1.2 }}>
                <GiTargetShot />
              </motion.div>
              <motion.div className="icon setting" whileHover={{ scale: 1.2 }}>
                <FaCog />
              </motion.div>
            </motion.div>
            }
        </AnimatePresence>
        </>
    );
};

export default VerticalBar;
