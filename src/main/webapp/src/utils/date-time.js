
    export let formatedDateTime = (dateTime) => {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour : 'numeric', minute : 'numeric' };
         return new Date(dateTime).toLocaleDateString("ru-RU",options);
    }