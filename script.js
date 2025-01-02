/** @format */

// alert("hello world")
const url = document.querySelector("#url").value;
const categoryValue = document.querySelector("#category-dropdown");
const addBookMarkButton = document.querySelector("#add-bookmark-button");
const addBookMarkBottonForm = document.querySelector(
  "#add-bookmark-button-form"
);

function displayForm() {
  const category = categoryValue.value
  const formSection = document.querySelector("#form-section");
  formSection.classList.remove("hidden");

  const categoryName = document.querySelector(".category-name");
  categoryName.innerHTML = `${category}`;

  const mainSection = document.querySelector("#main-section");
  mainSection.classList.add("hidden");

  const bookmarkListSection = document.querySelector("#bookmark-list-section");
  //   bookmarkListSection.classList.add("show");
}
addBookMarkButton.addEventListener("click", function () {
  displayForm();
});

const closeFormButton = document.querySelector("#close-form-button");

function closeForm() {
  const formSection = document.querySelector("#form-section");
  formSection.classList.add("hidden");

  const mainSection = document.querySelector("#main-section");
  mainSection.classList.remove("hidden");
}
closeFormButton.addEventListener("click", function () {
  closeForm();
});
const addBookMarkButtonForm = document.querySelector(
  "add-bookmark-button-form"
);
function showAlert() {
  if (categoryValue.value == "" || url == "") {
    alert("Please, provide valid name and URL");
  }

 
}
addBookMarkBottonForm.addEventListener("click", function () {
  showAlert();
});
