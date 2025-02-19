/** @format */

// Function to get bookmarks from local storage
function getBookmarks() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

// Function to save bookmarks to local storage
function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Function to toggle the hidden class on form and main sections
function displayOrCloseForm() {
  document.getElementById("main-section").classList.toggle("hidden");
  document.getElementById("form-section").classList.toggle("hidden");
}

// Function to toggle the hidden class on main and bookmark list sections
function displayOrHideCategory() {
  document.getElementById("main-section").classList.toggle("hidden");
  document.getElementById("bookmark-list-section").classList.toggle("hidden");
}

// Event listener for #add-bookmark-button
document.getElementById("add-bookmark-button").addEventListener("click", () => {
  const selectedCategory = document.getElementById("category-dropdown").value;
  document.querySelector(".category-name").innerText = selectedCategory;
  displayOrCloseForm();
});

// Event listener for #close-form-button
document
  .getElementById("close-form-button")
  .addEventListener("click", displayOrCloseForm);

// Event listener for #add-bookmark-button-form
document
  .getElementById("add-bookmark-button-form")
  .addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category-dropdown").value;
    const url = document.getElementById("url").value.trim();

    // check validation
    if (!name || !url) {
      alert("Please fill in all fields.");
      return;
    }

    const bookmarks = getBookmarks();
    bookmarks.push({ name, category, url });
    saveBookmarks(bookmarks);
    // reset input
    document.getElementById("name").value = "";
    document.getElementById("url").value = "";
    displayOrCloseForm();
  });

// Event listener for #view-category-button
document
  .getElementById("view-category-button")
  .addEventListener("click", () => {
    const selectedCategory = document.getElementById("category-dropdown").value;
    document.querySelector(".category-name").innerText = selectedCategory;

    const bookmarks = getBookmarks();
    const filteredBookmarks = bookmarks.filter(
      (bookmark) => bookmark.category === selectedCategory
    );

    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = ""; // Clear previous list

    if (filteredBookmarks.length === 0) {
      categoryList.innerHTML = "<p>No Bookmarks Found</p>";
    } else {
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

    displayOrHideCategory();
  });

// Event listener for #close-list-button
document
  .getElementById("close-list-button")
  .addEventListener("click", displayOrHideCategory);

// Event listener for #delete-bookmark-button
document
  .getElementById("delete-bookmark-button")
  .addEventListener("click", () => {
    const selectedRadio = document.querySelector(
      'input[name="bookmark"]:checked'
    );
    if (!selectedRadio) {
      alert("Please select a bookmark to delete.");
      return;
    }

    const bookmarks = getBookmarks();
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.name !== selectedRadio.value
    );

    saveBookmarks(updatedBookmarks);

    const selectedCategory = document.getElementById("category-dropdown").value;
    document.querySelector(".category-name").innerText = selectedCategory;

    const categoryList = document.getElementById("category-list");
    const filteredBookmarks = updatedBookmarks.filter(
      (bookmark) => bookmark.category === selectedCategory
    );

    categoryList.innerHTML = ""; // Clear previous list

    if (filteredBookmarks.length === 0) {
      categoryList.innerHTML = "<p>No Bookmarks Found</p>";
    } else {
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
