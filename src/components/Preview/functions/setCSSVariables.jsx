const setCSSVariables = (variables) => {
    for (const [key, value] of Object.entries(variables)) {
        const mainDiv = document.getElementById("idPreview"); // Lấy phần tử có id="mainID"
        if (mainDiv) {
            mainDiv.style.setProperty(key, value); // Gán giá trị cho --new-width
        }
    }
}

export default setCSSVariables
