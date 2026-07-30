// ======================================
// GameForge AI
// boot.js
// Boot Manager
// ======================================



let bootStatus = {


    started:false,


    time:null,


    loaded:0,


    failed:0,


    errors:[]


};





// ======================================
// 起動処理
// ======================================


export async function bootGameForge(loadResult){



    console.log(

        "GameForge AI Boot Start"

    );




    const successModules =

        loadResult.filter(

            module =>

            module.status === "loaded"

        );




    const errorModules =

        loadResult.filter(

            module =>

            module.status === "error"

        );






    bootStatus = {


        started:true,


        time:

        new Date()

        .toLocaleString(

            "ja-JP"

        ),



        loaded:

        successModules.length,



        failed:

        errorModules.length,



        errors:

        errorModules




    };







    console.log(

        "Loaded AI:",

        bootStatus.loaded

    );



    console.log(

        "Failed AI:",

        bootStatus.failed

    );





    if(

        bootStatus.failed === 0

    ){


        console.log(

            "GameForge AI Online"

        );


    }

    else{


        console.warn(

            "一部AIロード失敗"

        );


    }





    return bootStatus;



}





// ======================================
// 状態取得
// ======================================


export function getBootStatus(){


    return bootStatus;


}
