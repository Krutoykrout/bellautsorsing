<?php
header('Content-Type: application/json');

if (!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['policy'])) {
    $to = 'info@bellautsorsing.ru';
    $subject = '=?utf-8?b?'. base64_encode('Заявка с сайта') .'?=';
    $fromMail = 'site@bellautsorsing.ru';
    $fromName = 'bellautsorsing.ru';
    $date = date(DATE_RFC2822);
    $messageId='<'.time().'-'.md5($fromMail.$to).'@'.$_SERVER['SERVER_NAME'].'>';
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= "Content-type: text/html; charset=utf-8". "\r\n";
    $headers .= "From: ". $fromName ." <". $fromMail ."> \r\n";
    $headers .= "Date: ". $date ." \r\n";
    $headers .= "Message-ID: ". $messageId ." \r\n";
    
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $text = htmlspecialchars($_POST['text']);

    $message = '<html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: ' . $name . '</p>
                        <p>Телефон: ' . $phone . '</p>                        
                        <p>E-mail: ' . $email . '</p> 
                        <p>Сообщение: ' . $text . '</p> 
                    </body>
                </html>';
    $mail = mail($to, $subject, $message, $headers);
    
    if ($mail) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to send email.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Required fields are missing.']);
}
?>