
    export let formatedDate = (date) => {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
         return new Date(date).toLocaleDateString("ru-RU",options);
    }

    export let getCurrentDateJSON = () => {
        return new Date().toJSON();
    }

    export let getFormatedTime = (hours, minutes) => {
        return ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2)
    }