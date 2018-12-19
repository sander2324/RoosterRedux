//#region base functions

// Get the current week number (thanks StackOverflow)
Date.prototype.getWeek = function() {
    let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

//#endregion

//#region API handling

// Gets the latest data from the deltion API
async function getRoster(group) {
    let result = await axios.get(`https://roosters-api.stormheg.co/api/v1/roster?group=${group}`).catch((err) => {
        console.log(err);
    });
    return result.data.data;
}

// sort the api on week number
async function getCurrentWeek(group) {
    let apiArray = await getRoster(group);
    let currentWeek = [];
    for(let i = 0; i < apiArray.length; i++) {
        if(apiArray[i].weeknum == new Date().getWeek() && !apiArray[i].date_f.startsWith('z')) currentWeek.push(apiArray[i]);
    }
    return currentWeek;
}

//#endregion

//#region Vue

let dayItem = new Vue({
    el: '.scheduleArea',
    data: {
        week: '',
        today: new Date().toLocaleDateString()
    },
    async mounted() {
        let data = await getCurrentWeek('ic1e');
        this.week = data;
    }
});

//#endregion