// ======================================
// GameForge AI
// boot.js
// System Boot Manager
// ======================================



import {

    getMasterAIInfo,
    registerAI

}

from "./ai/coreAI/masterAI.js";



import {

    getSystemManagerAIInfo,
    registerSystem

}

from "./ai/coreAI/systemManagerAI.js";



import {

    getDecisionAIInfo

}

from "./ai/coreAI/decisionAI.js";



import {

    getCommandAIInfo

}

from "./ai/coreAI/commandAI.js";





// ======================================
// Boot Data
// ======================================


const bootData = {


    started:false,


    time:null,


    systems:[]


};




// ======================================
// 起動チェック
// ======================================


function checkEnvironment(){


    return {


        browser:

        typeof window !== "undefined",



        storage:

        typeof localStorage !== "undefined",



        module:

        true


    };


}





// ======================================
// AI登録
// ======================================


function initializeAI(){



    const aiList=[


        getMasterAIInfo(),


        getSystemManagerAIInfo(),


        getDecisionAIInfo(),


        getCommandAIInfo()


    ];



    aiList.forEach(ai=>{


        registerAI({


            name:ai.name,


            version:ai.version


        });


    });



    return aiList;


}





// ======================================
// システム登録
// ======================================


function initializeSystems(){


    const systems=[


        "Generator System",


        "Testing System",


        "Network System",


        "Learning System"


    ];



    systems.forEach(name=>{


        registerSystem({


            name,


            type:"AI"


        });


    });



    return systems;


}





// ======================================
// 起動
// ======================================


export function bootGameForge(){



    console.log(

        "Starting GameForge AI..."

    );



    const environment =

        checkEnvironment();



    if(!environment.browser){


        throw new Error(

            "Browser environment error"

        );


    }





    const ai =

        initializeAI();



    const systems =

        initializeSystems();





    bootData.started=true;


    bootData.time=

        Date.now();



    bootData.systems=

        systems;





    console.log(

        "GameForge AI Boot Complete"

    );



    console.log(

        ai

    );



    return bootData;


}





// ======================================
// 状態取得
// ======================================


export function getBootStatus(){


    return bootData;


}
