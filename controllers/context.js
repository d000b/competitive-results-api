
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
        results.setHeader(header_, host_);
        axios
            .get(this.uri)
            .then((response) => { 
                const data = this.parser(response.data);
                viewer.viewer_from_key(view)(results, data);
            })
            .catch(err => console.error(err));
    }
}

module.exports.controller = ControllerContext;
