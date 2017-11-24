<!-- searchbar -->

<div id="searchFunction">
  <div id="Container">
    <input type="text" name="" ng-model="searchCylinder" placeholder="Search cylinder by song name, artist, year, etc...">
    <i class="fa fa-search" aria-hidden="true"></i>
  </div>
</div>

<!-- Nav Buttons -->

<input id="testThing" style="display: none;" type="text" name="" value="02/">

<div class="navButtonContainers" style="opacity: 1;">
  <i id="homeButton" style="cursor: pointer;" class="fa fa-home navButton activeNav" aria-hidden="true" ng-click="searchCylinder = undefined"><span>Home</span></i>
  <i id="libraryButton" style="cursor: pointer;" class="fa fa-music navButton" aria-hidden="true"><span>Library</span></i>
  <i id="informationButton" style="cursor: pointer;" class="fa fa-info-circle navButton" aria-hidden="true" ng-click="searchCylinder = undefined"><span>Information</span></i>
  <i id="contactButton" style="cursor: pointer;" class="fa fa-envelope navButton" aria-hidden="true" ng-click="searchCylinder = undefined"><span>Contact</span></i>
  <i id="searchButton" onclick="homeNavButtons()" style="cursor: pointer;" class="fa fa-search" aria-hidden="true" ng-click="searchCylinder = undefined"><span>Search</span></i>
</div>
