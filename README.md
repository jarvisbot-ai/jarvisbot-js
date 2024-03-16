# JarvisBot JavaScript SDK API library


This library provides convenient access to the JarvisBot SDK API from JavaScript. It is generated
from [Jarvis](https://jarvisbot.emchub.ai/). To learn how to use the JarvisBot JavaScript SDK API.

## Access Token
> [!IMPORTANT]
> JarvisBot SDK is currently undergoing rapid development, which may lead to stability and compatibility issues. You can email support@jarvisbot.ai to request an access token. We will periodically open up trials.
>
## Install

npm install

```
npm i jarvisbot-js
```
static html

```
<script src="./static/JarvisBotSDK-x.x.x.min.js">
</script>
```

## Init client

The code below shows how to get started init SDK client.

```ts
//this is a demo conf
let conf = {
    "app_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
//get client
let jarvisBot = new JarvisBotSDK(conf)
//dispatch api resource
jarvisBot.dispatch().then((res) => {
    //success to use jarvisBot now
    console.log(res)
}).catch((e) => console.log(e.message))
```

## Default chat

Here is an example to chat.

```ts
let chat_params = jarvisBot.param.getChatParams([
    {
        content: "You are a helpful assistant.",
        role: "system"
    },
    {
        content: "how are you?",
        role: "user"
    }
]);
jarvisBot.base.chat(chat_params).then((result) => {
    console.log(result)
})
```

## Streaming chat

We provide support for streaming responses using Server Sent Events (SSE) to chat.

```ts
let chat_params_stream = jarvisBot.param.getChatParams([
    {
        content: "You are a helpful assistant.",
        role: "system"
    },
    {
        content: "how are you",
        role: "user"
    }
]);
chat_params_stream.stream = true;
jarvisBot.base.chat(chat_params_stream).then((event_source) => {
    event_source.onmessage = function (event) {
        //sse original data
        console.log('sse data:', event.data);
    };
}).catch((e) => console.error(e));
```

If you need to advance cancel the stream, you can `close` from event_source like this:

```ts
event_source.close()
```

### Txt2img

Here is an example to use txt2img.

```ts
let prompt = "dog"
let param = jarvisBot.param.getTxt2imgParams(prompt);
jarvisBot.base.txt2img(param).then((result) => {
    console.log("txt2img result", result)
}).catch((e) => console.error(e));
```

### Img2img
Here is an example to use img2img.
```ts
//this is base64 from img
let img_base64 = "xxxx"
let prompt = "hat"
let param = jarvisBot.param.getImg2imgParams(prompt, [img_base64]);
jarvisBot.base.img2img(param).then((result) => {
    console.log("img2img result", result)
})
```