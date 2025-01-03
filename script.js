/** @format */

// Function to get bookmarks from local storage
// Returns an array of bookmark objects or an empty array if none exist
function getBookmarks() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

// Function to save bookmarks to local storage
// Accepts an array of bookmark objects and stores them as a JSON string
function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Function to toggle visibility of the form and main sections
function displayOrCloseForm() {
  document.getElementById("main-section").classList.toggle("hidden"); // Hide or show main section
  document.getElementById("form-section").classList.toggle("hidden"); // Hide or show form section
}

// Function to toggle visibility of the category and main sections
function displayOrHideCategory() {
  document.getElementById("main-section").classList.toggle("hidden"); // Hide or show main section
  document.getElementById("bookmark-list-section").classList.toggle("hidden"); // Hide or show bookmark list section
}

// Event listener for #add-bookmark-button
// Updates the category name and toggles visibility to display the form
document.getElementById("add-bookmark-button").addEventListener("click", () => {
  const selectedCategory = document.getElementById("category-dropdown").value;
  document.querySelector(".category-name").innerText = selectedCategory; // Update category name display
  displayOrCloseForm(); // Show form and hide main section
});

// Event listener for #close-form-button
// Hides the form section and displays the main section
document
  .getElementById("close-form-button")
  .addEventListener("click", displayOrCloseForm);

// Event listener for #add-bookmark-button-form
// Adds a new bookmark to local storage and resets the form
document
  .getElementById("add-bookmark-button-form")
  .addEventListener("click", () => {
    const name = document.getElementById("name").value.trim(); // Get bookmark name
    const category = document.getElementById("category-dropdown").value; // Get selected category
    const url = document.getElementById("url").value.trim(); // Get bookmark URL

    // Validate that all fields are filled
    if (!name || !url) {
      alert("Please fill in all fields.");
      return;
    }

    const bookmarks = getBookmarks(); // Fetch current bookmarks
    bookmarks.push({ name, category, url }); // Add new bookmark to the array
    saveBookmarks(bookmarks); // Save updated array to local storage

    // Reset input fields
    document.getElementById("name").value = "";
    document.getElementById("url").value = "";

    displayOrCloseForm(); // Hide form and show main section
  });

// Event listener for #view-category-button
// Filters and displays bookmarks for the selected category
document
  .getElementById("view-category-button")
  .addEventListener("click", () => {
    const selectedCategory = document.getElementById("category-dropdown").value;
    document.querySelector(".category-name").innerText = selectedCategory; // Update category name display

    const bookmarks = getBookmarks(); // Fetch current bookmarks
    const filteredBookmarks = bookmarks.filter(
      (bookmark) => bookmark.category === selectedCategory
    ); // Filter by category

    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = ""; // Clear previous list

    if (filteredBookmarks.length === 0) {
      
      // Display message if no bookmarks are found
      categoryList.innerHTML = "<p>No Bookmarks Found</p>";
    } else {

      // Add radio buttons and labels for each bookmark in the category
      filteredBookmarks.forEach((bookmark) => {
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.id = bookmark.name;
        radioButton.value = bookmark.name;
        radioButton.name = "bookmark";

        const label = document.createElement("label");
        label.setAttribute("for", bookmark.name);

        const anchor = document.createElement("a");
        anchor.href = bookmark.url;
        anchor.target = "_blank"; // Open link in new tab
        anchor.innerText = bookmark.name;

        label.appendChild(anchor); // Add anchor to label
        categoryList.appendChild(radioButton); // Add radio button to list
        categoryList.appendChild(label); // Add label to list
        categoryList.appendChild(document.createElement("br")); // Add line break
      });
    }

    displayOrHideCategory(); // Show category list and hide main section
  });

// Event listener for #close-list-button
// Hides the category list section and displays the main section
document
  .getElementById("close-list-button")
  .addEventListener("click", displayOrHideCategory);

// Event listener for #delete-bookmark-button
// Deletes the selected bookmark and updates the displayed list
document
  .getElementById("delete-bookmark-button")
  .addEventListener("click", () => {
    const selectedRadio = document.querySelector(
      'input[name="bookmark"]:checked'
    ); // Get selected radio button
    if (!selectedRadio) {
      alert("Please select a bookmark to delete.");
      return;
    }

    const bookmarks = getBookmarks(); // Fetch current bookmarks
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.name !== selectedRadio.value
    ); // Remove selected bookmark
    saveBookmarks(updatedBookmarks); // Save updated array to local storage

    // Update category display
    const selectedCategory = document.getElementById("category-dropdown").value;
    document.querySelector(".category-name").innerText = selectedCategory;

    const categoryList = document.getElementById("category-list");
    const filteredBookmarks = updatedBookmarks.filter(
      (bookmark) => bookmark.category === selectedCategory
    ); // Filter remaining bookmarks

    categoryList.innerHTML = ""; // Clear previous list

    if (filteredBookmarks.length === 0) {
      // Display message if no bookmarks are left in the category
      categoryList.innerHTML = "<p>No Bookmarks Found</p>";
    } else {
      // Add updated list of bookmarks
      filteredBookmarks.forEach((bookmark) => {
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.id = bookmark.name;
        radioButton.value = bookmark.name;
        radioButton.name = "bookmark";

        const label = document.createElement("label");
        label.setAttribute("for", bookmark.name);

        const anchor = document.createElement("a");
        anchor.href = bookmark.url;
        anchor.target = "_blank";
        anchor.innerText = bookmark.name;

        label.appendChild(anchor);
        categoryList.appendChild(radioButton);
        categoryList.appendChild(label);
        categoryList.appendChild(document.createElement("br"));
      });
    }
  });
