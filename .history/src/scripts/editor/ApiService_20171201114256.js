/**
 * API Service built to easily manage http requests using jQuery
 * Built and managed by Blake Connally
 */
class APIService {

    constructor() {

    }

    /**
     * 
     * @param {string} url url to query
     * @param {function} success function called on success
     * @param {function} error function called on error 
     * @param {string} dataType Response data type
     */
    get(url, success = function () {}, error = function () {}, dataType = 'JSON') {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: dataType,
            success: function (response) {
                success(response);
            },
            error: function (error) {
                error(error);
            }
        });
    }

    post() {

    }

    put() {

    }

    delete() {

    }
}