class Configuration {
    constructor() {
        this.environment = 'prod'
        this.alpacaEditor = '#alpacaEdit';
    }

    /**
     * Fetch the components configuration file
     * @param {string} name name of the component configuration to be fetched
     */
    getComponentConfig(name) {
        let data;

        $.ajax({
            url: '/src/app/components/singles/' + name + '/component.json',
            async: false,
            type: 'GET',
            success: function (res) {
                data = res;
            }
        });

        return data;
    }
}

export default Configuration;