// Get Screen Sizes
var screenHeight = $(window).height();
var screenWidth = $(window).width();
var screenSizeChange = 650;//The pixel size when the styling changes
var screenSize = null; //False indicates mobile, True indicates tablet and larger
var screenType = null;//Determine screen type (phone/tablet/desktop)


var cylinderHolder;//Holds the cylinders until they are ready to be loaded


// ///////////////
// Check If Screen Size Has Changed
// ///////////////
if(screenWidth < 650){
  screenType = 'phone';
}
else if(screenWidth >= 650 && screenWidth <= 1100){
  screenType = 'tablet';
}
else{
  screenType = 'desktop';
}

var compareScreenType = function(){
  var currentScreenType = null;

  if(screenWidth < 650){
    currentScreenType = 'phone';
  }
  else if(screenWidth >= 650 && screenWidth <= 999){
    currentScreenType = 'tablet';
  }
  else if(screenWidth >= 1000){
    currentScreenType = 'desktop';
  }

  if(screenType !== currentScreenType){
    // console.log("Change!");
    screenType = currentScreenType;
    var activeBackgroundColor = $('.activeCylinder').css('backgroundColor');//Get active cylinder backgroundColor

    $('#largeActiveCylinder').css('display','none');//Hide active cylinder
    $('#largeActiveCylinder').insertAfter('#libraryContainer');//Must be moved first to keep index in order
    $('.activeCylinder').find('.cylinderPlayOptions').css('display','none');//Remove Play Button


    $('.activeCylinder').removeAttr('style');
    $('.activeCylinder').css('background-color', activeBackgroundColor);
    $('.playButton').css('display','inline-block');//Make play button the first one to appear
    $('.pauseButton').css('display','none');//Hide pause button
    $('.activeCylinder').find('.activeMetaInfo').removeClass('activeMetaInfo');//Removes Active Metadata Status
    $('.activeCylinder').find('.subMetaInfo').css('display','none');//Hides Sub Meta info if open
    $('.activeCylinder').find('.metaInfo').width($('.cylinderSquare').width());//Restores width of metadata to regular cylinder width
    $('.activeCylinder').addClass('cylinderSquare');//Restores cylinder class (so it can be clicked)
    $('.activeCylinder').removeClass('activeCylinder');//Removes active cylinder class

  }
}





// /////////////
// Fit screen type
// /////////////
var fitScreen = function(){

  // Makes the elements fit appropriate depending upon screensize
  if(screenWidth <= screenSizeChange){
    // Mobile

    $('section').height(screenHeight);
    $('section main').height(screenHeight - 50);
    $('section').width(screenWidth);
    $('section main').css('width','100%');
    screenSize = false;

    // Cylinder Metadata
    var cylinderWidth = $('.cylinderSquare').width();//Grab Cylinder Width
    $('.metaInfo').width(cylinderWidth);
    $('.activeCylinder .metaInfo').width($('.activeCylinder').width());
    $('.bannerContainer').width($('.active main').width());
    $('.active .cylinderOfTheDay').width(screenWidth);//Reset Cylinder of the Day Width
    $('#searchBar').width(screenWidth);//Reset searchBar width

    $('header ul li i').removeAttr('style');//Restore header icon back to header area

    // Cylinder Player
    $('#cylinderPlayerTitle').width($('#cylinderPlayer').width() - 75);//Cylinder Player Width
    $('#cylinderPlayer .jp-play').css('padding-left', (screenWidth / 2)  - 75);//Cylinder Player Play/Pause Position


  }else{
    $('section').height(screenHeight);
    $('section main').height(screenHeight);
    $('section').width(screenWidth);
    $('section main').width(screenWidth);
    screenSize = true;

    // Cylinder Metadata
    var cylinderWidth = $('.cylinderSquare').width();//Grab Cylinder Width
    $('.metaInfo').width(cylinderWidth);
    $('.activeCylinder .metaInfo').width($('.activeCylinder').width());

    // Cylinder Player
    $('#cylinderPlayerTitle').width($('#cylinderPlayer').width() - 75);//Cylinder Player Title Width
    $('#cylinderPlayer').width((screenWidth - $('.tabletBanner').width()) - 5);//Cylinder Player Width
    $('#cylinderPlayer .jp-play').css('padding-left', ($('#cylinderPlayer').width() / 2)  - 100);//Cylinder Player Play/Pause Position


    // Large Active Cylinder
    if(screenWidth >= 650 && screenWidth <= 999){
      $('#largeActiveCylinder').width(screenWidth - 15);
    }else{
      $('#largeActiveCylinder').width(screenWidth - 10);
    }


    // Section Header (Information/Contact Page)
    $('.sectionHeader').width(screenWidth - 100);

    // Remove Search Bar Lock
    $('#searchBar').removeClass("lockBar");
  }
};
fitScreen();

$(window).resize(function(){
  screenHeight = $(window).height();
  screenWidth = $(window).width();
  compareScreenType();
  fitScreen();
});


// ///////////////
// Get selected Nav section
// ///////////////
$('.navButton').on('click', function(){

  $('.navButton').css('color','#717171');
  $('.activeNav').removeClass('activeNav');
  $(this).addClass('activeNav');

  // Create blank variable for selected section and get icon position
  var selectedSection;

  // Determine which button is selected and assign the matching section
  switch ($(this).attr('id')) {
    case 'homeButton':
        selectedSection = '#homeSection';

      break;
    case 'libraryButton':
        selectedSection = '#librarySection';

        $(selectedSection + ' .banner h3').html('Cylinder Library');
        $(selectedSection + ' .tabletBanner h1').html('Cylinder Library');

      break;
    case 'informationButton':
        selectedSection = '#informationSection';

        $(selectedSection + ' .banner h3').html('Cylinder Information');
        $(selectedSection + ' .tabletBanner h1').html('Cylinder Information');

      break;
    case 'contactButton':
        selectedSection = '#contactSection';

        $(selectedSection + ' .banner h3').html('Cylinder Contact');
        $(selectedSection + ' .tabletBanner h1').html('Cylinder Contact');

      break;
  }


  // Determin if screen is in Mobile or Tablet/Desktop View
  if(!screenSize){
    // Mobile view

    var iconPosition = $(this).position().left;

    // Add styles to container so it remains stationary
    // This is not handled by CSS because the broswer cannot handle two levels of hidden overflow
    // It also locks the container in place so that scrolling down can not occur while screen changes.
    $('#container').height(screenHeight - 50);
    $('#container').css('position','absolute');
    $('#container').css('top','0');
    $('#container').css('overflow','hidden');


    // Prep/Animate selected section
    $(selectedSection).css('display','block');
    $(selectedSection + ' header i').css('left', iconPosition);

    // Assign meta info width
    var cylinderWidth = $('.cylinderSquare').width();//Grab Cylinder Width
    $('.metaInfo').width(cylinderWidth);
    $('.activeCylinder .metaInfo').width($('.activeCylinder').width());

    $(selectedSection).animate({
      top: 0
    },500,function(){

      // Remove and add active and inactive classes
      $('.active').addClass('inactive');
      $('.active').removeAttr('style');
      $('.active').removeClass('active');
      $(selectedSection).removeClass('inactive');
      $(selectedSection).addClass('active');

      // Remove container restrictions
      $('#container').height(screenHeight);
      $('#container').removeAttr('style');

      // Reset Section Height
      $('section').height(screenHeight);
      $('section main').height(screenHeight - 50);

      // Move selected section icon to the center
      $(selectedSection + ' header i').animate({
        left: '50%'
      },500);

    });
  }
  else if (screenSize){
    // Tablet/Desktop view

    var iconPosition = $(this).position().top;

    // Assign Height and width to the selected section
    $(selectedSection).css('display','block');
    $(selectedSection).height(screenHeight);
    $(selectedSection).width(screenWidth - 50);
    fitScreen();
    $(selectedSection).css('top','0');
    $(selectedSection).css('left', screenWidth);


    // Cylinder Metadata
    var cylinderWidth = $('.cylinderSquare').width();//Grab Cylinder Width
    $('.metaInfo').width(cylinderWidth);
    $('.activeCylinder .metaInfo').width($('.activeCylinder').width());


    $(selectedSection + ' header i').css('top', iconPosition);

    $(selectedSection).animate({
      left: 0
    }, 500, function(){

      // Remove and add active and inactive classes
      $('.active').addClass('inactive');
      $('.active').removeAttr('style');
      $('.active').removeClass('active');
      $(selectedSection).removeClass('inactive');
      $(selectedSection).addClass('active');
      fitScreen();
      // Move Selected Icon to center
      $(selectedSection + ' header i').animate({
        top: '50%'
      },500);

    });

  }


});//End of get selected sections



// Home Nav Button Is for the slider button navigation
var homeNavButtons = function(){

  $('.navButton').css('color','#717171');
  $('.activeNav').removeClass('activeNav');
  $('#libraryButton').addClass('activeNav');

  $('#container').css('top','0');
  $('#librarySection .banner h3').html('Cylinder Library');
  $('#librarySection .tabletBanner h1').html('Cylinder Library');

  // Determin if screen is in Mobile or Tablet/Desktop View
  if(!screenSize){
    // Mobile view

    // var iconPosition = $(this).position().left;

    // Add styles to container so it remains stationary
    // This is not handled by CSS because the broswer cannot handle two levels of hidden overflow
    // It also locks the container in place so that scrolling down can not occur while screen changes.
    $('#container').height(screenHeight - 50);
    $('#container').css('position','absolute');
    $('#container').css('overflow','hidden');


    // Prep/Animate selected section
    $('#librarySection').css('display','block');

    // Assign meta info width
    var cylinderWidth = $('.cylinderSquare').width();//Grab Cylinder Width
    $('.metaInfo').width(cylinderWidth);
    $('.activeCylinder .metaInfo').width($('.activeCylinder').width());

    $('#librarySection').animate({
      top: 0
    },500,function(){

      // Remove and add active and inactive classes
      $('.active').addClass('inactive');
      $('.active').removeAttr('style');
      $('.active').removeClass('active');
      $('#librarySection').removeClass('inactive');
      $('#librarySection').addClass('active');

      // Remove container restrictions
      $('#container').height(screenHeight);
      $('#container').removeAttr('style');

      // Reset Section Height
      $('section').height(screenHeight);
      $('section main').height(screenHeight -50);

      // Move selected section icon to the center
      $('#librarySection' + ' header i').animate({
        left: '50%'
      },500);

    });
  }
  else if (screenSize){
    // Tablet/Desktop view

    // var iconPosition = $(this).position().top;

    // Assign Height and width to the selected section
    $('#librarySection').css('display','block');
    $('#librarySection').height(screenHeight);
    $('#librarySection').width(screenWidth - 50);
    fitScreen();
    $('#librarySection').css('top','0');
    $('#librarySection').css('left', screenWidth);


    // Cylinder Metadata
    var cylinderWidth = $('.cylinderSquare').width();//Grab Cylinder Width
    $('.metaInfo').width(cylinderWidth);
    $('.activeCylinder .metaInfo').width($('.activeCylinder').width());



    $('#librarySection').animate({
      left: 0
    }, 500, function(){

      // Remove and add active and inactive classes
      $('.active').addClass('inactive');
      $('.active').removeAttr('style');
      $('.active').removeClass('active');
      $('#librarySection').removeClass('inactive');
      $('#librarySection').addClass('active');

      // Move Selected Icon to center
      $('#librarySection' + ' header i').animate({
        top: '50%'
      },500);

    });

  }

};//End of get selected sections



// ///////////////
// Expand Cylinder
// ///////////////
$(document).on('click','.cylinderSquare',function(){

  // Reset Load Cylinder Button
  $('.loadCylinderButton').css('display','block');
  $('.playControls').css('display','none');

  // Reset Meta Info Color
  $('.metaInfo').css('background-color', 'rgba(0, 0, 0, 0.6)');


  if(screenWidth < 650){
    // Mobile

    // Animate active cylinder back to normal
    $('.activeCylinder').animate({
      width: '50%' //This might need to be restore to 49.5%
    }, 500);

    // Restore active cylinder to normal
    $('.activeCylinder').find('.cylinderTopImage').css('display','none');//Hide cylinder top
    $('.activeCylinder').find('.cylinderTopImage').css('opacity',0);
    $('.activeCylinder').find('.cylinderPlayOptions').css('display','none');//Remove Play Button
    $('.playButton').css('display','block');//Make play button the first one to appear
    $('.pauseButton').css('display','none');//Hide pause button
    $('.activeCylinder').find('.activeMetaInfo').removeClass('activeMetaInfo');//Removes Active Metadata Status
    $('.activeCylinder').find('.subMetaInfo').css('display','none');//Hides Sub Meta info if open
    $('.activeCylinder').find('.metaInfo').width($('.cylinderSquare').width());//Restores width of metadata to regular cylinder width
    $('.activeCylinder').css('width','10%');
    $('.activeCylinder').addClass('cylinderSquare');//Restores cylinder class (so it can be clicked)
    $('.activeCylinder').removeClass('activeCylinder');//Removes active cylinder class

    // Make this active cylinder
    $(this).addClass('activeCylinder');//Add active cylinder class to this
    $(this).removeClass('cylinderSquare');//Remove cylinder class (so it cannot be clicked)
    $(this).find('.metaInfo').addClass('activeMetaInfo');//Make this metadata the active metadata
    $(this).find('.cylinderPlayOptions').css('display','block');//Show Play Button

    // Show Cylinder Top
    $(this).find('.cylinderTopImage').attr('src',$(this).find('.cylinderImageURL').html());
    $(this).find('.cylinderTopImage').css('display','block');
    $(this).find('.cylinderTopImage').animate({
      opacity: .9
    }, 500)

    if(($(this).index() + 1) % 2 == 0){
      // If in an even position spot, move and animate size
       $(this).prev().before($(this));

       $(this).animate({
         width: "100%"
       }, 500);

      // Animate Meta Info
       $(this).find('.activeMetaInfo').animate({
         width: $(window).width() - 10
       }, 500);

     }else{
       $(this).animate({
         width: "100%"
       }, 500);

      // Animate Meta Info
       $(this).find('.activeMetaInfo').animate({
         width: $(window).width() - 10
       }, 500);
     }
  }//End of Mobile
  else if(screenWidth >= 650 && screenWidth <= 999){
    //
    // Tablet
    //

    // Add Meta Info Highlight
    $(this).find('.metaInfo').css('background-color', 'grey');

    // // Remove Large Active Cylinder
    $('#largeActiveCylinder').css('display','none');//Hide active cylinder
    $('#largeActiveCylinder').insertAfter('#libraryContainer');//Must be moved first to keep index in order
    $('#largeActiveCylinder').width(screenWidth - 15);
    $('#largeActiveCylinder .largeCylinderPlayOptions .playButton').css('display','block');//Ensure that play is displayed
    $('#largeActiveCylinder .largeCylinderPlayOptions .pauseButton').css('display','none');//Hide pause button when loaded


    switch (($(this).index() + 1) % 3) {
      case 0:
        $("#largeActiveCylinder").insertAfter($(this));
        $("#largeActiveCylinder").css('display','block');
        break;
      case 1:
        $("#largeActiveCylinder").insertAfter($(".cylinderSquare").eq($(this).index() + 2));
        $("#largeActiveCylinder").css('display','block');
        break;
      case 2:
        $("#largeActiveCylinder").insertAfter($(".cylinderSquare").eq($(this).index() + 1));
        $("#largeActiveCylinder").css('display','block');
        break;
    }

  }//End of Tablet
  else{
    //
    // Desktop
    //

    // Add Meta Info Highlight
    $(this).find('.metaInfo').css('background-color', 'grey');


    // Remove Large Active Cylinder
    $('#largeActiveCylinder').css('display','none');//Hide active cylinder
    $('#largeActiveCylinder').insertAfter('#libraryContainer');//Must be moved first to keep index in order
    $('#largeActiveCylinder').width(screenWidth - 10);
    $('#largeActiveCylinder .largeCylinderPlayOptions .playButton').css('display','block');//Ensure that play is displayed
    $('#largeActiveCylinder .largeCylinderPlayOptions .pauseButton').css('display','none');//Hide pause button when loaded

    switch (($(this).index() + 1) % 5) {
      case 0:
        $("#largeActiveCylinder").insertAfter($(this));
        $("#largeActiveCylinder").css('display','block');
        break;
      case 1:
        $("#largeActiveCylinder").insertAfter($(".cylinderSquare").eq($(this).index() + 4));
        $("#largeActiveCylinder").css('display','block');
        break;
      case 2:
        $("#largeActiveCylinder").insertAfter($(".cylinderSquare").eq($(this).index() + 3));
        $("#largeActiveCylinder").css('display','block');
        break;
      case 3:
        $("#largeActiveCylinder").insertAfter($(".cylinderSquare").eq($(this).index() + 2));
        $("#largeActiveCylinder").css('display','block');
        break;
      case 4:
        $("#largeActiveCylinder").insertAfter($(".cylinderSquare").eq($(this).index() + 1));
        $("#largeActiveCylinder").css('display','block');
        break;

    }

  }//End of Desktop


});//End Expand Cylinder
  //
  // Expand Meta Info
  //
$(document).on('click','.activeMetaInfo',function(){

  $(this).find('.subMetaInfo').height($(this).parent().height());

  $(this).find('.subMetaInfo').toggle();

});
  //
  // Toggle Play/Pause
  //
$(document).on('click','.playButton',function(){
  $('.playButton').toggle();
  $('.pauseButton').toggle();
});
$(document).on('click','.pauseButton',function(){
  $('.playButton').toggle();
  $('.pauseButton').toggle();
});

// //////////////
// Load Cylinder
// /////////////
$(document).on('click','.loadCylinderButton',function(){

  // Ready Player

  // Change Cylinder Player Meta Info
  $('#cylinderPlayerTitle').html(cylinderHolder.title);
  $('#cylinderPlayerImg').attr('src', cylinderHolder.cylinderImg)

  $(".musicPlayer").jPlayer("clearMedia");
  $(".musicPlayer").jPlayer("setMedia",{
    mp3: cylinderHolder.url
  });

  $(".musicPlayer").jPlayer({
      ready: function(event) {
        $(this).jPlayer("setMedia", {
          mp3: cylinderHolder.url,
          preload: 'metadata'
        });
      },
      supplied: "mp3",
      useStateClassSkin: true,
      cssSelector: {
        play: ".playButton",
        pause: ".pauseButton"
      }
  });


  $(this).css('display','none');
  $(this).parent().find('.playControls').css('display','block');

});

// ////////////////
// Meta Info Button
// ////////////////
$('.metaInfoButton').click(function(){
  $('#allMetadata').toggle();
});
$('#closeAllMetadata').click(function(){
  $('#allMetadata').toggle();
});


// /////////////
// Advanced Search
// /////////////
$("#showAdvancedSearch").click(function(){
  $("#advancedSearch").toggle();
});

// //////////////
// SeachBar Lock
// //////////////
var searchBar = $('#cylinderPlayer');

$(window).scroll(function(){

  if(screenWidth <= screenSizeChange){
    // Mobile
    if($(this).scrollTop() > 90 ){
      // console.log("Hello");
  		searchBar.addClass("lockBar");
  	}
  	else{
  		searchBar.removeClass("lockBar");
  	}
  }


});

// //////////////
// Select banner
// //////////////

//
// Phone
//
var imgArray = ['banner1.png', 'banner2.png', 'banner3.png', 'banner4.png'];//Potential banner img URLs
var bannerImgPath = "img/";

// function to create random image path
var randomBannerImg = function(){
  return bannerImgPath + imgArray[Math.round(Math.random() * (imgArray.length - 1))];
}

// Assign random image to each banner
for(var i = 0; i < $('.banner').length; i++){
  $('.banner').eq(i).append(
    "<img class='bannerRotate' src='" + randomBannerImg() + "' alt='Banner Image'>"
  )
}

//
// Tablet
//
var randomTabletBannerNumber = function(){
  return Math.floor(Math.random() * 5) + 1;
}

for(var i = 0; i < $('.tabletBanner').length; i++){
  $('.tabletBanner').eq(i).append(
    "<img class='largeBannerRotate' src='img/tabletBanners/tabletBanner" +
    randomTabletBannerNumber() +
    ".jpg' alt='Banner Image'>"
  )
}

// ///////////////////////
// Select Cylinder BG Image
// ///////////////////////
var randomCylinderImage = function(){
  var cylinderImagePath = 'img/libraryCover/cylinder';
  return cylinderImagePath + (Math.round(Math.random() * 45) + 1) + '.jpg';
}

// //////////////////////
// information page
// //////////////////////

 $('#content_1').click(function(){
  $('#hidden_one').slideToggle();
  var x = $('#content_1').text();
  if(x == 'Read More'){
    $('#content_1').text('Close');
  }else{
    $('#content_1').text('Read More');
  }
});

$('#content_2').click(function(){
  $('#hidden_two').slideToggle();
  var x = $('#content_2').text();
  if(x == 'Read More'){
    $('#content_2').text('Close');
  }else{
    $('#content_2').text('Read More');
  }
});

// modal
$('.video_btn').click(function(){
  var width;
  var height;
  var target = $(this).val();
  $('.modal').css('display', 'block');
  switch(target){
    case 'video_btn_one':
      $('#video_one').css('display', 'block');
      width = $('#video_one').width();
      height = $('#video_one').height();
      adjustSize(width, height);
      break;
    case 'video_btn_two':
      $('#video_two').css('display', 'block');
      width = $('#video_two').width();
      height = $('#video_two').height();
      adjustSize(width, height);
      break;
    case 'video_btn_three':
      $('#video_three').css('display', 'block');
      width = $('#video_three').width();
      height = $('#video_three').height();
      adjustSize(width, height);
      break;
    default:
      break;
  }
});

function adjustSize(width, height){
  var width = width;
  var height = height;
  
  $('.modal_content').css({
    'width': width,
    'height': height
  });
}

$(window).click(function(e){
  var modal = $('.modal')[0];
  if(e.target == modal){
    $('.modal').css('display', 'none');
    $('.video').css('display', 'none');
  }
});

// //////////////////////
// Searchbar
// //////////////////////

if(screenType == 'phone'){
  $('.navButtonContainers > #searchButton').click(function(){
    var height = $('#searchFunction').height();
    if(height == 0){
      $('#searchFunction').animate({
        height: "100px"
      },300);
    }else if(height > 0){
      $('#searchFunction').animate({
        height: 0
      }, 300);
    }
  });
}else{
  $('.navButtonContainers > #searchButton').click(function(){
    var height = $('#searchFunction').height();
    if(height == 0){
      $('#searchFunction').animate({
        height: "130px"
      },300);
    }else if(height > 0){
      $('#searchFunction').animate({
        height: 0
      }, 300);
    }
  });
}

// ////////
// Angular
// ////////
var cylinderApp = angular.module('cylinderApp', []);

// Services for HTTP Requests
cylinderApp.service('cylinderData', ['$http', function($http){
  this.getCylinderData = function(){
    // return $http.get('php/get.php');

    return $http.get('https://edisoncylindertestdb.firebaseio.com/cylinders.json');
  }
}]);



// //////////////////////
// Filter / Search Feature
// //////////////////////
cylinderApp.filter('searchForCylinder', function(){


  return function(arr, searchCylinder){
    fitScreen();
    if(!searchCylinder){
      return arr;
    }

    var result = [];

    searchCylinder = searchCylinder.toLowerCase();


    angular.forEach(arr, function(item){

      if(item.title.toLowerCase().indexOf(searchCylinder) !== -1 || item.artist.toLowerCase().indexOf(searchCylinder) !== -1){
        result.push(item);
      }
    });

    return result;
  }
});

// Controller for App
cylinderApp.controller('cylinderAppCtrl', ['$scope','cylinderData', function($scope, cylinderData){

  // Variables
  $scope.returnedCylinderData;



  // Select Background Color
  var bgColors = ['red', 'orange', 'yellow','green','blue','indigo','violet'];

  var randomColor = function(){
    return bgColors[Math.round(Math.random() * (bgColors.length -1))];
  }


  // Get data
  cylinderData.getCylinderData().then(function(data){
    $scope.returnedCylinderData = data.data;



    for(var i = 0; i < $scope.returnedCylinderData.length; i++){

      $scope.returnedCylinderData[i].imageURL = randomCylinderImage();
      $scope.returnedCylinderData[i].backColor = randomColor();

    };

    // Select and set random cylinder

    var randomCylinder = $scope.returnedCylinderData[Math.floor(Math.random() * $scope.returnedCylinderData.length)];
    $('#cylinderPlayerTitle').html(randomCylinder.title);
    $('#cylinderPlayerImg').attr('src', randomCylinder.cylinderImg);

    $(".musicPlayer").jPlayer("setMedia",{
      m4a: randomCylinder.url,
      oga: randomCylinder.url
    });

    $(".musicPlayer").jPlayer({
        ready: function(event) {
          $(this).jPlayer("setMedia", {
            m4a: randomCylinder.url,
            oga: randomCylinder.url,
            preload: 'metadata'
          });
        },
        supplied: "mp3, oga",
        useStateClassSkin: true
    });

    // All Meta Info
    $('#allMetaImg').attr('src',randomCylinder.cylinderImg);
    $('#allMetaTitle').html(randomCylinder.title);
    $('#allMetaArtist').html(randomCylinder.artist);
    $('#allMetaTake').html(randomCylinder.take);
    $('#allMetaMold').html(randomCylinder.mold);
    $('#allMetaComments').html(randomCylinder.comments);

  });

  // ///////////////
  // Loading Cylinder
  // ///////////////


  $scope.expandCylinder = function(){

    cylinderHolder = this.item;


    // Large Meta Info
    $('#largeCylinderImg').attr('src',this.item.cylinderImg);
    $('#largeCylinderName').html(this.item.title);
    $('#largeArtistName').html(this.item.artist);
    $('#largeMoldNumber').html(this.item.mold);
    $('#largeTakeNumber').html(this.item.take);
    $('#largeComments').html(this.item.comments);

    // All Meta Info
    $('#allMetaImg').attr('src',this.item.cylinderImg);
    $('#allMetaTitle').html(this.item.title);
    $('#allMetaArtist').html(this.item.artist);
    $('#allMetaTake').html(this.item.take);
    $('#allMetaMold').html(this.item.mold);
    $('#allMetaComments').html(this.item.comments);

  }

  // $scope.cylinderSquare.forEach(function(){
  //   console.log("hello");
  // })

}]);//End Of controller
