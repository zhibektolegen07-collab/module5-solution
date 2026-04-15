// STEP 0: Setup
(function (global) {

var dc = {};
var homeHtml = "snippets/home-snippet.html";
var allCategoriesUrl =
  "https://davids-restaurant.herokuapp.com/categories.json";

var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// STEP 1: Choose random category
function chooseRandomCategory(categories) {
  var randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex].short_name;
}

// STEP 2: Load categories and choose random
dc.loadRandomMenuCategory = function () {
  showLoading("#main-content");

  $ajaxUtils.sendGetRequest(allCategoriesUrl, function (categories) {
    var randomShortName = chooseRandomCategory(categories);
    dc.loadMenuItems(randomShortName);
  });
};

global.$dc = dc;

})(window);


// STEP 3: Replace Specials click
document.addEventListener("DOMContentLoaded", function (event) {

  $dc.loadRandomMenuCategory();

});
