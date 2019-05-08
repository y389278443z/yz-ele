import {baseUrl} from "./env";

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;
    if (type === 'GET') {
        let getStr = '';
        Object.keys(data).forEach(item => {
            getStr += item + '=' + data[item] + '&';
        });
        if (getStr !== '') {
            getStr = getStr.substring(0, getStr.lastIndexOf('&'));
            url = url + '?' + getStr;
        }
    }

    if (window.fetch && method === 'fetch') {
        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'force-cache'
        };

        if (type === 'POST') {
            Object.assign(requestConfig, {
                body: JSON.stringify(data)
            })
        }

        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson;
        } catch (e) {
            throw new Error(e)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let requestData = '';
            if (type === 'POST') {
                requestData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader('Conetent-Type', 'application/x-www-form-urlencoded');
            requestObj.send(requestData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState === 4) {
                    if (requestObj.status === 200) {
                        let obj = requestObj.response;
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj);
                    } else {
                        reject(requestObj);
                    }
                }
            }

        })
    }
}


