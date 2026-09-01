<?
if($_POST['name_user'] != "" && $_POST['phone_user'] != "" && $_POST['agree'] != ""){
    $to  = 'info@bellautsorsing.ru';
    $subject = '=?utf-8?b?'. base64_encode('Записаться на консультацию') .'?=';
    $fromMail = 'site@bellautsorsing.ru';
    $fromName = 'bellautsorsing.ru';
    $date = date(DATE_RFC2822);
    $messageId='<'.time().'-'.md5($fromMail.$to).'@'.$_SERVER['SERVER_NAME'].'>';
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= "Content-type: text/html; charset=utf-8". "\r\n";
    $headers .= "From: ". $fromName ." <". $fromMail ."> \r\n";
    $headers .= "Date: ". $date ." \r\n";
    $headers .= "Message-ID: ". $messageId ." \r\n";
    $message = '<html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>ФИО: '.$_POST['name_user'].'</p>
                        <p>Телефон: '.$_POST['phone_user'].'</p>                        
                        <p>E-mail: '.$_POST['email_user'].'</p> 
                        <p>Сообщение: '.$_POST['text_user'].'</p> 
                    </body>
                </html>';
    $mail = mail($to, $subject, $message, $headers);
    echo $mail;
}else{
    echo 2;
}
?>