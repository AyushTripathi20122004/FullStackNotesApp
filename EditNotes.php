<?php
include 'conn.php';

if (isset($_POST['SubmitEditData'])) {

    $Title = $_POST['title'];
    $Text = $_POST['text'];
    $NotesColor = $_POST['NotesColor'];
    $TitleColor = $_POST['TitleColor'];
    $TextColor = $_POST['TextColor'];
    $NotesIdx = $_POST['NotesId'];

    $stmt = $conn->prepare("
        UPDATE notesstorage
        SET Title = ?, Text = ?, NotesColor = ?, TitleColor = ?, TextColor = ?
        WHERE NotesId = ?
    ");

    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("sssssi", $Title, $Text, $NotesColor, $TitleColor, $TextColor, $NotesIdx);

    if ($stmt->execute()) {
        header("Location: index.html");
        exit();
    } else {
        echo "Update failed: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>