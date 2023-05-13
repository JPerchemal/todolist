
// parseSecondsToHMS --> Fonction utilitaire qu'on peut utiliser n'importe où !
// Pas besoin de créer un hook pour ça.

// Un hook s'utilise  quand on a une gestion du state et qu'on veut pouvoir la déléguer et/ou la réutiliser (cette gestion du state).
// Par exemple ds useTimer avec le useState.

const parseSecondsToHMS = (timeInSeconds) => {
    timeInSeconds = Number(timeInSeconds);
    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor(timeInSeconds % 3600 / 60);
    const s = Math.floor(timeInSeconds % 3600 % 60);

    const hDisplay = h < 10 ? '0' + h : h;
    const mDisplay = m < 10 ? '0' + m : m;
    const sDisplay = s < 10 ? '0' + s : s;

    return `${hDisplay}:${mDisplay}:${sDisplay}`;
};

export { parseSecondsToHMS }