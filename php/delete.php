<?php

// Grab ID
$cylinderID = $_POST['id'];

unlink("../img/cylinderTops/" . $cylinderID . "cylinderTop.jpg");
unlink("../audio/cylinderAudio/" . $cylinderID . "cylinderAudio.mp3");


if(isset($_REQUEST)){
  $con = mysql_connect("tropht.com:3306","trophtco_Brake","StrongPassword1") or die('Cannot connect to DB' . mysql_error());
  $db = mysql_select_db('trophtco_cylinderProject') or die('Cannot select DB');






  $sql = "DELETE FROM cylinderMetaData WHERE cylinderId = '$cylinderID'";

  $result = mysql_query($sql);
  if($result){
    echo "Delete successful!";
  }else{
    echo "Unable to delete";
  }


}

 ?>
