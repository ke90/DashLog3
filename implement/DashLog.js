class DashLog {
  constructor() {
    this.url = "http://127.0.0.1:1337/api/logger/webhook2/";
    this.data = {
      id_app: 1,
    };
  }

  send_log(message_id, text) {
    console.log("Sendet Daten an DashLog...");

    this.data.message_text = text;
    this.data.message_id = message_id;

    fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.data),
    })
      .then((response) => response.text())
      .then((text) => console.log(text))
      .catch((error) => console.error("Error:", error));
  }
}

// Verwendung der Klasse
//const dashLog = new DashLog();
//dashLog.send_log(1, "Dies ist eine Testnachricht.");
