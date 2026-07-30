// ======================================
// GameForge AI
// app.js
// Application Controller
// ======================================


import {

    loadAllAI

}

from "./loader.js";



import {

    bootGameForge

}

from "./boot.js";




// ======================================
// Log表示
// ======================================


function addLog(message){


    const log =

    document.getElementById(

        "log"

    );



    if(log){


        log.textContent +=

        "\n" + message;


    }


}




// ======================================
// UI更新
// ======================================


function updateStatus(status){



    const aiStatus =

    document.getElementById(

        "aiStatus"

    );



    if(aiStatus){



        if(

            status.failed === 0

        ){


            aiStatus.textContent =

            "全AIシステム起動完了";


        }

        else{


            aiStatus.textContent =

            "一部AIエラーあり";


        }


    }




    addLog(

        "================"

    );



    addLog(

        "GameForge AI Online"

    );



    addLog(

        "ロード成功: "

        +

        status.loaded

        +

        " files"

    );



    addLog(

        "ロード失敗: "

        +

        status.failed

        +

        " files"

    );





    if(

        status.failed > 0

    ){


        addLog(

            "---- Error ----"

        );



        status.errors.forEach(

            error => {


                addLog(

                    error.file

                    +

                    "\n"

                    +

                    error.message

                );


            }

        );


    }



}





// ======================================
// 起動
// ======================================


async function startApp(){



    try{


        addLog(

            "GameForge AI Start..."

        );




        addLog(

            "Loading AI Modules..."

        );



        const modules =

        await loadAllAI();





        addLog(

            "AI Modules Loaded"

        );





        const status =

        await bootGameForge(

            modules

        );





        updateStatus(

            status

        );





    }

    catch(error){



        console.error(error);



        const aiStatus =

        document.getElementById(

            "aiStatus"

        );



        if(aiStatus){


            aiStatus.textContent =

            "起動失敗";


        }




        addLog(

            "SYSTEM ERROR"

        );



        addLog(

            error.message

        );



    }


}





// ======================================
// Start
// ======================================


window.addEventListener(

    "DOMContentLoaded",

    ()=>{


        startApp();


    }

);
