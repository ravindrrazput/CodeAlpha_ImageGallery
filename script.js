// =====================================
// COLORFRAME - IMAGE GALLERY
// =====================================


// 1. IMAGE DATA

const images = [

    {
        title: "Mountain Escape",
        category: "nature",
        location: "Switzerland",
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000"
    },

    {
        title: "Ocean Paradise",
        category: "nature",
        location: "Maldives",
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000"
    },

    {
        title: "City Architecture",
        category: "architecture",
        location: "Dubai",
        src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1000"
    },

    {
        title: "Beautiful Streets",
        category: "travel",
        location: "Italy",
        src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1000"
    },

    {
        title: "Forest Journey",
        category: "nature",
        location: "Canada",
        src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1000"
    },

    {
        title: "Modern Buildings",
        category: "architecture",
        location: "Singapore",
        src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1000"
    },

    {
        title: "Desert Adventure",
        category: "travel",
        location: "Dubai",
        src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1000"
    },

    {
        title: "Green Mountains",
        category: "nature",
        location: "Norway",
        src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000"
    },

    {
        title: "City Lights",
        category: "architecture",
        location: "New York",
        src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1000"
    }

];


// 2. SELECT HTML ELEMENTS

const galleryGrid = document.getElementById("galleryGrid");

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxLocation = document.getElementById("lightboxLocation");

const closeButton = document.getElementById("closeLightbox");

const prevButton = document.getElementById("prevImage");

const nextButton = document.getElementById("nextImage");


// 3. CURRENT GALLERY DATA

let currentImages = [];

let currentIndex = 0;


// 4. DISPLAY IMAGES

function displayImages(imageList) {

    galleryGrid.innerHTML = "";

    currentImages = imageList;

    imageList.forEach((image, index) => {

        const card = document.createElement("div");

        card.classList.add("gallery-card");

        card.innerHTML = `

            <img
                src="${image.src}"
                alt="${image.title}"
                loading="lazy"
            >

            <div class="image-info">

                <h3>${image.title}</h3>

                <p>${image.location}</p>

            </div>

        `;

        // Open lightbox when image is clicked

        card.addEventListener("click", () => {

            openLightbox(index);

        });

        galleryGrid.appendChild(card);

    });

}


// 5. FILTER FUNCTIONALITY

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        // Activate selected button

        button.classList.add("active");


        // Get selected category

        const category = button.dataset.category;


        // Show all images

        if (category === "all") {

            displayImages(images);

        }

        // Show filtered images

        else {

            const filteredImages = images.filter((image) => {

                return image.category === category;

            });

            displayImages(filteredImages);

        }

    });

});


// 6. OPEN LIGHTBOX

function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";

}


// 7. UPDATE LIGHTBOX CONTENT

function updateLightbox() {

    const image = currentImages[currentIndex];

    if (!image) return;

    lightboxImage.src = image.src;

    lightboxImage.alt = image.title;

    lightboxTitle.textContent = image.title;

    lightboxLocation.textContent = image.location;

}


// 8. CLOSE LIGHTBOX

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}


// 9. NEXT IMAGE

function nextImage() {

    currentIndex++;

    if (currentIndex >= currentImages.length) {

        currentIndex = 0;

    }

    updateLightbox();

}


// 10. PREVIOUS IMAGE

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentImages.length - 1;

    }

    updateLightbox();

}


// 11. BUTTON EVENTS

closeButton.addEventListener("click", closeLightbox);

nextButton.addEventListener("click", nextImage);

prevButton.addEventListener("click", previousImage);


// 12. CLOSE WHEN BACKGROUND IS CLICKED

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// 13. KEYBOARD CONTROLS

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") {

        closeLightbox();

    }

    if (event.key === "ArrowRight") {

        nextImage();

    }

    if (event.key === "ArrowLeft") {

        previousImage();

    }

});


// 14. DISPLAY ALL IMAGES INITIALLY

displayImages(images);