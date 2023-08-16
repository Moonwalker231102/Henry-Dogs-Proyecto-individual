import React, { useState, useEffect } from "react";
import styles from "./CreateBreedForm.module.css";

import getTemperaments from "../../utils/getTemperaments";
import {
    handleInputChange,
    handleImageChange,
    handleSubmit,
} from "../../utils/EventHandlers"
import InputField from "../../components/InputFIeld/InputField";
import TemperamentModal from "../../components/TemperamentModal/TemperamentModal";


const CreateBreedForm = () => {
    const [formData, setFormData] = useState({
        image: null,
        name: "",
        height: {
            min: "",
            max: "",
        },
        weight: {
            min: "",
            max: "",
        },
        life_span: "",
        temperament: []
    });

    const [temperaments, setTemperaments] = useState([]);
    
    const [showModal, setShowModal] = useState(false);
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    useEffect(() => {
        async function fetchTemperaments() {
            try {
                const temperamentsData = await getTemperaments();
                setTemperaments(temperamentsData);
                console.log("Selected Temperaments:", selectedTemperaments);
            } catch (error) {
                console.error("Error fetching temperaments:", error);
            }
        }
        fetchTemperaments();
    }, [selectedTemperaments]);
    const [errors, setErrors] = useState({
        image: "",
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: "",
    });

    return (
        <form onSubmit={(event) => handleSubmit(event, formData, setErrors)}>
            <div className={styles.fileInputContainer}>
                <label htmlFor="image" className={styles.fileInputLabel}>
                    Seleccionar Imagen
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(event) => handleImageChange(event, setFormData, setImagePreview)}
                    className={styles.fileInput}
                />
                {errors.image && <div className={styles.error}>{errors.image}</div>}
                {imagePreview && <img src={imagePreview} alt="Vista previa" className={styles.image} />}
            </div>
            <InputField
                label="Nombre"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(event) => handleInputChange(event, formData, setFormData, setErrors)}
                error={errors.name}
            />
            <InputField
                label="Min height"
                id="height.min"
                name="height.min"
                type="number"
                value={formData.height.min}
                onChange={(event) => handleInputChange(event, formData, setFormData, setErrors)}
                error={errors["height.min"]}
            />
            <InputField
                label="Max height"
                id="height.max"
                name="height.max"
                type="number"
                value={formData.height.max}
                onChange={(event) => handleInputChange(event, formData, setFormData, setErrors)}
                error={errors["height.max"]}
            />
            <InputField
                label="Min weight"
                id="weight.min"
                name="weight.min"
                type="number"
                value={formData.weight.min}
                onChange={(event) => handleInputChange(event, formData, setFormData, setErrors)}
                error={errors["weight.min"]}
            />
            <InputField
                label="Max weight"
                id="weight.max"
                name="weight.max"
                type="number"
                value={formData.weight.max}
                onChange={(event) => handleInputChange(event, formData, setFormData, setErrors)}
                error={errors["weight.max"]}
            />
            <InputField
                label="Lifespan"
                id="life_span"
                name="life_span"
                type="text"
                value={formData.life_span}
                onChange={(event) => handleInputChange(event, formData, setFormData, setErrors)}
                error={errors["life_span"]}
            />
            <button
                type="button"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Seleccionar Temperamentos
            </button>

            <TemperamentModal
                options={temperaments}
                onSelect={(temperament) => {
                    if (!selectedTemperaments.includes(temperament)) {
                        setSelectedTemperaments((prevTemperaments) => [...prevTemperaments, temperament]);
                    }
                }}
                showModal={showModal}
                onClose={() => {
                    setShowModal(false);
                    setFormData((prevData) => ({ ...prevData, temperament: selectedTemperaments }));
                }}
                selectedTemperaments={selectedTemperaments}
            />


            <h2>Temperamentos seleccionados:</h2>
            <ul>
                {formData.temperament.map((temp, index) => (
                    <li key={index}>{temp}</li>
                ))}
            </ul>

            <button type="submit">Create breed</button>
        </form>
    );
};

export default CreateBreedForm;
