// CHARTS

Chart.defaults.global.legend.display = false;
Chart.plugins.unregister(ChartDataLabels);

let hvs, hv, s, keys, sOnly;
let isGrades;
let currentData, backgroundColor, borderColor, oldValue1, oldValue2, labels;
let gradeChart, averageChart, failChart;
let slider, slidervalues, sliderblocked;

let types = [];
let containsGrades = false;
let containsPass = false;

initializeCharts();

function isPass(stats) {
  return (
    stats["a"] === 0 &&
    stats["b"] === 0 &&
    stats["c"] === 0 &&
    stats["d"] === 0 &&
    stats["e"] === 0 &&
    stats["students"] !== stats["f"]
  );
}

function switchToPass(stats) {
  isGrades = false;

  labels = ["Bestått", "Ikke bestått"];
  currentData = [stats["students"] - stats["f"], stats["f"]];

  backgroundColor = ["rgba(121, 179, 17, 0.1)", "rgba(252, 72, 37, 0.1)"];

  borderColor = ["rgba(121, 179, 17, 0.6)", "rgba(252, 72, 37, 0.6)"];
}

function switchToGrades(stats) {
  isGrades = true;
  labels = ["A", "B", "C", "D", "E", "F"];
  currentData = [
    stats["a"],
    stats["b"],
    stats["c"],
    stats["d"],
    stats["e"],
    stats["f"],
  ];

  backgroundColor = [
    "rgba(121, 179, 17, 0.1)",
    "rgba(121, 179, 17, 0.1)",
    "rgba(238, 203, 36, 0.1)",
    "rgba(254, 167, 27, 0.1)",
    "rgba(252, 99, 14, 0.1)",
    "rgba(252, 72, 37, 0.1)",
  ];

  borderColor = [
    "rgba(121, 179, 17, 0.6)",
    "rgba(121, 179, 17, 0.6)",
    "rgba(238, 203, 36, 0.6)",
    "rgba(254, 167, 27, 0.6)",
    "rgba(252, 99, 14, 0.6)",
    "rgba(252, 72, 37, 0.6)",
  ];
}

function initializeCharts() {
  hvs = Object.keys(grades);
  hv = hvs.filter((sem) => sem.indexOf("H") !== -1 || sem.indexOf("V") !== -1);
  s = hvs.filter((sem) => sem.indexOf("S") !== -1);

  for (let i = 0; i < hvs.length; i++) {
    let value = isPass(grades[hvs[i]]);
    types[hvs[i]] = value;
    if (value) {
      containsPass = true;
    } else {
      containsGrades = true;
    }
  }

  if (s.length !== 0) {
    $("#re-sit-cb-container").css("display", "grid");
  }

  if (!containsGrades) {
    $("#average-chart-card").css("display", "none");
    $("#total-average-card").css("display", "none");

    $("#average-fail-card").detach().appendTo($("#fail-chart-card").parent());
    $(".row-grid").detach();
  }

  let initialStats;

  if (hv.length !== 0) {
    initialStats = grades[hv[hv.length - 1]];
    keys = hv;
    slidervalues = hv;
    sOnly = false;
  } else {
    initialStats = grades[s[s.length - 1]];
    keys = s;
    slidervalues = s;
    sOnly = true;
  }

  if (isPass(initialStats)) {
    switchToPass(initialStats);
  } else {
    switchToGrades(initialStats);
  }

  sliderblocked = false;

  let semesterrange = $("#semester-range").ionRangeSlider({
    skin: "round",
    grid: false,
    step: 1,
    from: sOnly ? s.length - 1 : hv.length - 1,
    values: sOnly ? s : hv,
    hide_min_max: false,
    keyboard: false,
    onChange: function (data) {
      switchSemester(data.from_value);
    },
  });

  slider = semesterrange.data("ionRangeSlider");

  gradeChart = new Chart($("#grade-chart"), {
    type: "bar",
    plugins: [ChartDataLabels],
    data: {
      labels: labels,
      datasets: [
        {
          data: currentData,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: backgroundColor,
          borderColor: borderColor,
          hoverBorderColor: borderColor,
          borderWidth: 1,
          maxBarThickness: 55,
        },
      ],
    },
    options: {
      tooltips: {
        enabled: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          color: "#FFF",
          anchor: "end",
          align: function (context) {
            let index = context.dataIndex;
            let value = context.dataset.data[index];
            let chartheight = context.chart.height;
            let spaceheight = context.dataset._meta[0].data[index]._model.y;
            let barheight = chartheight - spaceheight - 50;
            return barheight < 30 || value === 0 ? "end" : "start";
          },
        },
      },

      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            display: false,
          },
        ],
        xAxes: [
          {
            ticks: {
              padding: 5,
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },

      layout: {
        padding: {
          top: 40,
          right: 20,
          bottom: 20,
          left: 20,
        },
      },
    },
  });

  if (containsGrades) {
    averageChart = new Chart($("#average-chart"), {
      type: "line",
      plugins: [ChartDataLabels],
      data: {
        labels: sOnly ? s : hv,
        datasets: [
          {
            data: computeAverageArray(sOnly ? s : hv),
            hitRadius: 10,
            pointRadius: function (context) {
              let index = keys[context.dataIndex];
              if (index === slidervalues[slider.result.from]) {
                return 4;
              } else {
                return 2;
              }
            },
            pointHoverRadius: 4,
            hoverBackgroundColor: "#3e95cd",
            hoverBorderColor: "#3e95cd",
            backgroundColor: "#3e95cd",
            borderColor: "#3e95cd",
            fill: false,
          },
        ],
      },
      options: {
        events: ["click", "mousemove", "mouseout"],
        plugins: {
          datalabels: {
            color: "#9d9d9d",
            backgroundColor: "#383838",
            borderRadius: 3,
            padding: {
              bottom: 2,
            },
            anchor: "end",
            align: "end",
            display: function (context) {
              let index = keys[context.dataIndex];
              return index === slidervalues[slider.result.from];
            },
          },
        },
        tooltips: {
          enabled: false,
          mode: "nearest",
          displayColors: false,
          callbacks: {
            label: function (tooltipItems) {
              return tooltipItems.yLabel;
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function (value) {
                  if (value === 0) {
                    return "F";
                  } else if (value === 1) {
                    return "E";
                  } else if (value === 2) {
                    return "D";
                  } else if (value === 3) {
                    return "C";
                  } else if (value === 4) {
                    return "B";
                  } else if (value === 5) {
                    return "A";
                  } else {
                    return null;
                  }
                },
                beginAtZero: true,
                padding: 30,
              },
              gridLines: {
                zeroLineWidth: 0,
                drawTicks: 0,
                color: "#232323",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                padding: 20,
              },
              gridLines: {
                drawOnChartArea: false,
                zeroLineWidth: 0.5,
                drawTicks: 0,
                color: "#232323",
              },
            },
          ],
        },

        layout: {
          padding: {
            top: 30,
            right: 20,
          },
        },
      },
    });

    let averagechartcanvas = $("#average-chart");

    averagechartcanvas.click(function (e) {
      let points = averageChart.getElementAtEvent(e);
      if (points[0] !== undefined) {
        let index = points[0]["_index"];
        let point = keys[points[0]["_index"]];
        slider.update({
          from: index,
        });
        switchSemester(point);
      }
    });
  }

  failChart = new Chart($("#fail-chart"), {
    type: "line",
    plugins: [ChartDataLabels],
    data: {
      labels: sOnly ? s : hv,
      datasets: [
        {
          data: computeFailArray(sOnly ? s : hv),
          hitRadius: 10,
          pointRadius: function (context) {
            let index = keys[context.dataIndex];
            if (index === slidervalues[slider.result.from]) {
              return 4;
            } else {
              return 2;
            }
          },
          pointHoverRadius: 4,
          hoverBackgroundColor: "#C54747",
          hoverBorderColor: "#C54747",
          backgroundColor: "#C54747",
          borderColor: "#C54747",
          fill: false,
        },
      ],
    },
    options: {
      events: ["click", "mousemove", "mouseout"],
      plugins: {
        datalabels: {
          color: "#9d9d9d",
          backgroundColor: "#383838",
          borderRadius: 3,
          padding: {
            bottom: 2,
          },
          anchor: "end",
          align: "end",
          display: function (context) {
            let index = keys[context.dataIndex];
            return index === slidervalues[slider.result.from];
          },
          formatter: function (value) {
            return value + "%";
          },
        },
      },
      tooltips: {
        enabled: false,
        mode: "nearest",
        displayColors: false,
        callbacks: {
          label: function (tooltipItems) {
            return tooltipItems.yLabel + "%";
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value, index, values) {
                let max = Math.max(...values);

                if (max > 40) {
                  if (value % 20 === 0) {
                    return value + "%";
                  } else {
                    return null;
                  }
                }

                if (max > 20) {
                  if (value % 10 === 0) {
                    return value + "%";
                  } else {
                    return null;
                  }
                }

                if (max > 10) {
                  if (value % 5 === 0) {
                    return value + "%";
                  } else {
                    return null;
                  }
                }

                if (value % 2 === 0) {
                  return value + "%";
                } else {
                  return null;
                }
              },
              beginAtZero: true,
              padding: 15,
            },
            gridLines: {
              zeroLineWidth: 0,
              drawTicks: 0,
              color: "#232323",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              padding: 20,
            },
            gridLines: {
              drawOnChartArea: false,
              zeroLineWidth: 0.5,
              drawTicks: 0,
              color: "#232323",
            },
          },
        ],
      },

      layout: {
        padding: {
          top: 30,
          right: 20,
        },
      },
    },
  });

  let failchartcanvas = $("#fail-chart");

  failchartcanvas.click(function (e) {
    let points = failChart.getElementAtEvent(e);
    if (points[0] !== undefined) {
      let index = points[0]["_index"];
      let point = keys[points[0]["_index"]];
      slider.update({
        from: index,
      });
      switchSemester(point);
    }
  });
}

function updateCharts() {
  let semesters = "";

  if ($("#ordinary-cb").is(":checked")) {
    semesters += "hv";
  }

  if ($("#re-sit-cb").is(":checked")) {
    semesters += "s";
  }

  switch (semesters) {
    case "hvs":
      keys = hvs;
      break;
    case "hv":
      keys = hv;
      break;
    case "s":
      keys = s;
      break;
    default:
      keys = null;
      break;
  }

  if (keys !== null && keys.length !== 0) {
    oldValue1 = null;
    oldValue2 = null;
    if (containsGrades) {
      averageChart.data.labels = keys;
      averageChart.data.datasets[0].data = computeAverageArray(keys);
      averageChart.update();
    }

    failChart.data.labels = keys;
    failChart.data.datasets[0].data = computeFailArray(keys);

    let from;

    if (
      semesters
        .toUpperCase()
        .indexOf(slidervalues[slider.result.from].substring(0, 1)) !== -1
    ) {
      from = keys.indexOf(slidervalues[slider.result.from]);
    } else {
      from = keys.length - 1;
    }

    slider.update({
      block: false,
      from: from,
      values: keys,
      hide_min_max: false,
      hide_from_to: false,
    });

    sliderblocked = false;
    slidervalues = keys;

    switchSemester(keys[from]);

    failChart.update();
  } else {
    slider.update({
      block: true,
      hide_min_max: true,
      hide_from_to: true,
    });

    sliderblocked = true;

    $("#average-fail").html("");

    gradeChart.data.datasets[0].data = [];
    failChart.data.labels = [];
    failChart.data.datasets[0].data = [];

    gradeChart.update();
    failChart.update();

    if (containsGrades) {
      $("#total-average").html("");

      averageChart.data.labels = [];
      averageChart.data.datasets[0].data = [];
      averageChart.update();
    }
  }
}

$(document).keydown(function (e) {
  if (!sliderblocked && !$("#search").is(":focus")) {
    if (e.keyCode === 39) {
      // ->

      switchToNextSemester();
    } else if (e.keyCode === 37) {
      // <-

      switchToPrevSemester();
    }
  }
});

function switchToPrevSemester() {
  let oldValue = slider.result.from_value;

  slider.update({
    from: slider.result.from - 1,
  });

  if (oldValue !== slider.result.from_value) {
    switchSemester(slider.result.from_value);
  }
}

function switchToNextSemester() {
  let oldValue = slider.result.from_value;

  slider.update({
    from: slider.result.from + 1,
  });

  if (oldValue !== slider.result.from_value) {
    switchSemester(slider.result.from_value);
  }
}

function switchSemester(semester) {
  if (!sliderblocked) {
    let newStats = grades[semester];

    if (isPass(newStats)) {
      switchToPass(newStats);
    } else {
      switchToGrades(newStats);
    }

    if (containsGrades) {
      averageChart.update();
    }

    gradeChart.data.datasets[0].data = currentData;
    gradeChart.data.datasets[0].borderColor = borderColor;
    gradeChart.data.datasets[0].backgroundColor = backgroundColor;
    gradeChart.data.datasets[0].hoverBorderColor = borderColor;
    gradeChart.data.datasets[0].hoverBackgroundColor = backgroundColor;

    gradeChart.data.labels = labels;
    gradeChart.update();
    failChart.update();
  }
}

function computeGrade(number) {
  switch (Math.round(number)) {
    case 0:
      return "F";
    case 1:
      return "E";
    case 2:
      return "D";
    case 3:
      return "C";
    case 4:
      return "B";
    case 5:
      return "A";
    default:
      return "-";
  }
}

function computeAverageArray(semesters) {
  let averagearray = [];
  let sum = 0;
  let counter = 0;

  for (let i = 0; i < semesters.length; i++) {
    if (!types[semesters[i]]) {
      var s = grades[semesters[i]];
      let a = parseInt(s["a"]);
      let b = parseInt(s["b"]);
      let c = parseInt(s["c"]);
      let d = parseInt(s["d"]);
      let e = parseInt(s["e"]);
      let f = parseInt(s["f"]);
      var average = (
        (a * 5 + b * 4 + c * 3 + d * 2 + e) /
        (a + b + c + d + e + f)
      ).toFixed(2);
      averagearray.push(average);

      sum += parseFloat(average);
      counter += 1;
    } else {
      averagearray.push(null);
    }
  }

  var totalaverage = (sum / counter).toFixed(2);
  $("#total-average").html(totalaverage);

  $("#total-average-grade").html(computeGrade(totalaverage));

  return averagearray;
}

function computeFailArray(semester) {
  let failarray = [];
  let sum = 0;

  for (let i = 0; i < semester.length; i++) {
    let s = grades[semester[i]];

    let f = parseInt(s["f"]);
    let pass = parseInt(s["pass"]);

    let failpercentage = Math.round((f / (pass + f)) * 100);

    failarray.push(failpercentage);

    sum += failpercentage;
  }

  let averagefail = (sum / failarray.length).toFixed(1);
  $("#average-fail").html(averagefail + "%");

  return failarray;
}

$("#grade-chart, #average-chart, #fail-chart").swipe({
  swipeLeft: function () {
    switchToPrevSemester();
  },

  swipeRight: function () {
    switchToNextSemester();
  },

  allowPageScroll: "none",
});
