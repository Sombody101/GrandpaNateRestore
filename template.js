/*
 * Returns the first instance of a tag by name, or false if none is found
 */
function getTemplate(tag_name) {
    let found_tags = document.getElementsByTagName(tag_name);
    if (found_tags.length < 1) return false; // No footer template tag found

    return found_tags[0] || false; // Return false if null
}

/*
 * Get the template source from "./templates"
 */
function setTemplateSource(filePath, target) {
    return fetch("/templates/" + filePath)
        .then((response) => response.text())
        .then((htmlString) => {
            target.innerHTML = htmlString
        })
        .catch((error) => console.error(error));
}

/*
 * Find and replace the first nav tag with the full nav template
 */
function appendNav() {
    let nav = getTemplate("nav");
    if (!nav) return;

    nav.setAttribute("data-bs-theme", "dark");
    nav.classList.add("navbar", "navbar-expand-lg");
    setTemplateSource("nav.html", nav)
}

/*
 * Find and replace the first footer tag with the full footer template
 */
function addFooter() {
    let footer = getTemplate("footer");
    if (!footer) return;

    footer.classList.add("shadow-lg");
    setTemplateSource("footer.html", footer)
}

/*
 * Find and replace the first bs-import tag with the full bs-import template
 */
function addBootStrap() {
    let bs = getTemplate("bs-import");
    if (!bs) return;

    setTemplateSource("bs.html", bs)
}

// Resolve templates
appendNav();
addFooter();
// addBootStrap();
// addAOS();
