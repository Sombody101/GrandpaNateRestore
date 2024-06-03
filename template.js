function appendNav() {
    let found_navs = document.getElementsByTagName("nav");
    if (found_navs.length < 1) return; // No nav template tag found

    let nav = found_navs[0];

    nav.setAttribute("data-bs-theme", "dark")
    nav.classList.add("navbar", "navbar-expand-lg")
    nav.innerHTML = `<div class="container-fluid">
    <a class="navbar-brand" href="#">Grandpa Nate</a>

    <button class="navbar-toggler fg-body-tertiary" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">
        </span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Pages
                </a>
                <ul class="dropdown-menu">
                    <li>
                        <a class="dropdown-item" href="./directory.html">Directory</a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li>
                        <a class="dropdown-item" href="https://github.com/Sombody101/GrandpaNateRestore">
                            See page source (GitHub)
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>`;
}

function addFooter() {
    let found_footers = document.getElementsByTagName("footer");
    if (found_footers.length < 1) return; // No footer template tag found

    let footer = found_footers[0];
    footer.classList.add("shadow-lg");
    footer.innerHTML = `<div class="container">
    <h5 class="my-2">
        In loving memory of Nate Hughes.
    </h5>

    <div class="content d-flex flex-column flex-sm-row justify-content-around align-items-center">
        <div>
            <h4 class="mt-2">Temporary</h4>
        </div>

        <div>
            <h4 class="mt-2">Temporary</h4>
        </div>
    </div>

    <div style="margin-top: 30px;">
        <small>Copyright &copy; 2024, The Heyborne Family.</small>
    </div>
</div>`;
}

// Resolve templates
appendNav();
addFooter();
