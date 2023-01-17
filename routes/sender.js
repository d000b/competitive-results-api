

function send_data_from_file(filesystem, filename, results)
{
    filesystem.readFile(filename, 'utf8', (file_error, file_data) => {
        if (file_error)
        {
            console.error(file_error);
            
            results.send("");
        }
        else
        {
            results.send(json_message);
        }
    });
}
