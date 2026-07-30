// ======================================
// GameForge AI
// contentGeneratorAI.js
// Game Content Generation AI
// ======================================



const CONTENT_KEY =

    "gameforge-content-history-v1";



let contents =

    loadContents();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadContents(){


    const data =

        localStorage.getItem(

            CONTENT_KEY

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

function saveContents(){


    localStorage.setItem(

        CONTENT_KEY,

        JSON.stringify(

            contents

        )

    );


}



// --------------------------------------
// コンテンツ作成
// --------------------------------------

export function createContent({

    type="story",

    title="New Content",

    theme="fantasy"

}){


    const content={


        id:

        "content_"

        +

        Date.now(),



        type,



        title,



        theme,



        text:

        generateText(

            type,

            theme

        ),



        created:

        Date.now()



    };



    contents.push(

        content

    );



    saveContents();



    return content;


}



// --------------------------------------
// 文章生成
// --------------------------------------

function generateText(

    type,

    theme

){


    const templates={


        story:

        `

${theme}の世界で、

失われた力を巡る冒険が始まる。

主人公は未知の敵と戦いながら、

世界の秘密へ近づいていく。

`,



        npc:

        `

旅人:

「この先には危険な場所がある。

準備を整えて進むんだ。」

`,



        item:

        `

古代の力を宿した特別なアイテム。

装備する者に未知の力を与える。

`,



        world:

        `

広大な大地と複数の文明が存在する世界。

古代文明の遺跡には謎が眠っている。

`



    };



    return templates[type]

        ||

        templates.story;


}



// --------------------------------------
// ストーリー生成
// --------------------------------------

export function generateStory({

    title,

    theme

}){


    return createContent({


        type:

        "story",



        title,



        theme



    });


}



// --------------------------------------
// NPC生成
// --------------------------------------

export function generateNPC({

    name,

    role

}){


    return {


        name,



        role,



        dialogue:

        generateText(

            "npc",

            role

        ),



        created:

        Date.now()



    };


}



// --------------------------------------
// アイテム説明生成
// --------------------------------------

export function generateItemDescription({

    itemName

}){


    return {


        name:

        itemName,



        description:

        generateText(

            "item",

            itemName

        )



    };


}



// --------------------------------------
// 世界観生成
// --------------------------------------

export function generateWorld({

    theme

}){


    return createContent({


        type:

        "world",



        title:

        "World Setting",



        theme



    });


}



// --------------------------------------
// 文章評価
// --------------------------------------

export function evaluateContent(

    content

){


    return {


        length:

        content.text.length,



        quality:

        Math.min(

            100,

            Math.floor(

                content.text.length /

                2

            )

        )



    };


}



// --------------------------------------
// 全コンテンツ
// --------------------------------------

export function getContents(){


    return contents;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestContent(){


    return contents[

        contents.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getContentGeneratorAIInfo(){


    return {


        name:

        "Content Generator AI",



        version:

        "1.0",



        contents:

        contents.length


    };


}
