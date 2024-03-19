// toggleVisibility.js
function toggleVisibility(id, event) {
    event.stopPropagation(); // Prevent the click from triggering parent folders
    var element = document.getElementById(id);
    var directory = document.getElementById('dir-' + id);
    
    // Determine if we are opening or closing the folder
    var isOpening = element.style.maxHeight === '0px' || element.style.maxHeight === '';
    
    // Immediately toggle the folder's state
    directory.classList.toggle('open', isOpening);
    
    if (isOpening) {
        // Open the folder
        element.style.maxHeight = `${element.scrollHeight}px`;
    } else {
        // Close the folder
        element.style.maxHeight = '0px';
    }
    
    // If opening, adjust the parent heights after a brief delay to allow for transition
    if (isOpening) {
        setTimeout(() => {
            adjustParentHeights(element);
        }, 0); // Using timeout to ensure the DOM has updated
    }
}

function adjustParentHeights(element) {
    let parentElement = element.parentElement;
    while (parentElement && !parentElement.classList.contains('content')) {
        if (parentElement.classList.contains('folder-content')) {
            // Set maxHeight to 'none' to accommodate expanded content
            parentElement.style.maxHeight = 'none';
        }
        parentElement = parentElement.parentElement;
    }
}

