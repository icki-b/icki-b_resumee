<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $imie_nazwisko = $_POST["imie_nazwisko"];
    $nazwa_firmy = $_POST["nazwa_firmy"];
    $email = $_POST["email"];
    $numer_telefonu = $_POST["numer_telefonu"];
    $wiadomosc = $_POST["wiadomosc"];

    $to = "bartlomiej.nowicki23@gmail.com";
    $subject = "Nowa wiadomość od $imie_nazwisko";

    $message = "Imię i Nazwisko: $imie_nazwisko\n";
    $message .= "Nazwa Firmy: $nazwa_firmy\n";
    $message .= "Adres Email: $email\n";
    $message .= "Numer Telefonu: $numer_telefonu\n";
    $message .= "Treść Wiadomości:\n$wiadomosc";

    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo "Wiadomość została wysłana.";
    } else {
        echo "Wystąpił błąd podczas wysyłania wiadomości.";
    }
}
?>
