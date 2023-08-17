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
import { useNavigate } from "react-router-dom";

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

    const [errors, setErrors] = useState({
        image: "",
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: "",
    });
    const [temperaments, setTemperaments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate()
    
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (
                formData.name ||
                formData.height.min ||
                formData.height.max ||
                formData.weight.min ||
                formData.weight.max ||
                formData.life_span ||
                selectedTemperaments.length > 0
            ) {
                event.preventDefault();
                event.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        const fetchTemperaments = async () => {
            try {
                const temperamentsData = await getTemperaments();
                setTemperaments(temperamentsData);
            } catch (error) {
                console.error({ error: error.message });
            }
        };
        fetchTemperaments();

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [formData, selectedTemperaments]);

    return (
        <form onSubmit={(event) => handleSubmit(event, formData, navigate, setErrors)} className={styles.form}>
            <h1 className={styles.formTitle}>Create Breed</h1>
            {errors.image && <div className={styles.error}>{errors.image}</div>}
            <div className={styles.fileInputContainer}>
                <label htmlFor="image" className={styles.fileInputLabel}>
                    Select Image
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(event) => handleImageChange(event, setFormData, setImagePreview, formData, setErrors)}
                    className={styles.fileInput}
                />
                {imagePreview && <img src={imagePreview} alt="Vista previa" className={styles.image} />}
            </div >
            <div className={styles.inputContainer}>
                <InputField
                    label="Name"
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
            </div>
            <h2 className={styles.temperamentTitle}>Dog temperament:</h2>
            <ul className={styles.temperamentsContainer}>
                {formData.temperament.map((temp, index) => (
                    <li key={index} className={styles.liItem}>{temp}</li>
                ))}
            </ul>
            <button
                type="button"
                onClick={() => {
                    setShowModal(true);
                }}
                className={styles.selectTempButton}
            >
                Select temperaments
            </button>
            <TemperamentModal
                options={temperaments}
                onSelect={(temperament) => {
                    if (selectedTemperaments.includes(temperament)) {
                        setSelectedTemperaments((prevTemperaments) =>
                            prevTemperaments.filter((temp) => temp !== temperament)
                        );
                        setFormData((prevData) => ({
                            ...prevData,
                            temperament: prevData.temperament.filter((temp) => temp !== temperament),
                        }));
                    } else {
                        setSelectedTemperaments((prevTemperaments) => [...prevTemperaments, temperament]);
                        setFormData((prevData) => ({ ...prevData, temperament: [...prevData.temperament, temperament] }));
                    }
                }}
                showModal={showModal}
                onClose={() => {
                    setShowModal(false);
                    setFormData((prevData) => ({ ...prevData, temperament: selectedTemperaments }));
                }}
                selectedTemperaments={selectedTemperaments}
            />


            <button type="submit" className={styles.submitButton}>Create breed</button>
        </form>
    );
};

export default CreateBreedForm;
