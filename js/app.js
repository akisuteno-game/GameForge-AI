// ======================================
// GameForge AI
// app.js
// Application Controller
// ======================================


import "./loader.js";


import {

    bootGameForge,
    getBootStatus

}

from "./boot.js";




// ======================================
// DOM準備
// ======================================


window.addEventListener(

    "DOMContentLoaded",

    ()=>{


        startApp();


    }

);




// ======================================
// アプリ起動
// ======================================


function startApp(){



    const result =

        bootGameForge();



    updateUI(

        result

    );



}





// ======================================
// UI更新
// ======================================


function updateUI(

    status

){



    const aiStatus =

        document.getElementById(

            "aiStatus"

        );



    const log =

        document.getElementById(

            "log"

        );





    if(aiStatus){


        aiStatus.textContent =


            "GameForge AI 起動完了";


    }





    if(log){


        log.textContent =


            [

                "System Online",

                "AI Count: "

                +

                status.systems.length,

                "Boot Time: "

                +

                new Date(

                    status.time

                ).toLocaleString()


            ]

            .join(

                "\n"

            );


    }



}





// ======================================
// 外部取得用
// ======================================


export function getAppStatus(){


    return getBootStatus();


}
