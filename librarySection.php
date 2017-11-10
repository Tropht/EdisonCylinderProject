

<main>

    <!-- Place your HTML here -->

    <!-- Search bar HTML is needed -->





  <div id="libraryContainer">
    <div class="cylinderSquare" style="background-color: {{ item.backColor }}" ng-click="expandCylinder()" ng-model="cylinderSquare" ng-repeat="item in returnedCylinderData | searchForCylinder:searchCylinder">

      <!-- Used to grab URL. Do not display! -->
      <em class="cylinderImageURL" style="display: none;">{{ item.cylinderTopURL }}</em>





      <div class="metaInfo">
        <h1>{{ item.cylinderTitle }}</h1>
        <i class="fa fa-sort-desc" style="display: none;" aria-hidden="true"></i>
        <div class="subMetaInfo">
          <h2><strong>Artist:</strong> {{ item.cylinderArtist }}</h2>
          <h2><strong>Number:</strong> {{ item.cylinderNumber }}</h2>
          <h2><strong>Take:</strong> {{ item.cylinderTake }}</h2>
          <h2><strong>Mold:</strong> {{ item.cylinderMold }}</h2>
          <h2><strong>Month/Year:</strong> {{ item.cylinderMonthYear }}</h2>
          <h2><strong>Comments:</strong> {{ item.cylinderComments }}</h2>
        </div>
      </div>

      <div class="playButtons">
        <i class="fa fa-music loadCylinderButton" style="cursor: pointer;"><span>Listen</span></i>

        <div id="jp_container_1" class="playControls">
          <i class="fa fa-play-circle-o jp-play playButton" style="cursor: pointer;" aria-hidden="true"></i>
          <i style="display: none;" class="fa fa-pause-circle-o jp-play pauseButton" style="cursor: pointer;" aria-hidden="true"></i>
        </div>
      </div>


      <img class="cylinderTopImage" style="display: none; opacity: 0;" alt="Cylinder Cover Image">
      <img class="cylinderBackImage lazy" src="img/grey.gif" ng-src="{{ item.imageURL }}" alt="Blank Grey Image">



    </div><!-- End of Cylinder Square -->


  </div><!-- End of Library Container -->

  <div id="largeActiveCylinder" class="activeMetaInfo">
    <div class="line">
      <img id="largeCylinderImg"  alt="Cylinder Cover Image" style="width: 200px; height: 200px; opacity: .8;">


      <span>
        <h1 id="largeCylinderName"></h1><br>
        <h2><strong>Artist: </strong></h2><em id="largeArtistName"></em><br>
        <h2><strong>Number: </strong></h2><em id="largeCylinderNumber"></em><br>
        <h2><strong>Take: </strong></h2><em id="largeTakeNumber"></em><br>
        <h2><strong>Mold: </strong></h2><em id="largeMoldNumber"></em><br>
        <h2><strong>Month/Year: </strong></h2><em id="largeMonthYear"></em><br>
        <h2><strong>Comments: </strong></h2><em id="largeComments"></em><br>
      </span>

      <div class="largePlayButtons">
        <i class="fa fa-music loadCylinderButton" style="cursor: pointer;"><span>Load Cylinder</span></i>

        <div id="jp_container_1" class="playControls" >
          <i class="fa fa-play-circle-o jp-play playButton" style="cursor: pointer;" aria-hidden="true"></i>
          <i style="display: none; cursor: pointer;" class="fa fa-pause-circle-o jp-play pauseButton" aria-hidden="true"></i>
          <h2>This cylinder is now ready in the player!</h2>
        </div>
      </div>

      <i id="metaInfoLargeActive" class="fa fa-question metaInfoButton" style="cursor: pointer;" aria-hidden="true"></i>
    </div><!-- line -->


  </div>


</main>
