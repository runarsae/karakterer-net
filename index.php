<!DOCTYPE HTML>
<html lang="nb">
    <head>
        <title>KARAKTERER.net</title>
        <meta charset="UTF-8"/>
        <meta name="description" content="Detaljert karakterstatistikk for alle emner på NTNU siden 2004.">
        <meta name="keywords" content="Karakterstatistikk,NTNU">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?php include $_SERVER["DOCUMENT_ROOT"] . "/includes/favicon.html"; ?>
        <link rel="stylesheet" type="text/css" href="/css/master.css">
        <link rel="stylesheet" type="text/css" href="/css/index.css">
        <link rel="stylesheet" type="text/css" href="/css/dark.css?">
        <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">
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

                </div>
            </div>
        </div>
    </header>

        <section>
            <div class="container">
                <div class="landing-grid">
                    <div>
                        <div class="landing-title">Karakter&shystatistikk for alle emner på NTNU</div>
                        <p>
                            Detaljert karakterstatistikk for hvert semester i alle emner på NTNU siden 2004.
                            Se karakter&shyfordeling og utvikling i gjennomsnitts&shykarakter og strykprosent.
                        </p>
                    </div>

                    <img class="landing-image" src="img/analytics.svg" alt="Analytics">
                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <h1>Mest populære</h1>

                <div class="popular-grid">
                    <?php

                    require_once "config/config.php";
                    require_once "scripts/getPopularCourses.php";

                    $link = getLink();

                    $popularCourses = getPopularCourses($link);

                    foreach ($popularCourses as $course) {
                        echo "<a href='emne/" .
                            $course["course"] .
                            "' class='card popular border shadow'><h3 class='card-title'>" .
                            $course["course"] .
                            "</h3><div class='card-undertitle'>" .
                            $course["name"] .
                            "</div></a>";
					}
					
					mysqli_close($link);

                    ?>
                </div>
            </div>
        </section>

		<?php include $_SERVER["DOCUMENT_ROOT"] . "/includes/footer.php"; ?>

        <script type="text/javascript" src="/js/plugins/jquery-3.4.1.min.js"></script>
        <script type="text/javascript" src="/js/plugins/autocomplete.js"></script>
        <script type="text/javascript" src="/js/search.js"></script>

    </body>
</html>