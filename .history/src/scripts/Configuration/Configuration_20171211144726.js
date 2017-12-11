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
        $.get('/src/app/components/singles/' + name + '/component.json', function (res) {
            console.log(res);
        });
    }
}

export default Configuration;