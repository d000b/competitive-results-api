const axios = require("axios");
const cheerio = require("cheerio");


export class  ControllerContext
{
    constructor(url, log_header, func_element_parser)
    {
        this.uri = url;
        this.header = log_header;
        this.parser = func_element_parser;
    }

    get_result()
    {
        const axios = require("axios");
        const cheerio = require("cheerio");

        const host_ = 'http://localhost:8081';
        const header_ = 'Access-Control-Allow-Origin';

        const data = { };
        console.log(this.header)
        results.setHeader(header_, host_);
        axios
            .get(this.uri)
            .then(
               (response) => {

                    this.parser(response, data)
                });
        return data;
    }
}
