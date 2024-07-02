/**
 * 
 * @param {string} tag_name 
 * @returns The first instance of a tag by name, or false if none is found
 */
function getTemplate(tag_name) {
    let found_tags = document.getElementsByTagName(tag_name);
    if (found_tags.length < 1) return false; // No footer template tag found

    return found_tags[0] || false; // Return false if null
}

/**
 * 
 * @param {*} filepath 
 * @returns The HTML document as a string
 */
async function getTemplateSource(filepath) {
    try {
        return await fetch("/templates/" + filepath).then((response) =>
            response.text()
        );
    } catch (error) {
        return console.error(error);
    }
}

/**
 * 
 * @param {string} filepath 
 * @param {Element} target 
 * @returns The template source from "./templates"
 */
async function setTemplateSource(filepath, target) {
    try {
        target.innerHTML += await getTemplateSource(filepath);
    } catch (error) {
        return console.error(error);
    }
}

function appendNav() {
    let nav = getTemplate("nav");
    if (!nav) return;

    nav.setAttribute("data-bs-theme", "dark");
    nav.classList.add("navbar", "navbar-expand-lg");
    setTemplateSource("nav.html", nav);
}

function addFooter() {
    let footer = getTemplate("footer");
    if (!footer) return;

    footer.classList.add("shadow-lg", "footer", "py-3");
    setTemplateSource("footer.html", footer);
}

function addCSS() {
    let css = getTemplate("css-import");
    if (!css) return;

    console.log("Adding css");
    setTemplateSource("css.html", css);
}

// Resolve templates
appendNav();
addFooter();
addCSS();
