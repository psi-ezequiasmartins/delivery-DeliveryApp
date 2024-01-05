<?php
    $_SERVER = "http://localhost:3000"; // modo de teste local
    // $_SERVER = "https://srv.deliverybairro.com"; // modo de teste online (web)
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');
        exit();
    }
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Teste PHP</title>
    </head>
    <body>
        <?php echo "<p>Olá Mundo!</p>"; ?>
    </body>
</html>