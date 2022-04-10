function handleTickInit(tick) {
    // define the countdown schedule using natural language,
    // you can find some example schedules below.

    // - 'every hour'
    // - 'every minute'
    // - 'every 2 hours'
    // - 'every 10 minutes'
    // - 'every 45 seconds'
    // - 'till 10 every hour'
    // - 'from 13 every hour'
    // - 'from 12 till 15 every hour'
    // - 'every hour wait 10 minutes'
    // - 'every day at 13:15:40'
    // - 'every day at 11'
    // - 'every day at 11 wait 2 hours'
    // - 'every monday at 12'
    // - 'every sunday at 11 wait 2 hours'
    // - 'sunday every hour from 10 till 12'
    // - 'sunday every hour wait 10 minutes'
    // - 'every 1st day of the month at 12:00'
    // - 'every 2nd day of the month at 12:00'
    // - 'every first day of the month at 12:00'
    // - 'every last day of the month at 12:00'
    // - 'every 1st day of the month at 11:55 wait 10 minutes'
    // - 'every 2nd day of the month from 10 till 14 every hour wait 10 minutes'
    // - 'every januari the 12th at 12:00'
    // - 'every 12th of januari at 12:00'

    // combine multiple schedules
    // - 'monday at 12, tuesday at 14, friday at 12'

    // pass timezone
    // Tick.count.schedule('every monday at 12:00', { timezone: '+01:00' })

    // create the schedule counter
    const counter = Tick.count.schedule(getMeetingSchedule(), { timezone: '+08:00', format:['h','m','s']});
    
    counter.onupdate = function(value) {
        tick.value = value;
        if(!document.title) {
            const nextScheduleDate = moment(counter.nextScheduledDate).format("dddd, h:mm a");
            document.title = nextScheduleDate;
        }
    }

    counter.onrepeat = function(nextDate, lastDate) {
        // called when looping around from last date to first date
        const tickerElement = document.getElementById("ticker");
        const logoElement = document.getElementById("logo");
        tickerElement.classList.add("hide")
        logoElement.classList.remove("hide");
    };

    counter.onresume = function(nextDate) {
        // called when switching counter to next date
    };

}

function getMeetingSchedule() {
    let schedule = [];

    // WN Meeting schedule
    schedule.push("every thursday at 20:00");
    schedule.push("every saturday at 19:30");

    // WS
    schedule.push("every wednesday at 19:30");
    schedule.push("every saturday at 17:00");

    // CN

    // TG

    // Special Days
    schedule.push("15th friday at 18:45");
    schedule.push("15th friday at 20:30");
    const schedule_string = schedule.join(",");
    document.querySelector('meta[name="meeting-schedule"]').setAttribute("content", schedule_string);
    return schedule_string;
}

function yyyymmdd(dateIn) {
    var yyyy = dateIn.getFullYear();
    var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
    var dd = dateIn.getDate();
    return String(10000 * yyyy + 100 * mm + dd); // Leading zeros for mm and dd
  }