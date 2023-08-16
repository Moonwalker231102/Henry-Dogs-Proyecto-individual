import React from "react";
import styles from "./TemperamentModal.module.css";

const TemperamentModal = ({ options, onSelect, showModal, onClose}) => {
    if (!showModal) {
        return null; // No muestra el modal si showModal es falso
    }
    
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Seleccione temperamentos:</h2>
                <div className={styles.columnContainer}>
                    {options.map((option) => (
                        <div key={option.id} className={styles.temperamentItem}>
                            <input
                                type="checkbox" // Cambiar a checkbox
                                id={`temperament_${option.id}`}
                                name="temperament"
                                value={option.name}
                                onChange={() => onSelect(option.name)}
                            />
                            <label htmlFor={`temperament_${option.id}`}>
                                {option.name}
                            </label>
                        </div>
                    ))}
                </div>
                <button onClick={onClose}>Close</button> {/* Agregar botón de cierre */}
            </div>
        </div>
    );
};

export default TemperamentModal;

