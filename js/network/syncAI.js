// ======================================
// GameForge AI
// syncAI.js
// Data Synchronization AI
// ======================================



const SYNC_KEY =

    "gameforge-sync-history-v1";



let syncHistory =

    loadSyncHistory();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadSyncHistory(){


    const data =

        localStorage.getItem(

            SYNC_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveSyncHistory(){


    localStorage.setItem(

        SYNC_KEY,

        JSON.stringify(

            syncHistory

        )

    );


}



// --------------------------------------
// 同期作成
// --------------------------------------

export function createSync({

    user="default"

}){


    const sync={


        id:

        "sync_"

        +

        Date.now(),



        user,



        devices:

        [],



        status:

        "waiting",



        created:

        Date.now()



    };



    syncHistory.push(

        sync

    );



    saveSyncHistory();



    return sync;


}



// --------------------------------------
// 端末登録
// --------------------------------------

export function registerDevice({

    sync,

    name="device"

}){


    const device={


        id:

        "device_"

        +

        Date.now(),



        name,



        lastSync:

        Date.now()



    };



    sync.devices.push(

        device

    );



    saveSyncHistory();



    return device;


}



// --------------------------------------
// 同期実行
// --------------------------------------

export function executeSync({

    localData,

    cloudData

}){


    const result =

        resolveConflict(

            localData,

            cloudData

        );



    syncHistory.push({


        type:

        "sync",



        result,



        date:

        Date.now()



    });



    saveSyncHistory();



    return result;


}



// --------------------------------------
// 競合解決
// --------------------------------------

function resolveConflict(

    local,

    cloud

){


    if(

        !local

    )

        return cloud;



    if(

        !cloud

    )

        return local;



    const localTime=

        local.updated || 0;



    const cloudTime=

        cloud.updated || 0;



    if(

        localTime >= cloudTime

    ){


        return {


            source:

            "local",



            data:

            local



        };


    }



    return {


        source:

        "cloud",



        data:

        cloud



    };


}



// --------------------------------------
// 差分検出
// --------------------------------------

export function detectDifference({

    oldData,

    newData

}){


    const oldText=

        JSON.stringify(

            oldData

        );



    const newText=

        JSON.stringify(

            newData

        );



    return {


        changed:

        oldText!==newText,



        sizeDifference:

        newText.length -

        oldText.length



    };


}



// --------------------------------------
// 同期状態
// --------------------------------------

export function getSyncStatus(

    sync

){


    return {


        status:

        sync.status,



        devices:

        sync.devices.length



    };


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getSyncHistory(){


    return syncHistory;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestSync(){


    return syncHistory[

        syncHistory.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getSyncAIInfo(){


    return {


        name:

        "Sync AI",



        version:

        "1.0",



        syncs:

        syncHistory.length


    };


}
