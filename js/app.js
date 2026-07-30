// ======================================
// GameForge AI
// app.js
// ======================================


import {
    loadAllAI
}
from "./loader.js";


import {
    bootGameForge
}
from "./boot.js";



function log(text){

    const area =
    document.getElementById("log");

    if(area){

        area.textContent +=
        "\n" + text;

    }

}



async function start(){


    try{


        log("AIロード開始");


        await loadAllAI();


        log("AIロード完了");


        const result =
        bootGameForge();



        document
        .getElementById("aiStatus")
        .textContent =
        "全AIシステム起動完了";



        log(
            "GameForge AI Online"
        );



        log(
            JSON.stringify(
                result,
                null,
                2
            )
        );



    }
    catch(error){


        document
        .getElementById("aiStatus")
        .textContent =
        "起動エラー";


        log(
            error.message
        );


        console.error(error);


    }


}



start();
