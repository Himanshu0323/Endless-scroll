const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'GMP7iqPUM6yLEjQgFqkB0nQ7a9CFAIsmeef6-pkCtGc';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded (){
    imageLoaded++;
    console.log(imageLoaded);
    if(imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}
// Helper Funtion to Set Attribute on DOM Elements
function setAttribute (element, attributes){
    for (const key in attributes){
     element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos , Add to DOM
function displayPhotos(){
    imageLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run functionfor each objects in photosArray
    photosArray.forEach((photo) => {
        // Create anchor element to link to pixabay
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_desciption,
        })
        // Event listener ,check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put imgage  inside anchor elment ,then put both inside imageContainer Element 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        console.log(photosArray);
    }
    catch(error){
        console.error('Error fetching image', error);
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
        console.log('load more');
    }
});

// On Load
getPhotos();