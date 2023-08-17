import validateField from "./validateField";
import createBreed from "./createBreed";

export const handleInputChange = (event, formData, setFormData, setErrors) => {
    const { name, value } = event.target;

    if (name.startsWith("weight.") || name.startsWith("height.")) {
        const fieldNameParts = name.split(".");
        const fieldCategory = fieldNameParts[0];
        const subFieldName = fieldNameParts[1];

        setFormData((prevData) => ({
            ...prevData,
            [fieldCategory]: {
                ...prevData[fieldCategory],
                [subFieldName]: value.toString(),
            },
        }));
    } else {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    const errors = validateField(name, value, formData);
    setErrors(errors);
};

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_dog_image"); // Set the upload preset here

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dxaj4cgeb/image/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log(data.secure_url)
        return data.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
        throw error;
    }
};


export const handleImageChange = async (event, setFormData, setImagePreview, formData, setErrors) => {
    const file = event.target.files[0]; // Get the selected file from the input
    if (!file) {
        return;
    }

    try {
        const imageUrl = await uploadImage(file);
        console.log(imageUrl)
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: imageUrl,
        }));
        setImagePreview(imageUrl);
    } catch (error) {
        console.error("Error uploading image:", error);
    }
    const errors = validateField(null, null, formData);
    setErrors(errors);
};




export const handleSubmit = async (event, formData, navigate, setErrors) => {
    event.preventDefault();
    
    // Validar campos vacíos
    const errors = validateField(null, null, formData);

    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return; // Detener el envío del formulario si hay campos vacíos
    }

    // Convert height and weight objects to strings in the desired format
    const heightString = `${formData.height.min} - ${formData.height.max}`;
    const weightString = `${formData.weight.min} - ${formData.weight.max}`;

    const formDataToSend = {
        ...formData,
        height: heightString,
        weight: weightString,
    };

    try {
        const response = await createBreed(formDataToSend); // Supongo que tienes la función createBreed para enviar la información
        // Realizar cualquier otro manejo necesario de la respuesta
        
        navigate("/home"); // Redirigir después de enviar el formulario
    } catch (error) {
        console.error("Error:", error);
    }
};

