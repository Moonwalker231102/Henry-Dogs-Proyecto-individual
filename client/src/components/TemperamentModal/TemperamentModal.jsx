import React from "react";
import styles from "./TemperamentModal.module.css";

const TemperamentModal = ({ options, onSelect, showModal, onClose, selectedTemperaments }) => {
    if (!showModal) {
        return null; 
    }
    
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Select some temperaments:</h2>
                <div className={styles.columnContainer}>
                    {options.map((option) => (
                        <div key={option.id} className={styles.temperamentItem}>
                            <input
                                type="checkbox" 
                                id={`temperament_${option.id}`}
                                name="temperament"
                                value={option.name}
                                checked={selectedTemperaments.includes(option.name)}
                                onChange={() => onSelect(option.name)}
                            />
                            <label htmlFor={`temperament_${option.id}`}>
                                {option.name}
                            </label>
                        </div>
                    ))}
                </div>
                <button onClick={onClose}>Close</button> 
            </div>
        </div>
    );
};



export default TemperamentModal;

