window.serverAddress = "http://127.0.0.1:5000";

function getData ({
    method = 'GET',
    body = null,
                  } = {}) {
     const data = {
         mode: 'cors',
         credentials: 'include',
         method,
         headers: {
             'Access-Control-Allow-Origin': '*'
         }
     };

     if (method !== 'GET') {
         data.body = body;
     }

     return data;
}


async function makeFetch({
                       url = '/',
                       method = 'GET',
                       body = null,
                       type = 'application/json',
                   } = {}) {
    const response = await fetch(window.serverAddress + url, getData({method, body}));
    const responseJSON = await response.json();

    return {
        status: responseJSON.code,
        parsedJSON: responseJSON,
    };
}

export default class Htpp {
    async ajaxGet({
                             url = '/'
                         } = {}) {
        return await makeFetch({url: url, method: 'GET'});
    }

    async ajaxPost ({
        url = '/',
        body = null,
                    } = {}) {
        return await makeFetch({url: url, method: 'POST',body: body});
    }
}
