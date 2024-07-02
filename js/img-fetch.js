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
    var input = searchbar.value;
    if (input == "") {
        console.log("Searchbar empty : Aborting search request");
        return;
    }

    console.error("Search not implemented yet");
}

function handleSearch(event) {
    if (event.keyCode === 13) {
        searchImages();
    }
}

// Load the card template once (so we're not fetching for every use)
let template;
const searchbar = document.getElementById("searchbar");
const card_conatiner = document.getElementById("image_card_container");

let jindex;
let reloadLimit;

let cardCache = [];
let loadedImages = 0;

async function renderImages(count = reloadLimit) {
    const jindex_images = jindex["images"];
    const jindex_length = jindex_images.length;

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

        const image_handle = url + image_info["image"];

        let card_copy = template;
        card_copy = card_copy
            .replace(card_image, image_handle)
            .replace(card_title, image_info["title"])
            .replace(card_description, image_info["description"]) // Needs to be done twice (For image alt)
            .replace(card_description, image_info["description"]);

        cardCache.push(card_copy);
        card_conatiner.innerHTML += card_copy;

        ++loadedImages;
    }
}

async function start() {
    jindex = await getIndexFile();
    template = await getTemplateSource("card.html");

    reloadLimit = jindex["request-limit"];

    // Load first reloadLimit images
    renderImages();
}

start();
