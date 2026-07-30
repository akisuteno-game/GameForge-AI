// ======================================
// GameForge AI
// masterAI.js
// Master Control AI
// ======================================



const MASTER_KEY =

    "gameforge-master-ai-history-v1";



let masterData =

    loadMaster();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadMaster(){


    const data =

        localStorage.getItem(

            MASTER_KEY

        );



    return data

        ? JSON.parse(data)

        : {


            version:"1.0",


            connectedAI:[],


            commands:[],


            created:Date.now()


        };


}



// --------------------------------------
// 保存
// --------------------------------------

function saveMaster(){


    localStorage.setItem(

        MASTER_KEY,

        JSON.stringify(

            masterData

        )

    );


}



// --------------------------------------
// AI登録
// --------------------------------------

export function registerAI({

    name,

    version="1.0",

    type="system"

}){


    const ai={


        id:

        "ai_"

        +

        Date.now(),



        name,



        version,



        type,



        status:

        "online",



        registered:

        Date.now()



    };



    masterData.connectedAI.push(

        ai

    );



    saveMaster();



    return ai;


}



// --------------------------------------
// AI検索
// --------------------------------------

export function findAI(

    name

){


    return masterData.connectedAI.find(

        ai=>

        ai.name===name

    );


}



// --------------------------------------
// 全AI状態
// --------------------------------------

export function getAIStatus(){


    return masterData.connectedAI.map(

        ai=>({


            name:

            ai.name,



            status:

            ai.status



        })

    );


}



// --------------------------------------
// コマンド実行記録
// --------------------------------------

export function executeCommand({

    command,

    target

}){


    const result={


        id:

        "command_"

        +

        Date.now(),



        command,



        target,



        status:

        "executed",



        time:

        Date.now()



    };



    masterData.commands.push(

        result

    );



    saveMaster();



    return result;


}



// --------------------------------------
// AI停止
// --------------------------------------

export function disableAI(

    name

){


    const ai=

        findAI(

            name

        );



    if(!ai)

        return null;



    ai.status=

        "offline";



    saveMaster();



    return ai;


}



// --------------------------------------
// AI再起動
// --------------------------------------

export function enableAI(

    name

){


    const ai=

        findAI(

            name

        );



    if(!ai)

        return null;



    ai.status=

        "online";



    saveMaster();



    return ai;


}



// --------------------------------------
// 統合レポート
// --------------------------------------

export function createMasterReport(){


    return {


        version:

        masterData.version,



        totalAI:

        masterData.connectedAI.length,



        online:

        masterData.connectedAI.filter(

            ai=>

            ai.status==="online"

        ).length,



        commands:

        masterData.commands.length



    };


}



// --------------------------------------
// 全データ
// --------------------------------------

export function getMasterData(){


    return masterData;


}



// --------------------------------------
// 情報
// --------------------------------------

export function getMasterAIInfo(){


    return {


        name:

        "Master AI",



        version:

        masterData.version,



        connected:

        masterData.connectedAI.length


    };


}
