/** @format */

// alert("hello world")

const categoryValue = document.querySelector("#category-dropdown");

// console.log(link)

function getBookmark() {}

// function showMainSection() {
//   document.querySelector("#main-section").classList.remove()
// }
// showMainSection();

const addBookMarkButton = document.querySelector("#add-bookmark-button");
const addBookMarkBottonForm = document.querySelector(
  "#add-bookmark-button-form"
);
// console.log(addCategoryButton)
console.log(addBookMarkBottonForm);

function displayForm() {
  const category = categoryValue.value;

  // if (!category) {
  //   alert("no bookmark");
  // }
  const formSection = document.querySelector("#form-section");
  formSection.classList.remove("hidden");

  const categoryName = document.querySelector(".category-name");
  categoryName.textContent = `${category}`;

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
