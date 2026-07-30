// ======================================
// GameForge AI
// embedding.js
// Text Embedding Engine
// ======================================



// --------------------------------------
// 設定
// --------------------------------------

const EmbeddingConfig = {


    dimension:128,


    maxLength:1000


};



// --------------------------------------
// 文字正規化
// --------------------------------------

function normalizeText(

    text=""

){


    return text

        .toLowerCase()

        .replace(

            /\s+/g,

            " "

        )

        .trim();


}



// --------------------------------------
// ハッシュ生成
// --------------------------------------

function hashChar(

    char

){


    let hash=0;



    for(

        let i=0;

        i<char.length;

        i++

    ){


        hash +=

            char.charCodeAt(i)

            *

            (i+1);


    }



    return hash;


}



// --------------------------------------
// 簡易Embedding生成
// --------------------------------------

export function createEmbedding(

    text

){


    text =

        normalizeText(

            text

        )

        .slice(

            0,

            EmbeddingConfig.maxLength

        );



    const vector =

        new Array(

            EmbeddingConfig.dimension

        )

        .fill(0);



    for(

        let i=0;

        i<text.length;

        i++

    ){


        const index =

            hashChar(

                text[i]

            )

            %

            EmbeddingConfig.dimension;



        vector[index] +=

            1;


    }



    return normalizeVector(

        vector

    );


}



// --------------------------------------
// ベクトル正規化
// --------------------------------------

function normalizeVector(

    vector

){


    const length =

        Math.sqrt(

            vector.reduce(

                (sum,v)=>

                sum+v*v,

                0

            )

        );



    if(

        length===0

    ){

        return vector;

    }



    return vector.map(

        v=>

        v/length

    );


}



// --------------------------------------
// 類似度計算
// --------------------------------------

export function cosineSimilarity(

    a,

    b

){


    let dot=0;

    let aLength=0;

    let bLength=0;



    for(

        let i=0;

        i<a.length;

        i++

    ){


        dot +=

            a[i]

            *

            b[i];



        aLength +=

            a[i]*a[i];



        bLength +=

            b[i]*b[i];


    }



    if(

        aLength===0 ||

        bLength===0

    ){

        return 0;

    }



    return (

        dot /

        (

            Math.sqrt(aLength)

            *

            Math.sqrt(bLength)

        )

    );


}



// --------------------------------------
// ドキュメント化
// --------------------------------------

export function createDocumentVector(

    id,

    content,

    metadata={}

){


    return {


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


}



// --------------------------------------
// 情報
// --------------------------------------

export function getEmbeddingInfo(){


    return {


        name:

        "GameForge Embedding Engine",



        dimension:

        EmbeddingConfig.dimension,


        version:

        "1.0"


    };


}
