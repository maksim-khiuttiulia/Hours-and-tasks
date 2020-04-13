
    export let formatedDate = (date) => {
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
         return new Date(date).toLocaleDateString("ru-RU",options);
    }

    export let getCurrentDateJSON = () => {
        return new Date().toJSON();
    }