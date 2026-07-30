// ======================================
// GameForge AI
// stream.js
// AI Streaming Display
// ======================================



// --------------------------------------
// 設定
// --------------------------------------

const StreamConfig = {

    speed:20,

    cursor:"▌"

};



// --------------------------------------
// 待機
// --------------------------------------

function wait(ms){

    return new Promise(

        resolve=>setTimeout(
            resolve,
            ms
        )

    );

}



// --------------------------------------
// 文字ストリーム表示
// --------------------------------------

export async function streamText(

    element,

    text,

    options={}

){


    const speed =
        options.speed ||
        StreamConfig.speed;



    element.textContent="";



    for(

        let i=0;

        i<text.length;

        i++

    ){


        element.textContent +=
            text[i];



        await wait(speed);


    }



    return text;


}



// --------------------------------------
// AI回答表示
// --------------------------------------

export async function streamMessage(

    container,

    text

){


    const message =
        document.createElement(
            "div"
        );



    message.className =
        "message ai";



    container.appendChild(
        message
    );



    const cursor =
        document.createElement(
            "span"
        );


    cursor.className =
        "stream-cursor";


    cursor.textContent =
        StreamConfig.cursor;



    message.appendChild(
        cursor
    );



    for(

        let i=0;

        i<text.length;

        i++

    ){


        message.insertBefore(

            document.createTextNode(
                text[i]
            ),

            cursor

        );



        container.scrollTop =
            container.scrollHeight;



        await wait(
            StreamConfig.speed
        );


    }



    cursor.remove();



    return message;


}



// --------------------------------------
// 擬似ストリーミング
// --------------------------------------

export async function fakeStream(

    callback,

    text

){


    let result="";



    for(

        const char of text

    ){


        result += char;



        callback(
            result
        );



        await wait(
            StreamConfig.speed
        );


    }



    return result;


}



// --------------------------------------
// ローディング表示
// --------------------------------------

export function showThinking(

    element

){


    element.textContent =
        "GameForge AI が考えています...";



}



// --------------------------------------
// ローディング解除
// --------------------------------------

export function clearThinking(

    element

){


    element.textContent="";



}



// --------------------------------------
// 設定変更
// --------------------------------------

export function setStreamSpeed(

    speed

){


    StreamConfig.speed =
        speed;


}



// --------------------------------------
// 情報
// --------------------------------------

export function getStreamInfo(){


    return {

        speed:
            StreamConfig.speed,


        cursor:
            StreamConfig.cursor

    };


}
