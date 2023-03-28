
const axios = require("axios");
const viewer = require("../modelview/views");


class  ControllerContext
{
    constructor(url, func_element_parser, log_header)
    {
        this.uri = url;
        this.header = log_header;
        this.parser = func_element_parser;
    }

    get_fetch_and_view_data = function(request, results)
    {
        const host_ = 'http://localhost:8081';
        const header_ = 'Access-Control-Allow-Origin';

        const view = request.query['view'];
        // console.log(this.header);
        results.setHeader(header_, host_);
        axios
            .get(this.uri)
            .then((response) => { 
                // console.log("Response from '" + response.config.url + "' getted");
                // console.log(this.parser);
                const data = this.parser(response.data);
                // console.log("Data parsed");
                viewer.viewer_from_key(view)(results, data);
            })
            .catch(err => console.error(err));
    }
}

module.exports.controller = ControllerContext;
