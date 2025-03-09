const setCSSVariables = (variables) => {
    for (const [key, value] of Object.entries(variables)) {
        const mainDiv = document.getElementById("idPreview"); 
        if (mainDiv) {
            mainDiv.style.setProperty(key, value);
        }
    }
}

export default setCSSVariables
