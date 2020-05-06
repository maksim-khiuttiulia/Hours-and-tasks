
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
        return ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2);
    }

    export let toJsonDate = (date) => {
        return date.toJSON();
    }

    export let concatDateAndTime = (date, time) =>{
        var result = new Date(date);
        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];

        result.setHours(hours, minutes, 0, 0);
        return result;
    }