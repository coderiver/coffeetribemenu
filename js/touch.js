// grab an element which you can click just as an example
// var clickable = document.getElementById("clickableItem"),
var clickable = document.querySelector(".menu-container"),
// set up some variables that we need for later
currentElement,
clickedElement;

// set up touchStart event handler
var onTouchStart = function(e) {
    // store which element we're currently clicking on
    clickedElement = this;
    // listen to when the user moves finger
    this.addEventListener("touchMove", onTouchMove);
    // add listener to when touch end occurs
    this.addEventListener("touchEnd", onTouchEnd);
};
// when the user swipes, update element positions to swipe
var onTouchMove = function(e) {
    // ... do your scrolling here

    // store current element
    currentElement = document.elementFromPoint(x, y);
    // if the current element is no longer the same as we clicked from the beginning, remove highlight
    if(clickedElement !== currentElement) {
        removeHighlight(clickedElement);
    }
};
// this is what is executed when the user stops the movement
var onTouchEnd = function(e) {
    if(clickedElement === currentElement) {
        removeHighlight(clickedElement);
        // .... execute click action
    }

    // clean up event listeners
    this.removeEventListener("touchMove", onTouchMove);
    this.removeEventListener("touchEnd", onTouchEnd);
};
function addHighlight(element) {
    element.className = "highlighted";
}
function removeHighlight(element) {
    element.className = "";
}

clickable.addEventListener("touchStart", onTouchStart);