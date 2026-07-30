// ======================================
// GameForge AI
// documentAI.js
// Project Document Management AI
// ======================================



const DOCUMENT_KEY =

    "gameforge-document-history-v1";



let documents =

    loadDocuments();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadDocuments(){


    const data =

        localStorage.getItem(

            DOCUMENT_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveDocuments(){


    localStorage.setItem(

        DOCUMENT_KEY,

        JSON.stringify(

            documents

        )

    );


}



// --------------------------------------
// ドキュメント作成
// --------------------------------------

export function createDocument({

    title="New Document",

    type="design",

    content=""

}){


    const document={


        id:

        "doc_"

        +

        Date.now(),



        title,



        type,



        content,



        tags:

        [],



        version:

        1,



        created:

        Date.now(),



        updated:

        Date.now()



    };



    documents.push(

        document

    );



    saveDocuments();



    return document;


}



// --------------------------------------
// ゲーム企画書生成
// --------------------------------------

export function createGameDesignDocument({

    name,

    genre="RPG"

}){


    return createDocument({


        title:

        `${name} Game Design`,



        type:

        "GDD",



        content:

`
ゲーム名:
${name}

ジャンル:
${genre}

概要:
${name}のゲーム設計資料。

システム:
・戦闘
・成長
・ステージ
・アイテム

`

    });


}



// --------------------------------------
// 仕様書生成
// --------------------------------------

export function createSpecification({

    feature,

    details

}){


    return createDocument({


        title:

        `${feature} Specification`,



        type:

        "spec",



        content:

        details



    });


}



// --------------------------------------
// ファイル管理
// --------------------------------------

export function addFileStructure({

    name,

    path,

    description

}){


    return createDocument({


        title:

        name,



        type:

        "file",



        content:

`
Path:
${path}

Description:
${description}

`

    });


}



// --------------------------------------
// タグ追加
// --------------------------------------

export function addTag(

    document,

    tag

){


    if(

        !document.tags.includes(tag)

    ){


        document.tags.push(

            tag

        );


    }



    saveDocuments();



    return document;


}



// --------------------------------------
// 更新
// --------------------------------------

export function updateDocument(

    id,

    content

){


    const doc =

        documents.find(

            d=>

            d.id===id

        );



    if(!doc)

        return null;



    doc.content=

        content;



    doc.version++;



    doc.updated=

        Date.now();



    saveDocuments();



    return doc;


}



// --------------------------------------
// 検索
// --------------------------------------

export function searchDocument(

    keyword

){


    return documents.filter(

        doc=>

        doc.title.includes(keyword)

        ||

        doc.content.includes(keyword)

    );


}



// --------------------------------------
// 種類検索
// --------------------------------------

export function getDocumentsByType(

    type

){


    return documents.filter(

        doc=>

        doc.type===type

    );


}



// --------------------------------------
// 全一覧
// --------------------------------------

export function getDocuments(){


    return documents;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestDocument(){


    return documents[

        documents.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getDocumentAIInfo(){


    return {


        name:

        "Document AI",



        version:

        "1.0",



        documents:

        documents.length


    };


}
