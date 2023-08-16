const validateField = (name, value, setErrors, formData) => {
    const errors = { ...setErrors };

    switch (name) {
        case "image":
            if (!value) {
                errors.image = "Por favor, seleccione una imagen.";
            } else {
                errors.image = "";

                const maxSizeInBytes = 3 * 1024 * 1024; // 3 megabytes
                if (value.size > maxSizeInBytes) {
                    errors.image = "El tamaño de la imagen no debe superar los 3 megabytes.";
                }
            }
            break;

        case "name":
            if (!value) {
                errors.name = "El nombre es obligatorio.";
            } else {
                errors.name = "";
            }
            break;

        case "height.min":
        case "height.max":
        case "weight.min":
        case "weight.max":
            if (isNaN(value) || value.trim() === "") {
                errors[name] = "Ingrese un valor numérico válido.";
            } else {
                errors[name] = "";

                const fieldNameParts = name.split(".");
                const fieldCategory = fieldNameParts[0];
                const subFieldName = fieldNameParts[1];

                if (
                    formData[fieldCategory].min !== "" &&
                    formData[fieldCategory].max !== "" &&
                    Number(formData[fieldCategory].max) <= Number(formData[fieldCategory].min)
                ) {
                    errors[`${fieldCategory}.max`] = "El valor máximo no puede ser menor que el valor mínimo.";
                }
            }
            break;

        case "life_span":
            if (!value) {
                errors.life_span = "La esperanza de vida es obligatoria.";
            } else {
                errors.life_span = "";
            }
            break;

        case "temperament":
            if (value.length === 0) {
                errors.temperament = "Seleccione al menos un temperamento.";
            } else {
                errors.temperament = "";
            }
            break;

        default:
            break;
    }

    setErrors(errors);
};

export default validateField;
