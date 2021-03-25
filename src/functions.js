export function getMeridiano(fecha, hora) {
    const now = new Date(`${fecha} ${hora}`);
    const mer = now.getHours < 12 ? 'AM' : 'PM';
    return mer;
}

export function getHora(fecha, hora) {
    const now = new Date(`${fecha} ${hora}`);
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };
    return new Intl.DateTimeFormat('en-US', options).format(now);
}

export function getFecha(fecha, hora) {
    const now = new Date(`${fecha} ${hora}`);
    const arrFecha = [];

    arrFecha[0] = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
        now
    );
    arrFecha[1] = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
        now
    );
    arrFecha[2] = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(
        now
    );

    return arrFecha;
}

export function getEvento(meridiano, datos) {
    if (meridiano == 'AM') {
        console.log('getEvento1', meridiano);
        return {
            texto: 'Atardecer',
            hora: datos.sunset,
        };
    } else {
        console.log('getEvento2', meridiano);
        return {
            texto: 'Amanecer',
            hora: datos.sunrise,
        };
    }
}

export function getModalData(meridiano, datos) {
    if (meridiano == 'AM') {
        console.log('getEventoModal1', meridiano);
        return {
            meridiano,
            hora: getHora(datos.date, datos.current_time),
            evento: datos.sunrise,
            puesta_astro: datos.sunset,
            med_astro: datos.solar_noon,
            sal_astro: datos.moonrise,
        };
    } else {
        console.log('getEventoModal2', meridiano);
        //Luna
        return {
            meridiano,
            hora: getHora(datos.date, datos.current_time),
            evento: datos.sunrise,
            puesta_astro: datos.moonset,
            med_astro: datos.moonrise,
            sal_astro: datos.sunrise,
        };
    }
}

export function getObjectTextoModal(meridiano) {
    if (meridiano == 'AM') {
        return {
            meridiano,
            hora: 'Hora Actual',
            evento: 'Amanecer',
            puesta_astro: 'Puesta De Sol',
            med_astro: 'Medianoche Solar',
            sal_astro: 'Salida de la Luna',
        };
    } else {
        //Luna
        return {
            meridiano,
            hora: 'Hora Actual',
            evento: 'Amanecer',
            puesta_astro: 'Puesta De Luna',
            med_astro: 'Medianoche Lunar',
            sal_astro: 'Salida del Sol',
        };
    }
}

export function superFetch(url) {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    reject(new Error('Aqui no hay nada OK'));
                } else {
                    return response.json();
                }
            })
            .then(function (data) {
                resolve(data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
