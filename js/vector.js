// ======================================
// GameForge AI
// vector.js
// Vector Database
// ======================================


import {
    createEmbedding,
    cosineSimilarity
} from "./embedding.js";



// --------------------------------------
// 保存キー
// --------------------------------------

const VECTOR_KEY =
    "gameforge-vector-db-v1";



// --------------------------------------
// DB
// --------------------------------------

let database =
    loadDatabase();



// --------------------------------------
// 初期DB
// --------------------------------------

function createDatabase(){


    return [];


}



// --------------------------------------
// 読み込み
// --------------------------------------

function loadDatabase(){


    const data =

        localStorage.getItem(

            VECTOR_KEY

        );



    if(!data){


        const db =
            createDatabase();



        saveDatabase(db);



        return db;


    }



    return JSON.parse(data);


}



// --------------------------------------
// 保存
// --------------------------------------

function saveDatabase(

    data=database

){


    localStorage.setItem(

        VECTOR_KEY,

        JSON.stringify(data)

    );


}



// --------------------------------------
// データ追加
// --------------------------------------

export function addVector(

    id,

    content,

    metadata={}

){


    const item={


        id,


        content,


        vector:

            createEmbedding(

                content

            ),



        metadata,


        created:

            Date.now()


    };



    database.push(

        item

    );



    saveDatabase();



    return item;


}



// --------------------------------------
// 複数追加
// --------------------------------------

export function addVectors(

    items=[]

){


    return items.map(

        item=>

        addVector(

            item.id,

            item.content,

            item.metadata

        )

    );


}



// --------------------------------------
// 検索
// --------------------------------------

export function searchVector(

    query,

    limit=5

){


    const queryVector =

        createEmbedding(

            query

        );



    return database

        .map(item=>({


            ...item,


            score:

                cosineSimilarity(

                    queryVector,

                    item.vector

                )


        }))


        .sort(

            (a,b)=>

            b.score-a.score

        )


        .slice(

            0,

            limit

        );


}



// --------------------------------------
// ID検索
// --------------------------------------

export function getVector(

    id

){


    return database.find(

        item=>

        item.id===id

    );


}



// --------------------------------------
// 削除
// --------------------------------------

export function removeVector(

    id

){


    database =

        database.filter(

            item=>

            item.id!==id

        );



    saveDatabase();



}



// --------------------------------------
// 全削除
// --------------------------------------

export function clearVectors(){


    database=[];


    saveDatabase();


}



// --------------------------------------
// 統計
// --------------------------------------

export function getVectorStats(){


    return {


        count:

            database.length,


        size:

            JSON.stringify(

                database

            )

            .length


    };


}



// --------------------------------------
// AI用検索結果
// --------------------------------------

export function createSearchContext(

    query,

    limit=5

){


    const results =

        searchVector(

            query,

            limit

        );



    return results.map(

        item=>({


            content:

                item.content,


            score:

                item.score,


            metadata:

                item.metadata


        })

    );


}



// --------------------------------------
// 情報
// --------------------------------------

export function getVectorInfo(){


    return {


        name:

        "GameForge Vector Database",


        version:

        "1.0",


        documents:

        database.length


    };


}
