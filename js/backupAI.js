// ======================================
// GameForge AI
// backupAI.js
// Automatic Backup AI
// ======================================



import {

    getFiles

} from "./fileCreator.js";



import {

    updateFile

} from "./fileCreator.js";



const BACKUP_KEY =

    "gameforge-backup-history-v1";



let backups =

    loadBackups();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadBackups(){


    const data =

        localStorage.getItem(

            BACKUP_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveBackups(){


    localStorage.setItem(

        BACKUP_KEY,

        JSON.stringify(

            backups

        )

    );


}



// --------------------------------------
// バックアップ作成
// --------------------------------------

export function createBackup(

    name="Auto Backup"

){


    const files =

        getFiles();



    const backup={


        id:

        "backup_"

        +

        Date.now(),



        name,



        files:

        JSON.parse(

            JSON.stringify(

                files

            )

        ),



        created:

        Date.now()


    };



    backups.push(

        backup

    );



    saveBackups();



    return backup;


}



// --------------------------------------
// バックアップ一覧
// --------------------------------------

export function getBackups(){


    return backups;


}



// --------------------------------------
// 最新バックアップ
// --------------------------------------

export function getLatestBackup(){


    return backups[

        backups.length-1

    ];


}



// --------------------------------------
// 復元
// --------------------------------------

export function restoreBackup(

    id

){


    const backup =

        backups.find(

            item=>

            item.id===id

        );



    if(!backup){

        return {


            success:false,


            message:

            "Backup not found"


        };


    }



    backup.files.forEach(

        file=>{


            updateFile(

                file.path,

                file.content

            );


        }

    );



    return {


        success:true,


        restored:

        backup.name


    };


}



// --------------------------------------
// 古いバックアップ削除
// --------------------------------------

export function deleteBackup(

    id

){


    backups =

        backups.filter(

            item=>

            item.id!==id

        );



    saveBackups();


}



// --------------------------------------
// 自動保存
// --------------------------------------

export function autoBackup(){


    return createBackup(

        "Auto Save "

        +

        new Date()

        .toLocaleString()

    );


}



// --------------------------------------
// バックアップ容量分析
// --------------------------------------

export function analyzeBackupSize(){


    let size=0;



    backups.forEach(

        backup=>{


            size +=

            JSON.stringify(

                backup

            )

            .length;


        }

    );



    return {


        backups:

        backups.length,



        size:


        size + " bytes"


    };


}



// --------------------------------------
// 情報
// --------------------------------------

export function getBackupAIInfo(){


    return {


        name:

        "GameForge Backup AI",



        version:

        "1.0",



        backups:

        backups.length


    };


}
