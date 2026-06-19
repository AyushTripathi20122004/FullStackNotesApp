<?php
include 'Conn.php';

if (isset($_POST['NotesDelete'])) {

    $DeleteNote = $_POST['Notescard'];

    $stmt = $conn->prepare("DELETE FROM notesstorage WHERE NotesId = ?");

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("i", $DeleteNote);

    if ($stmt->execute()) {
        header("Location: index.html");
        exit();
    } else {
        echo "Delete failed: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>