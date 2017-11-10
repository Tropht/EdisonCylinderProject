<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
  <head>
    <meta charset="utf-8">
    <title>Cylinder Project</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!-- Reset -->
      <link href="styles/reset.css" rel="stylesheet" type="text/css" />
    <!-- Phone -->
      <link href="styles/phone.css" rel="stylesheet" type="text/css" />
    <!-- Tablet -->
      <link href="styles/tablet.css" rel="stylesheet" type="text/css" />
    <!-- Desktop -->
      <link href="styles/desktop.css" rel="stylesheet" type="text/css" />

    <!-- Angular -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js" type="text/javascript"></script>
    <!-- Font Awesome -->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <!-- Google Fonts -->
      <link href="https://fonts.googleapis.com/css?family=Nunito+Sans|Roboto|Rubik|Arsenal" rel="stylesheet" />
    <!-- jQuery -->
    <script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous"></script>
      <!-- <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script> -->
    <!-- LAZY LOADER -->
      <script src="scripts/jquery.lazyload.js" type="text/javascript"></script>
      <script type="text/javascript" charset="utf-8">


      if (window.location.pathname.toLowerCase() == "/login") {
        window.location = "/login.php";
      }
        $(function() {
          $("img.lazy").lazyload({
            threshold: 10,
            effect: "fadeIn",
            // container: $("#informationSection main, #librarySection main"),
            container: $("#librarySection main, #informationSection main")
           });
          // Threashold so the images load before they reach the fold
          // Fadein to have them fade in when loaded
        });
      </script>
    <!-- JPlayer -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.9.2/jplayer/jquery.jplayer.min.js"></script>
  </head>
  <body ng-app="cylinderApp">

    <div id="container" ng-controller="cylinderAppCtrl">
      <!-- All Meta Data -->
      <div id="allMetadata" style="opacity: 0;">

        <i id="closeAllMetadata" class="fa fa-times-circle" aria-hidden="true"></i>

        <img id="allMetaImg" alt="Cylinder Player Image Cover">
        <h1>Title: <span id="allMetaTitle">Title</span></h1>
        <h2>Artist: <span id="allMetaArtist">Artist</span></h2>
        <h2>Number: <span id="allMetaNumber">Number</span></h2>
        <h2>Take: <span id="allMetaTake">Take</span></h2>
        <h2>Mold: <span id="allMetaMold">Mold</span></h2>
        <h2>Month/Year: <span id="allMetaMonthYear">Month/Year</span></h2>
        <h2>Comments: <span id="allMetaComments">Comments</span></h2>
      </div>

      <!-- Banner/COD/Player  -->
      <div id="bannerContainer">
        <?php include 'banner.php' ?>

      </div>

      <!-- Home Section/Landing Page -->

      <section id="homeSection" class="active">
        <?php include 'homeSection.php'; ?>
      </section>

      <!-- Library Section/Cylinder Library -->

      <section id="librarySection" class="inactive">
        <?php include 'librarySection.php'; ?>
      </section>


      <!-- Information Section/About Page -->

      <section id="informationSection" class="inactive">
        <?php include 'informationSection.php'; ?>
      </section>

      <!-- Contact Section/Contact Form -->

      <section id="contactSection" class="inactive">
        <?php include 'contactSection.php'; ?>
      </section>

    </div>


    <?php include 'footer.php'; ?>

    <script type="text/javascript" src="scripts/script.js"></script>
  </body>
</html>
