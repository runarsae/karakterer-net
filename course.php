<?php
require_once "config/config.php";
require_once "scripts/getGrades.php";
require_once "scripts/getCourseName.php";
require_once "scripts/updateViews.php";

$code = strtoupper($_GET["code"]);

if (!empty($code)) {

	$link = getLink();

	$grades = getGrades($link, $code);
	$name = getCourseName($link, $code);

	updateViews($link, $code);

    mysqli_close($link);
}
?>

<!DOCTYPE HTML>
<html lang="nb">
    <head>
        <title><?php
        echo $code;
        if (!is_null($name)) {
            echo " " . $name;
        }
        ?> | KARAKTERER.net</title>
        <meta charset="UTF-8"/>
        <meta name="description" content="Detaljert karakterstatistikk for emnet <?php
        echo $code;
        if (!is_null($name)) {
            echo " " . $name;
        }
        ?> på NTNU.">
        <meta name="keywords" content="Karakterstatistikk,NTNU<?php
        echo "," . $code;
        if (!is_null($name)) {
            echo "," . $name;
        }
        ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?php include $_SERVER["DOCUMENT_ROOT"] . "/includes/favicon.html"; ?>
        <link rel="stylesheet" type="text/css" href="/css/master.css">
        <link rel="stylesheet" type="text/css" href="/css/course.css">
        <link rel="stylesheet" type="text/css" href="/css/dark.css">
        <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/css/rangeslider.css">
    </head>


    <body>
    <div id="side-bar">
        <div id="side-bar-header">
            <h1>Søk</h1>
            <div class="navigation-item">
                <button class="navigation-link" id="close-button"><img src="/img/icons/cross.svg" alt="Close"></button>
                <div class="underline"></div>
            </div>
        </div>
    </div>

    <header>
        <div class="container">
            <div class="top-grid">
                <a href="/" class="logo-container">
                    <img class="logo" src="/img/logo.png" alt="Statistics">
                    <h1 class="title">KARAKTERER.net</h1>
                </a>

                <div class="navigation">
                    <div class="navigation-item" id="search-menu-item">
                        <input id="search" type="text" name="search" aria-label="Search course" placeholder="Emne/emnekode" spellcheck="false" autocomplete="off">

                        <div id="search-menu-button-container">
                            <button id="search-menu-button" class="navigation-link"><img src="/img/icons/search.svg" alt="Search"></button>
                            <div class="underline"></div>
                        </div>
                        <div id="search-underline"></div>
                    </div>


                    <div class="navigation-item">
                        <a href="/om" class="navigation-link"><img src="/img/icons/info.svg" alt="Information"></a>
                        <div class="underline"></div>
                    </div>

                    <div class="navigation-item" id="settings-menu-item">
                        <button id="settings-menu-button" class="navigation-link"><img src="/img/icons/dots.svg" alt="Settings"></button>
                        <div class="underline"></div>
                        <div id="settings-pane" class="card shadow">
                            <div id="settings-container">

                                <div class="setting-container">
                                    <p class="setting-name">Ordinær eksamen</p>
                                    <label for="ordinary-cb" class="switch">
                                        <input type="checkbox" id="ordinary-cb" name="ordinary" value="HV" checked>
                                        <span class="slider shadow"></span>
                                    </label>
                                </div>

                                <div class="setting-container" id="re-sit-cb-container">
                                    <p class="setting-name">Utsatt eksamen</p>
                                    <label class="switch" for="re-sit-cb">
                                        <input type="checkbox" id="re-sit-cb" name="re-sit" value="S">
                                        <span class="slider shadow"></span>
                                    </label>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <section>
        <div class="container">
            <div class="statistics-grid">

                <div class="column-grid">

                    <div id="grade-chart-card" class="card shadow">
                        <h2><?php echo $code; ?></h2>
                        <?php if (!is_null($name)) {
                            echo "<span id='subtitle'>$name</span>";
                        } ?>


                        <div id="grade-chart-container">
                            <canvas id="grade-chart" width="400" height="400"></canvas>
                        </div>

                        <div id="range-container">
                            <input type="hidden" id="semester-range" name="semester" value=""/>
                        </div>

                    </div>

                    <div class="row-grid">
                        <div id="total-average-card" class="card shadow">
							<div id="total-average-content">
								<span id="total-average"></span>
								<div class="separator"></div>
								<span id="total-average-grade"></span>
							</div>

                            <div class="statistics-label">Totalt gjennomsnitt</div>
                        </div>

                        <div id="average-fail-card" class="card shadow">
                            <div id="average-fail"></div>
                            <div class="statistics-label">Gjennomsnittlig strykprosent</div>
                        </div>
                    </div>


                </div>


                <div class="column-grid">

                    <div id="average-chart-card" class="card shadow">
                        <h2>Gjennomsnitt</h2>
                        <div id="average-chart-container">
                            <canvas id="average-chart"></canvas>
                        </div>
                    </div>

                    <div id="fail-chart-card" class="card shadow">
                        <h2>Strykprosent</h2>
                        <div id="fail-chart-container">
                            <canvas id="fail-chart"></canvas>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </section>

	<?php include $_SERVER["DOCUMENT_ROOT"] . "/includes/footer.php"; ?>

    <script type="text/javascript">
        var grades = <?php echo $grades; ?>;
    </script>

    <script type="text/javascript" src="/js/plugins/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/js/plugins/chartjs.min.js"></script>
    <script type="text/javascript" src="/js/plugins/chartjs-datalabels.min.js"></script>
    <script type="text/javascript" src="/js/plugins/rangeslider.min.js"></script>
    <script type="text/javascript" src="/js/plugins/touchSwipe.min.js"></script>
    <script type="text/javascript" src="/js/plugins/autocomplete.js"></script>
    <script type="text/javascript" src="/js/charts.js"></script>
    <script type="text/javascript" src="/js/settingsmenu.js"></script>
    <script type="text/javascript" src="/js/search.js"></script>

    </body>

</html>