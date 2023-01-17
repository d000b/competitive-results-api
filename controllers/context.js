
const axios = require("axios");


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

        const data = { };
        console.log(this.header);
        results.setHeader(header_, host_);
        axios
            .get(this.uri)
            .then((response) => { 
                this.parser(response, data); 
                results.json(data);
            })
            .catch(err => console.log);
    }
}

exports.controller = ControllerContext;
