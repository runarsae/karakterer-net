// SETTINGS

let settingscontainer = $("#settings-container");
let settingsitem = $("#settings-menu-item");
let settingsbutton = $("#settings-menu-button");
let settingspane = $("#settings-pane");

let checkboxes = $("#ordinary-cb, #re-sit-cb");

if (sOnly) {
  $("#ordinary-cb").click();
  $("#re-sit-cb").click();
}

checkboxes.click(function () {
  updateCharts();
});

checkboxes.on('keypress', function (event) {
  if (event.which === 13) {
    this.checked = !this.checked;
    updateCharts();
  }
});

settingsbutton.mousedown(function(e) {
  e.preventDefault();
  toggleSettings();
});

$(document).click(function(e) {
  if (settingspane.css("display") === "block" &&
      !settingspane.is(e.target) && settingspane.has(e.target).length === 0 &&
      !settingsbutton.is(e.target) && settingsbutton.has(e.target).length === 0) {
    toggleSettings();
  }
});

function toggleSettings() {
  settingspane.toggle();

  if (settingspane.css("display") === "block") {
    settingsitem.addClass("focus");
    settingscontainer.focus();
  } else {
    settingsitem.removeClass("focus");
    settingsbutton.blur();
  }
}

$(document).keydown(function(e) {
  if (e.keyCode === 27) { // ESC
    if (settingspane.css("display") === "block") {
      toggleSettings();
    }
  } else if (e.keyCode === 73) { // I
    if (!search.is(":focus")) {
      toggleSettings();
      if (settingspane.css("display") === "block") {
        settingsbutton.focus();
      } else {
        settingsbutton.blur();
      }
    }
  } else if (e.keyCode === 13 && settingsbutton.is(":focus")) { // ENTER
    toggleSettings();
  }
});