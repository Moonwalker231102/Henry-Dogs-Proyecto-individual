const validateField = (name, value, formData) => {
    const errors = {}


    for (const key in formData) {
        if (key in formData) {
            if (formData[key] === null || formData[key] === "") {
                errors[key] = "Este campo no puede quedar vacío.";
            }
        }
    }
    switch (name) {
        case "name":
            if (!value) {
                errors.name = "El nombre es obligatorio.";
            } else if (/\d/.test(value)) {
                errors.name = "El nombre no puede contener números.";
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
            } else if (/[^0-9.]/.test(value)) {
                errors[name] = "Ingrese solo números.";
            } else {
                errors[name] = "";
                const fieldNameParts = name.split(".");
                const fieldCategory = fieldNameParts[0];

                if (
                    formData[fieldCategory].min !== "" &&
                    formData[fieldCategory].max !== "" &&
                    Number(formData[fieldCategory].max) <= Number(formData[fieldCategory].min)
                ) {
                    errors[`${fieldCategory}.max`] = "El valor máximo no puede ser menor o igual que el valor mínimo.";
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
            if (value.length < 3) {
                errors.temperament = "Seleccione al menos 3";
            } else {
                errors.temperament = "";
            }
            break;

        default:
            break;
    }
    return errors;
};

export default validateField;
