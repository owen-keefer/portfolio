const previewLink = document.getElementById("preview-link");
const previewImage = document.getElementById("preview-image");
const previewTitle = document.getElementById("preview-title");
const previewCaption = document.getElementById("preview-caption");

const selectorElements = document.body.querySelectorAll(".mobile-selector");
const buttonElements = document.body.querySelectorAll(".thumbnail-button")

var currentkey;
var nextkey;
var prevkey;

const mobileNext = document.getElementById('mobile-next');
if (mobileNext){
    mobileNext.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        mobileScroll(selectorElements[nextkey]);
    });
};

const mobilePrev = document.getElementById('mobile-prev')
if (mobilePrev){
    mobilePrev.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        mobileScroll(selectorElements[prevkey]);
    });
};

if (selectorElements[0]){mobileScroll(selectorElements[0])};


function makeActive(button) {
    var src = button.getAttribute("data-src");
    var page_link = button.getAttribute("data-href");
    var title = button.getAttribute("data-title");
    var caption = button.getAttribute("data-caption");

    previewLink.classList.add("blackout")
    var temp = new Image();
    temp.src = src;

    temp.onload = () => {
        previewLink.href = page_link;
        previewLink.title = title;
        previewImage.src = src;
        previewImage.alt = title;
        previewTitle.innerText = title;
        previewCaption.innerText = caption;

        previewLink.classList.remove("blackout")
    };


    
};

function mobileScroll(button){
    var index = button.getAttribute("data-src");

    selectorElements.forEach(element => {
        element.classList.remove('active');
    });

    button.classList.add('active');

    makeActive(buttonElements[index]);

    currentkey = parseInt(index);

    if (currentkey == (buttonElements.length-1)) nextkey = 0;
    else nextkey = currentkey + 1;

    if(currentkey==0) prevkey = (buttonElements.length-1);
    else prevkey = currentkey-1;
}

document.addEventListener("DOMContentLoaded", function() {
    buttonElements.forEach(element => {
        element.addEventListener("focus", () => makeActive(element));
        element.addEventListener("mouseenter", () => makeActive(element));
    });

    selectorElements.forEach(element => {
        element.addEventListener("click", () => mobileScroll(element));
    });
});