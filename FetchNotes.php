<?php

include 'Conn.php';

$result = mysqli_query($conn, "SELECT * FROM notesstorage");

$notes = [];

while ($row = mysqli_fetch_assoc($result)) {
    $notes[] = $row;
}

echo json_encode($notes);
?>