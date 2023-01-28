
const axios = require("axios");
const json_view = require("../modelview/json");


class  ControllerContext
{
    constructor(url, func_element_parser, log_header)
    {
        this.uri = url;
        this.header = log_header;
        this.parser = func_element_parser;
    }

    get_result = function(request, results)
    {
        const host_ = 'http://localhost:8081';
        const header_ = 'Access-Control-Allow-Origin';

        results.setHeader(header_, host_);
        axios
            .get(this.uri)
            .then((response) => { 
                const data = this.parser(response.data);
                json_view.modelview(results, data);
            })
            .catch(err => console.error(err));
    }
}

module.exports.controller = ControllerContext;
