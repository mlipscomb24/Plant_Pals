function notifDetermination(notificationSettings, currentDate) {
    const currentDay = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const currentHour = currentDate.getHours();

    const isCorrectDay = notificationSettings.dayOfWeek.includes(currentDay);

    const isCorrectTime = (
        notificationSettings.time.includes("Morning") && currentHour >= 6 && currentHour < 12 ||
        notificationSettings.time.includes("Noon") && currentHour >= 12 && currentHour < 18 ||
        notificationSettings.time.includes("Evening") && currentHour >= 18 && currentHour < 24
    );
    return isCorrectDay && isCorrectTime;
}

module.exports = { notifDetermination };