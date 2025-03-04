const setCSSVariables = (variables) => {
    for (const [key, value] of Object.entries(variables)) {
        document.documentElement.style.setProperty(key, value);
    }
}

export default setCSSVariables
