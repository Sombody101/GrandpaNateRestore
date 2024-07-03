const _debug = false;

// Template keywords
const card_image = "%IMAGE%";
const card_title = "%TITLE%";
const card_description = "%DESCRIPTION%";
//

const url = _debug
    ? "/assets/mass_photos/"
    : "https://cdn.jsdelivr.net/gh/Sombody101/GrandpaNateRestore@master/assets/mass_photos/";

if (!getTemplateSource) {
    console.error("/template.js not imported");
}

/**
 *
 * @param {string} image_name
 * @returns The image object URL to be placed in the BS card
 */
async function getImageHandle(image_name) {
    try {
        var img_blob_url = await fetch(url + image_name).then((response) => {
            return URL.createObjectURL(response.blob());
        });

        return img_blob_url;
    } catch (error) {
        console.error(error.message);
    }
}

/**
 *
 * @returns The JSON data for the images to be loaded
 */
async function getIndexFile() {
    try {
        let output = await fetch(url + "image-index.json").then((response) =>
            response.json()
        );

        return output;
    } catch (error) {
        console.error(error.message);
    }
}

async function searchImages() {
    // Filter terms: name, title, desc/description
    const searchParts = searchbar.value
        .split(":")
        .map((part) => part.trim().toLowerCase()); // Split and lowercase
    const searchPrefix = searchParts[0]; // First part is the prefix
    const input = searchParts.length > 1 ? searchParts[1] : ""; // Optional search term

    const propertyMap = {
        image: "image",
        desc: "description",
        description: "description",
        description: "desc",
    };

    const prop_filter = propertyMap[searchPrefix] || "";

    if (input == "") {
        console.log(
            "Searchbar empty : Aborting search request and resetting cards"
        );
        
        __searchEnabled = false;

        card_container.innerHTML = "";
        loadedImages = 0;
        renderImages();

        return;
    }

    __searchEnabled = true;

    let cards = await jindex["images"].filter((element) =>
        prop_filter
            ? Object.values(element).some(
                  (value) => typeof value === "string" && value.includes(input)
              )
            : element[prop_filter].includes(input)
    );

    card_container.innerHTML = "";

    cards.forEach((card_element) => {
        renderCard(card_element);
    });
}

function handleSearch(event) {
    if (event.keyCode === 13) {
        searchImages();
    }
}

// Load the card template once (so we're not fetching for every use)
let template;
const searchbar = document.getElementById("searchbar");
const card_container = document.getElementById("image_card_container");

let __renderDebounce = false;
let __searchEnabled;

let jindex;
let reloadLimit;

let loadedImages = 0;

async function renderCard(image_info) {
    const image_handle = url + image_info["image"];

    let card_copy = template;
    card_copy = card_copy
        .replace(card_image, image_handle)
        .replace(card_title, image_info["title"])
        .replace(card_description, image_info["description"]) // Needs to be done twice (For image alt, then description)
        .replace(card_description, image_info["description"]);

    card_container.innerHTML += card_copy;
}

async function renderImages(count = reloadLimit) {
    if (__renderDebounce) return;
    __renderDebounce = true;

    const jindex_images = jindex["images"];
    const jindex_length = jindex_images.length;

    console.log(
        `Requesting ${count} images (currently ${loadedImages}, max ${jindex_length})`
    );

    for (i = 0; i < count; ++i) {
        if (loadedImages == jindex_length) {
            console.warn(
                "Image index is shorter than render request (Currently loaded: " +
                    loadedImages +
                    ")"
            );
            return;
        }

        const image_info = jindex_images[i];
        renderCard(image_info);

        ++loadedImages;
    }

    __renderDebounce = false;
}

async function start() {
    jindex = await getIndexFile();
    template = await getTemplateSource("card.html");

    reloadLimit = jindex["batch_call_size"] || jindex["request-limit"];

    // Load first reloadLimit images
    renderImages();
}

start();

window.addEventListener("scroll", () => {
    if (__searchEnabled) return;

    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Check if the user is close to the bottom of the page
    if (scrollTop + windowHeight >= documentHeight - 100) {
        renderImages();
    }
});
