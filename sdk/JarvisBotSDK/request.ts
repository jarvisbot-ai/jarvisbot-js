import type {SdkConfig} from "./type";
import type JarvisChatParams from "./params_chat";
import type JarvisTxt2imgParams from "./params_txt2img";
import type JarvisImg2imgParams from "./params_img2img";
import {JarvisApiUri, JarvisMsg} from "./enums";

const default_get_opt = {
    method: "GET",
    redirect: "follow"
};

export async function inner_dispatch(conf: SdkConfig): Promise<any> {
    return new Promise((resolve, reject) => {
        let url = conf.base_url + JarvisApiUri.uri_check + "/" + conf.app_token
        // @ts-ignore
        fetch(url, default_get_opt).then((response) => {
            if (response.status == 200) {
                response.text().then((result) => {
                    try {
                        let result_obj = JSON.parse(result);
                        if (result_obj.code == 0) {
                            resolve(result_obj.data)
                        } else {
                            reject(new Error(JarvisMsg.dispatch_code_err))
                        }
                    } catch (error) {
                        reject(new Error(JarvisMsg.dispatch_parse_err))
                    }
                }).catch((e) => {
                    reject(e)
                })
            } else {
                reject(new Error(JarvisMsg.dispatch_fetch_err))
            }
        }).catch((e) => {
            reject(e)
        })
    });
}

export async function inner_img2img(params: JarvisImg2imgParams, chat_url: String, conf: SdkConfig) {
    const myHeaders = new Headers();
    let app_token = conf.app_token
    myHeaders.append("App-token", app_token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(params);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // console.log("img2img start ...")
    return new Promise((resolve, reject) => {
        // @ts-ignore
        fetch(chat_url, requestOptions).then((response) => {
            if (response.status == 200) {
                response.text().then((result) => {
                    resolve(result)
                }).catch((e) => {
                    reject(e)
                })
            } else {
                reject(JarvisMsg.dispatch_img2img_err)
            }
        }).catch((e) => {
            reject(e)
        })
    })

}

export async function inner_txt2img(params: JarvisTxt2imgParams, chat_url: String, conf: SdkConfig) {
    const myHeaders = new Headers();
    let app_token = conf.app_token
    myHeaders.append("App-token", app_token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(params);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // console.log("txt2img start ...")
    // @ts-ignore
    return new Promise((resolve, reject) => {
        // @ts-ignore
        fetch(chat_url, requestOptions).then((response) => {
            if (response.status == 200) {
                response.text().then((result) => {
                    resolve(result)
                }).catch((e) => {
                    reject(e)
                })
            } else {
                reject(JarvisMsg.dispatch_txt2img_err)
            }
        }).catch((e) => {
            reject(e)
        })
    })
}

export async function inner_completions(params: JarvisChatParams, chat_url: String, conf: SdkConfig) {
    const myHeaders = new Headers();
    let app_token = conf.app_token
    myHeaders.append("App-token", app_token);
    myHeaders.append("Content-Type", "application/json");
    params.sse = params.stream
    const raw = JSON.stringify(params);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    //sse
    if (params.stream) {
        let pre_chat_url = chat_url + "_pre"
        return new Promise((resolve, reject) => {
            // @ts-ignore
            fetch(pre_chat_url, requestOptions).then((response) => {
                if (response.status == 200) {
                    response.text().then((result) => {
                        let url = chat_url + "/" + result + "?app_token=" + app_token;
                        const eventSource = new EventSource(url);
                        resolve(eventSource)
                        // eventSource.onmessage = function (event) {
                        //     // console.log('Received data:', event.data);
                        // };
                        // eventSource.onopen = function (event) {
                        //     // console.log('Connection to server opened.');
                        // };
                        eventSource.onerror = function (event) {
                            if (eventSource.readyState === EventSource.CLOSED) {
                                // console.log('Connection to server closed.');
                                eventSource.close();
                            } else {
                                eventSource.close();
                                // console.error('EventSource failed:', event);
                            }
                        };
                    }).catch((e) => {
                        reject(e)
                    })
                } else {
                    reject(JarvisMsg.dispatch_chat_stream_err)
                }
            }).catch((e) => {
                reject(e)
            })
        })
    } else {
        // console.log("chat start...")
        return new Promise((resolve, reject) => {
            // @ts-ignore
            fetch(chat_url, requestOptions).then((response) => {
                if (response.status == 200) {
                    response.text().then((result) => {
                        resolve(result)
                    }).catch((e) => {
                        reject(e)
                    })
                } else {
                    reject(JarvisMsg.dispatch_chat_err)
                }
            }).catch((e) => {
                reject(e)
            })
        })
    }
}

