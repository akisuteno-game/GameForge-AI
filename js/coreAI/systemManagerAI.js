// ======================================
// GameForge AI
// systemManagerAI.js
// System Management AI
// ======================================



const SYSTEM_KEY =

    "gameforge-system-manager-history-v1";



let systems =

    loadSystems();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadSystems(){


    const data =

        localStorage.getItem(

            SYSTEM_KEY

        );



    return data

        ? JSON.parse(

            data

        )

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveSystems(){


    localStorage.setItem(

        SYSTEM_KEY,

        JSON.stringify(

            systems

        )

    );


}



// --------------------------------------
// システム登録
// --------------------------------------

export function registerSystem({

    name,

    type="AI"

}){


    const system={


        id:

        "system_"

        +

        Date.now(),



        name,



        type,



        status:

        "running",



        uptime:

        100,



        errors:

        0,



        created:

        Date.now()



    };



    systems.push(

        system

    );



    saveSystems();



    return system;


}



// --------------------------------------
// 状態取得
// --------------------------------------

export function getSystemStatus(

    name

){


    return systems.find(

        system=>

        system.name===name

    );


}



// --------------------------------------
// 全システム確認
// --------------------------------------

export function checkAllSystems(){


    return systems.map(

        system=>({


            name:

            system.name,



            status:

            system.status,



            uptime:

            system.uptime



        })

    );


}



// --------------------------------------
// 異常検知
// --------------------------------------

export function detectSystemError(

    system

){


    const problems=[];



    if(

        system.errors > 0

    ){


        problems.push(

            "error_detected"

        );


    }



    if(

        system.uptime < 80

    ){


        problems.push(

            "low_uptime"

        );


    }



    return {


        safe:

        problems.length===0,



        problems



    };


}



// --------------------------------------
// 自動修復
// --------------------------------------

export function autoRepair(

    system

){


    if(!system)

        return null;



    system.errors=

        0;



    system.status=

        "running";



    system.uptime=

        Math.min(

            100,

            system.uptime + 10

        );



    saveSystems();



    return system;


}



// --------------------------------------
// システム停止
// --------------------------------------

export function stopSystem(

    name

){


    const system=

        getSystemStatus(

            name

        );



    if(!system)

        return null;



    system.status=

        "stopped";



    saveSystems();



    return system;


}



// --------------------------------------
// システム起動
// --------------------------------------

export function startSystem(

    name

){


    const system=

        getSystemStatus(

            name

        );



    if(!system)

        return null;



    system.status=

        "running";



    saveSystems();



    return system;


}



// --------------------------------------
// 稼働率計算
// --------------------------------------

export function calculateUptime(){


    if(

        systems.length===0

    )

        return 100;



    const total=

        systems.reduce(

            (

                sum,

                system

            )=>

            sum+

            system.uptime,

            0

        );



    return Math.floor(

        total /

        systems.length

    );


}



// --------------------------------------
// システム一覧
// --------------------------------------

export function getSystems(){


    return systems;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestSystem(){


    return systems[

        systems.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getSystemManagerAIInfo(){


    return {


        name:

        "System Manager AI",



        version:

        "1.0",



        systems:

        systems.length


    };


}
