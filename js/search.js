let sidebar = $("#side-bar");
let searchmenuitem = $("#search-menu-item");
let search = $("#search");
let searchbutton = $("#search-menu-button");
let body = $("body");
let closebutton = $("#close-button");

let noSuggestionNotice =
  "<div class='autocomplete-no-suggestion'>Ingen emner med gitt kode/navn.</div>";
let noSearchNotice =
  "<div class='autocomplete-no-suggestion'>Vennligst fyll inn emnekode/emnenavn.</div>";

function redirect(searchValue) {
  if (searchValue.length > 0) {
    $.getJSON("/scripts/getCourse.php?query=" + searchValue, function (data) {
      let code;

      if (data.length === 1) {
        code = data[0].course;

        if (closeSidebar()) {
          setTimeout(function () {
            window.location.href =
              "http://" + window.location.hostname + "/emne/" + code;
          }, 200);
        } else {
          window.location.href =
            "http://" + window.location.hostname + "/emne/" + code;
        }
      } else if (data.length === 0) {
        autocompleteSuggestions.html(noSuggestionNotice);
        autocompleteSuggestions.css("display", "block");
      } else if (data.length > 1) {
        search.focus();
      }
    });
  } else {
    autocompleteSuggestions.html(noSearchNotice);
    autocompleteSuggestions.css("display", "block");
  }
}

search.autocomplete({
  serviceUrl: "../scripts/search.php",
  minChars: 3,
  width: "100%",
  appendTo: searchmenuitem,
  showNoSuggestionNotice: true,
  noSuggestionNotice: "Ingen emner med gitt kode/navn.",
  triggerSelectOnValidInput: false,
  onSelect: function (suggestion) {
    redirect(suggestion.value.toUpperCase());
  },
  formatResult: function (suggestion) {
    const code = suggestion.value;
    const name = suggestion.data;
    if (name !== "") {
      return (
        code + "<div class='autocomplete-suggestion-name'>" + name + "</div>"
      );
    } else {
      return code;
    }
  },
});

let autocompleteSuggestions = $(".autocomplete-suggestions");

$(document).keydown(function (e) {
  if (e.keyCode === 27) {
    // ESC
    if (!closeSidebar() && search.is(":focus")) {
      search.blur();
    }
  } else if (e.keyCode === 13 && searchbutton.is(":focus")) {
    focusSearch();
  } else if (e.keyCode === 13 && search.is(":focus")) {
    // ENTER
    redirect(search.val());
  } else if (e.keyCode === 83) {
    // S
    if (!x.matches) {
      openSidebar(e);
    } else {
      focusSearch(e);
    }
  }
});

searchbutton.mousedown(function (e) {
  e.preventDefault();
  if (x.matches) {
    if (!focusSearch()) {
      redirect(search.val());
    }
  } else {
    e.stopPropagation();
    openSidebar();
  }
});

closebutton.mousedown(function (e) {
  e.preventDefault();
  e.stopPropagation();
  closeSidebar();
});

$(document).on("mousedown", ".autocomplete-suggestion", (e) => {
  $(e.target).click();
});

searchunderline = $("#search-underline");

function focusSearch(e = null) {
  if (!search.is(":focus")) {
    if (e !== null) {
      e.preventDefault();
    }
    search.focus();
    searchunderline.css("width", "100%");
    return true;
  }

  return false;
}

search.focus(function () {
  searchunderline.css("width", "100%");
});

search.focusout(function () {
  search.autocomplete().hide();
  searchunderline.css("width", "0");
});

function moveSearch(e) {
  if (e.matches) {
    closeSidebar();
    search.detach().prependTo(searchmenuitem);
    autocompleteSuggestions.detach().appendTo(searchmenuitem);
  } else {
    search.detach().appendTo(sidebar);
    autocompleteSuggestions.detach().appendTo(sidebar);
  }
}

let x = window.matchMedia("(min-width: 768px)");
moveSearch(x);
x.addEventListener("change", (e) => {
  moveSearch(e);
});

function openSidebar(e = null) {
  if (!sidebar.hasClass("open")) {
    sidebar.addClass("open");
    focusSearch();
    if (e !== null) {
      e.preventDefault();
    }
    body.addClass("background");
    return true;
  }

  return false;
}

function closeSidebar() {
  if (sidebar.hasClass("open")) {
    search.blur();
    sidebar.removeClass("open");
    body.removeClass("background");
    return true;
  }

  return false;
}

$(document).mousedown(function (e) {
  $target = $(e.target);
  if (!$target.closest(sidebar).length) {
    closeSidebar();
  }
});
