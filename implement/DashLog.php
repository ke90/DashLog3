<?php

class DashLog {
    private $url;
    private $data;

    public function __construct() {
        $this->url = 'http://127.0.0.1:1337/api/logger/webhook2/';
        $this->data = array('id_app' => 1);
    }

    public function send_log($message_id, $text) {
        echo "Sendet Daten an DashLog...\n";

        $this->data['message_text'] = $text;
        $this->data['message_id'] = $message_id;

        $options = array(
            'http' => array(
                'header'  => "Content-type: application/json\r\n",
                'method'  => 'POST',
                'content' => json_encode($this->data),
            ),
        );

        $context  = stream_context_create($options);
        $result = file_get_contents($this->url, false, $context);

        if ($result === FALSE) {
            echo "Fehler bei der Anfrage\n";
        } else {
            echo $result . "\n";
        }
    }
}

?>