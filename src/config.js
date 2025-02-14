export const api = 'https://project-ic-wqsl.onrender.com'// ip base da api

export const requestConfig = (method, dados, contentType =  'application/json' ,token = null) => { //configuracao do request

    let config

    config = {
        method: method,
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': contentType
        },        
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}

