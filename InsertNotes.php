<?php
include 'Conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $Title = $_POST['title'];
    $Text = $_POST['text'];
    $NotesColor = $_POST['NotesColor'];
    $TitleColor = $_POST['TitleColor'];
    $TextColor = $_POST['TextColor'];

    $stmt = $conn->prepare("INSERT INTO notesstorage (Title, Text, NotesColor, TitleColor, TextColor) VALUES (?, ?, ?, ?, ?)");

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("sssss", $Title, $Text, $NotesColor, $TitleColor, $TextColor);

    if ($stmt->execute()) {
        header("Location: index.html");
        exit();
    } else {
        echo "Insert failed: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>