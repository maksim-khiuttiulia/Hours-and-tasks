
    export let formatedDate = (date) => {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric', hours : 'numeric', minutes : 'numeric' };
         return new Date(date).toLocaleDateString("ru-RU",options);
    }

    export let getCurrentDateJSON = () => {
        return new Date().toJSON();
    }

    export let getFormatedHoursMinutes = (hours, minutes) => {
        if (minutes === 60){
            minutes = 0;
        }
        return ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2)
    }