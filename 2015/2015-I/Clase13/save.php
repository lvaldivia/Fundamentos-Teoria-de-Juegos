<?php 

$user = 'root';
$password = '';
$server = 'localhost';
$database = "plataformer_game";

$conn = mysqli_connect($server,$user,$password,$database);

$score = intval($_POST['score']);

$created_at = date('Y-m-d H:i:s');

$sql = "INSERT INTO user_scores(score, created_at) 
			VALUES($score,'$created_at')";

if(mysqli_query($conn,$sql)){
	echo "Hizo el insert";
}else{
	echo "No lo hizo";
}






 ?>