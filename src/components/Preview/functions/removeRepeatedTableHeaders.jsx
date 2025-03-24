const removeRepeatedTableHeaders = () => {
    document.querySelectorAll("table[repeated-headers]").forEach((table) => {
        table.removeAttribute("repeated-headers");
        // Remove all thead elements from the table
        table.querySelectorAll("thead").forEach((thead) => thead.remove());

        // Optionally, remove extra colgroups if needed
        table.querySelectorAll("colgroup").forEach((colgroup) => colgroup.remove());
    });
};

export default removeRepeatedTableHeaders;