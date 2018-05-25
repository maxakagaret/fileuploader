<?php
// $uploaddir = getcwd().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR;
// $uploadfile = $uploaddir.basename($_FILES['file']['name']);

// move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);
error_reporting('NONE');
$error = false;
$files = array();

$uploaddir = dirname(__FILE__).DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR;

if(!is_dir($uploaddir)) mkdir( $uploaddir, 0777 );
foreach( $_FILES as $file ){
    if(move_uploaded_file($file['tmp_name'], $uploaddir.basename($file['name']))){
        $files[] = realpath( $uploaddir . $file['name'] );
    }
    else{
        $error = true;
    }
}

$data = $error ? array('error' => 'File uppload error') : array('files' => $files );

echo json_encode( $data );
?>