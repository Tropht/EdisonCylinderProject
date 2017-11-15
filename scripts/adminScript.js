// Test Upload
$('#uploadAudio').click(function(){

  var data = $('#fileForm').serialize();

  $.ajax({
    data: data,
    type: "post",
    url: "php/test.php",
    success: function(data){
      // window.location.reload();
      alert(data);
    }
  })

});

// ////////////////////////////////////////
// Upload/Update/Delte Files Through Ajax
// ////////////////////////////////////////

  // /////////////
  // Add Cylinder
  // /////////////
$('#createNewCylinderButton').click(function(){

  $('#randomCylinderId').val(Date.now());//Create unique ID


  // Handle Files/ Find file types
  var pictureFile = $("#cylinderTop")[0].files[0];
  var audioFile = $("#cylinderAudio")[0].files[0];

  if(pictureFile.type != "image/jpeg"){
    alert("You must use a .jpg filetype for your image!");
    return;
  }
  if(audioFile.type != "audio/mp3"){
    alert("You must use a .mp3 filetype for your audio!");
    return;
  }

  // console.log(pictureFile.name + " | " + pictureFile.size + " | " + pictureFile.type);

  var formdata = new FormData();
  formdata.append("cylinderTop", pictureFile);
  formdata.append("cylinderAudio", audioFile);
  formdata.append("id", $('#randomCylinderId').val());


  var ajax = new XMLHttpRequest();

  ajax.upload.addEventListener("progress", progressHandler, false);
  ajax.addEventListener("load", completeHandler, false);
  ajax.addEventListener("error", errorHandler, false);
  ajax.addEventListener("abort", abortHandler, false);
  ajax.open("POST", "php/uploadFile.php");
  ajax.send(formdata);

  // Handle Text data (This is handled through the completeHandler function)

});

  // ////////////////
  // Update Cylinder
  // ////////////////
// $('#updateCylinder').click(function(){
//   var data = $('#cylinderUpdateForm').serialize();
//
//   $.ajax({
//     data: data,
//     type: "post",
//     url: "php/update.php",
//     success: function(data){
//
//       alert(data);
//       window.location.reload();
//     }
//   })
//
// });

$('#updateCylinder').click(function(){

  if(document.getElementById('updateCylinderTop').files.length == 0 && document.getElementById('updateCylinderAudio').files.length == 0){

      var data = $('#cylinderUpdateForm').serialize();

      $.ajax({
        data: data,
        type: "post",
        url: "php/update.php",
        success: function(data){

          alert(data);
          window.location.reload();
        }
      });
  }
  else{
    // Handle Files/ Find file types
    var pictureFile = $("#updateCylinderTop")[0].files[0];
    var audioFile = $("#updateCylinderAudio")[0].files[0];

    // if(pictureFile.type != "image/jpeg"){
    //   alert("You must use a .jpg filetype for your image!");
    //   return;
    // }
    // if(audioFile.type != "audio/mp3"){
    //   alert("You must use a .mp3 filetype for your audio!");
    //   return;
    // }

    // console.log(pictureFile.name + " | " + pictureFile.size + " | " + pictureFile.type);

    var formdata = new FormData();
    if(document.getElementById('updateCylinderTop').files.length == 0){
      formdata.append("cylinderAudio", audioFile);
    }else if(document.getElementById('updateCylinderAudio').files.length == 0){
      formdata.append("cylinderTop", pictureFile);
    }else{
      formdata.append("cylinderTop", pictureFile);
      formdata.append("cylinderAudio", audioFile);
    }
    // formdata.append("cylinderTop", pictureFile);
    // formdata.append("cylinderAudio", audioFile);
    formdata.append("id", $('#updateCylinderId').val());


    var ajax = new XMLHttpRequest();

    ajax.upload.addEventListener("progress", updateProgressHandler, false);
    ajax.addEventListener("load", updateHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "php/uploadFile.php");
    ajax.send(formdata);

    // Handle Text data (This is handled through the updateHandler function)
  }


});

  // ////////////////
  // Delete Cylinder
  // ////////////////
$('#deleteCylinder').click(function(){

  var confirm = window.confirm("Click 'OK' to delete cylinder");

  if(confirm == !true){
    return;
  }

  var data = $('#cylinderUpdateForm').serialize();

  $.ajax({
    data: data,
    type: "post",
    url: "php/delete.php",
    success: function(data){

      alert(data);
      window.location.reload();
    }
  })
});

  // /////////
  // Add User
  // /////////
$('#addUserButton').click(function(){
  $('#newUserId').val(Date.now());

  var data = $('#newUserForm').serialize();

  $.ajax({
    data: data,
    type: "post",
    url: "php/addUser.php",
    success: function(data){

      alert(data);
      window.location.reload();
    }
  })
});

// Delete User at bottom of Angular section (ng-repeat forbids jquery click events)



// ///////////////
// Upload Handlers
// ///////////////
var progressHandler = function(event){
  var percent = (event.loaded / event.total) * 100;
  $("#progressBar").val(Math.round(percent));
  $("#status").innerHTML = Math.round(percent) + "% uploaded...please wait.";
  // console.log(percent);
}
var updateProgressHandler = function(event){
  var percent = (event.loaded / event.total) * 100;
  $("#updateProgressBar").val(Math.round(percent));
  $("#status").innerHTML = Math.round(percent) + "% uploaded...please wait.";
  // console.log(percent);
}
var completeHandler = function(event){
  alert("Upload Complete");
  // $("#status").innerHTML = event.target.responseText;
  // $("#progressBar").value = 0;
  var data = $('#createForm').serialize();
  $.ajax({
    data: data,
    type: "post",
    url: "php/post.php",
    success: function(data){

      alert(data);
      window.location.reload();
    }
  });
}
var updateHandler = function(event){
  alert("Upload Complete");
  // $("#status").innerHTML = event.target.responseText;
  // $("#progressBar").value = 0;
  var data = $('#createForm').serialize();
  $.ajax({
    data: data,
    type: "post",
    url: "php/updateFile.php",
    success: function(data){

      alert(data);
      window.location.reload();
    }
  });
}
var errorHandler = function(event){
  alert("Upload Failed");
  // $("#status").innerHTML = "Uploaded Failed";
}
var abortHandler = function(event){
  alert("Upload Aborted");
  // $("#status").innerHTML = "Uploaded Aborted";
}

// //////
// Angular
// //////
var cylinderAdminApp = angular.module('cylinderAdminApp', []);

  //
  // Angular Service
  //
cylinderAdminApp.service('cylinderAdminData', ['$http', function($http){
  this.getAdminCylinderData = function(){
    return $http.get('php/get.php');

    // return $http.get('https://edisoncylindertestdb.firebaseio.com/cylinders.json');
  };
}]);

cylinderAdminApp.service('cylinderAdminUsers', ['$http', function($http){
  this.getAdmins = function(){
    return $http.get('php/getUsers.php');
  };

}]);

cylinderAdminApp.controller('cylinderAdminCtrl', ['$scope', 'cylinderAdminData', 'cylinderAdminUsers', function($scope, cylinderAdminData, cylinderAdminUsers){

  // Variable
  $scope.returnedData;
  $scope.usersData;


  // Get Data
  cylinderAdminData.getAdminCylinderData().then(function(data){
    $scope.returnedData = data.data;
    console.log($scope.returnedData);
  });

  cylinderAdminUsers.getAdmins().then(function(data){
    $scope.usersData = data.data;
  });



  $scope.getItemData = function(){
    // console.log(this.item);

    $('#cylinderFormInfo').scrollTop(0);
    $('#modal--bg').addClass('dark');
    $('#cylinderFormInfo').addClass('show');


    $scope.cylinderTitle = this.item.cylinderTitle;
    $scope.cylinderArtist = this.item.cylinderArtist;
    $scope.cylinderComments = this.item.cylinderComments;
    $scope.cylinderOtherComments = this.item.cylinderOtherComments;
    $scope.cylinderRecordLabel = this.item.cylinderRecordLabel;
    $scope.cylinderMonthYear = this.item.cylinderMonthYear;
    $scope.cylinderEQSettings = this.item.cylinderEQSettings;
    $scope.cylinderCondition = parseInt(this.item.cylinderCondition);
    $scope.cylinderMold = parseInt(this.item.cylinderMold);
    $scope.cylinderNumber = parseInt(this.item.cylinderNumber);
    $scope.cylinderTake = parseInt(this.item.cylinderTake);
    $scope.cylinderId = parseInt(this.item.cylinderID);

    $scope.checkbox = {
      unplayable: false,
      playable: false,
      flatEdge: false,
      ucsb: false
    }

    var changeToBoolean = function(itemData){
      if(parseInt(itemData) == 1){
        return true;
      }else{
        return false;
      }
    }

    $scope.checkbox.playable = changeToBoolean(this.item.crackedPlayable);
    $scope.checkbox.unplayable = changeToBoolean(this.item.cracedUnplayable);
    $scope.checkbox.flatEdge = changeToBoolean(this.item.flatEdge);
    $scope.checkbox.ucsb = changeToBoolean(this.item.inUCSBdb);


  }

  $scope.closeEdit = function(){


    $('#cylinderFormInfo').removeClass('show');
    $('#modal--bg').removeClass('dark');

    $scope.cylinderTitle = null;
    $scope.cylinderArtist = null;
    $scope.cylinderComments = null;
    $scope.cylinderOtherComments = null;
    $scope.cylinderRecordLabel = null;
    $scope.cylinderMonthYear = null;
    $scope.cylinderEQSettings = null;
    $scope.cylinderCondition = null;
    $scope.cylinderMold = null;
    $scope.cylinderNumber = null;
    $scope.cylinderTake = null;
    $scope.cylinderPlayable = null;
    $scope.checkbox.playable = null;
    $scope.checkbox.unplayable = null;
    $scope.checkbox.flatEdge = null;
    $scope.checkbox.ucsb = null;
    $scope.checkbox.website = null;

  }

  // New Form
  $scope.openNewForm = function(){
    $('#createNewCylinderForm').scrollTop(0);
    $('#modal--bg').addClass('dark');
    $('#createNewCylinderForm').addClass('show');
  }
  $scope.closeNewForm = function(){
    $('#modal--bg').removeClass('dark');
    $('#createNewCylinderForm').removeClass('show');
  }

  // New User Form
  $scope.openNewUserForm = function(){
    $('#modal--bg').addClass('dark');
    $('#newUserDiv').addClass('show');
  }
  $scope.closeNewUserForm = function(){
    $('#modal--bg').removeClass('dark');
    $('#newUserDiv').removeClass('show');
  }

  // User List
  $scope.openUserList = function(){
    $('#userListDiv').scrollTop(0);
    $('#modal--bg').addClass('dark');
    $('#userListDiv').addClass('show');
  }
  $scope.closeUserList = function(){
    $('#modal--bg').removeClass('dark');
    $('#userListDiv').removeClass('show');
  }

  // Delete User
  $scope.deleteUser = function(){

    var confirm = window.confirm("Click 'OK' to delete user");

    if(confirm == !true){
      return;
    }

    if($scope.usersData.length == 1){
      alert("Cannot delete. If deleted, there will be no users.");
      return;
    }

    $('#userID').val(this.user.userID);

    var data = $('#deleteForm').serialize();
    $.ajax({
      data: data,
      type: "post",
      url: "php/deleteUser.php",
      success: function(data){

        alert(data);
        window.location.reload();
      }
    });
  }


}]);
