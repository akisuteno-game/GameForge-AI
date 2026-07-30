// ======================================
// GameForge AI
// chatUI.js
// ChatGPT Style Chat Interface
// ======================================



const CHAT_KEY =

    "gameforge-chat-history-v1";



let messages =

    loadMessages();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadMessages(){


    const data =

        localStorage.getItem(

            CHAT_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveMessages(){


    localStorage.setItem(

        CHAT_KEY,

        JSON.stringify(

            messages

        )

    );


}



// --------------------------------------
// メッセージ追加
// --------------------------------------

export function addMessage({

    role="user",

    content=""

}){


    const message={


        id:

        "msg_"

        +

        Date.now(),



        role,


        content,



        time:

        Date.now()



    };



    messages.push(

        message

    );



    saveMessages();



    return message;


}



// --------------------------------------
// ユーザー送信
// --------------------------------------

export function sendUserMessage(

    text

){


    return addMessage({

        role:"user",

        content:text

    });


}



// --------------------------------------
// AI返信
// --------------------------------------

export function sendAIMessage(

    text

){


    return addMessage({

        role:"assistant",

        content:text

    });


}



// --------------------------------------
// 履歴取得
// --------------------------------------

export function getMessages(){


    return messages;


}



// --------------------------------------
// 履歴削除
// --------------------------------------

export function clearChat(){


    messages=[];


    saveMessages();


}



// --------------------------------------
// UI描画
// --------------------------------------

export function renderChat(

    elementId="chat"

){


    const area =

        document.getElementById(

            elementId

        );



    if(!area){

        return;

    }



    area.innerHTML="";



    messages.forEach(

        msg=>{


            const div =

            document.createElement(

                "div"

            );



            div.className =

            "message "

            +

            msg.role;



            div.textContent =

            msg.content;



            area.appendChild(

                div

            );


        }

    );


}



// --------------------------------------
// 入力処理
// --------------------------------------

export function setupChatInput({

    inputId="chatInput",

    buttonId="sendButton",

    callback

}){


    const input =

    document.getElementById(

        inputId

    );



    const button =

    document.getElementById(

        buttonId

    );



    if(!input || !button){

        return;

    }



    button.onclick=()=>{


        const text =

        input.value.trim();



        if(!text){

            return;

        }



        sendUserMessage(

            text

        );



        input.value="";



        renderChat();



        if(callback){


            callback(

                text

            );


        }


    };


}



// --------------------------------------
// AIコマンド解析
// --------------------------------------

export function analyzeCommand(

    text

){


    const commands={


        game:

        [

            "ゲーム",

            "作成",

            "rpg"

        ],



        enemy:

        [

            "敵",

            "モンスター"

        ],



        system:

        [

            "システム",

            "機能"

        ],



        code:

        [

            "コード",

            "実装"

        ]


    };



    for(

        const key in commands

    ){


        for(

            const word of commands[key]

        ){


            if(

                text.includes(word)

            ){


                return key;


            }


        }


    }



    return "chat";


}



// --------------------------------------
// 情報
// --------------------------------------

export function getChatUIInfo(){


    return {


        name:

        "GameForge Chat UI",


        version:

        "1.0",


        messages:

        messages.length


    };


}
