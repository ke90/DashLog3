<?php
// Binden Sie die DashLog-Klasse ein
require_once 'DashLog.php';

// Erstellen Sie ein Objekt der DashLog-Klasse
$dashLog = new DashLog();

// Rufen Sie die send_log-Methode auf
$message_id = 1; // 1 für Erfolg, 2 für Fehler
$text = "Dies ist eine Testnachricht.";

$dashLog->send_log($message_id, $text);
?>