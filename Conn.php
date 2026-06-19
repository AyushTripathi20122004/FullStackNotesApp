<?php
$conn = mysqli_connect('localhost', 'root', '', 'notesapp');

if (!$conn) {
    die('Connection Failed: ' . mysqli_connect_error());
}
?>