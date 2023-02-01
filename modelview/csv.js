
const { stringify } = require('csv-stringify')


function object_flattener(object)
{

}

var simple_csv_modelview = function(results, data) // requests? options? key-values?
{
    const stringifier = stringify({ header: true });
    stringifier.write(data);
    csv_table = "";
    stringifier.pipe(csv_table);
    
    results.send(csv_table);
}

module.exports.modelview = simple_csv_modelview;
