<?php 

$arrContextOptions=array(
    "ssl"=>array(
        "verify_peer"=>false,
        "verify_peer_name"=>false,
    ),
);  

$content = file_get_contents($_POST['url'],false, stream_context_create($arrContextOptions));
$name = sprintf("assets/%s.jpg",$_POST['id']);
file_put_contents($name, $content);

 ?>