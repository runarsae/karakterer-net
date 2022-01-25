<!DOCTYPE HTML>
<html lang="nb">
<head>
    <title>Om | KARAKTERER.net</title>
    <meta charset="UTF-8"/>
    <meta name="description" content="Detaljert karakterstatistikk for alle emner på NTNU siden 2004.">
    <meta name="keywords" content="Karakterstatistikk,NTNU,Om">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include($_SERVER['DOCUMENT_ROOT'] . "/includes/favicon.html"); ?>
    <link rel="stylesheet" type="text/css" href="/css/master.css">
    <link rel="stylesheet" type="text/css" href="/css/about.css">
    <link rel="stylesheet" type="text/css" href="/css/dark.css">
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
                    <input id="search" type="text" name="search" aria-label="Search course" placeholder="Emne/emnekode"
                           spellcheck="false" autocomplete="off">

                    <div id="search-menu-button-container">
                        <button id="search-menu-button" class="navigation-link"><img src="/img/icons/search.svg"
                                                                                     alt="Search"></button>
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
        <div id="about-grid">
            <div>
                <h1>Om KARAKTERER.net</h1>
                <p>
                    KARAKTERER.net viser karakterstatistikk for alle emner på NTNU fra 2004 til sommeren 2020. Karakterstatistikken for et emne viser fordelingen av karakterene A til F for hvert semester i et søylediagram. Denne informasjonen brukes til å beregne gjennomsnittskarakterer og strykprosenter, som fremstilles i linjediagrammer. Merk at antall studenter som avbrøt en eksamen ikke er tatt med i statistikken.
                </p>

                <p>
                    Karakterstatistikken er hentet fra
                    <a href="https://sats.itea.ntnu.no/karstat/login.do" target="_blank" title="NTNU Karakterstatistikk">denne siden</a>. Merk at NTNU har gått over til nytt et system for publisering av karakterstatistikk. Nyere karakterstatistikk vil derfor ikke bli lagt inn her, inntil videre.
                </p>
            </div>

            <div id="shortcut-container" class="card border shadow">
                <h1>Hurtigtaster</h1>
                <div id="shortcut-grid">
                    <div class="key shadow">&#8592;</div>
                    <span>Se karakterfordeling for forrige semester</span>

                    <div class="key shadow">&#8594;</div>
                    <span>Se karakterfordeling for neste semester</span>

                    <div class="key shadow">S</div>
                    <span>Søk etter emne</span>

                    <div class="key shadow">I</div>
                    <span>Innstillinger</span>

                    <div class="key shadow">esc</div>
                    <span>Avbryt søk/lukk innstillinger</span>
                </div>
            </div>
        </div>


    </div>
</section>

<?php include($_SERVER['DOCUMENT_ROOT']."/includes/footer.php"); ?>

<script type="text/javascript" src="/js/plugins/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="/js/plugins/autocomplete.js"></script>
<script type="text/javascript" src="/js/search.js"></script>

</body>
</html>