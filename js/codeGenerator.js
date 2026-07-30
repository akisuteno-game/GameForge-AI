// ======================================
// GameForge AI
// codeGenerator.js
// Code Generation AI
// ======================================



const CODE_KEY =
    "gameforge-code-history-v1";



let generatedCodes =
    loadCodes();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadCodes(){


    const data =

        localStorage.getItem(

            CODE_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveCodes(){


    localStorage.setItem(

        CODE_KEY,

        JSON.stringify(

            generatedCodes

        )

    );


}



// --------------------------------------
// テンプレート
// --------------------------------------

const Templates={



html:{


basic:

`
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>{{title}}</title>

<link rel="stylesheet" href="style.css">

</head>


<body>


<div id="app">

</div>


<script type="module" src="main.js">

</script>


</body>

</html>
`



},



css:{


basic:

`
body{

margin:0;

font-family:sans-serif;

}



#app{

width:100%;

height:100vh;

}
`



},



js:{


main:

`
import {startGame}

from "./game.js";


startGame();

`



}

};



// --------------------------------------
// 変数置換
// --------------------------------------

function replaceVariables(

text,

data={}

){


Object.keys(data)

.forEach(

key=>{


text = text.replaceAll(

"{{"+key+"}}",

data[key]

);



});


return text;


}



// --------------------------------------
// コード生成
// --------------------------------------

export function generateCode({

type="js",

template="basic",

data={}

}){


let code="";



if(

Templates[type]

&&

Templates[type][template]

){


code =

Templates[type][template];


}



code =

replaceVariables(

code,

data

);



const result={


id:

"code_"

+

Date.now(),



type,


template,



code,



created:

Date.now()



};



generatedCodes.push(

result

);



saveCodes();



return result;


}



// --------------------------------------
// ゲーム機能生成
// --------------------------------------

export function generateGameFeature(

feature

){



const features={



battle:


`

export function startBattle(){

console.log("Battle Start");

}



`,



enemy:


`

export const enemy={

hp:100,

atk:20

};

`,



player:


`

export const player={

hp:500,

atk:50

};

`



};



return features[feature]

||

"";



}



// --------------------------------------
// 複数ファイル生成
// --------------------------------------

export function generateProjectCode(

features=[]

){


return features.map(

feature=>({


file:

feature+".js",


code:

generateGameFeature(

feature

)



})

);


}



// --------------------------------------
// 履歴取得
// --------------------------------------

export function getGeneratedCodes(){


return generatedCodes;


}



// --------------------------------------
// コード検索
// --------------------------------------

export function searchGeneratedCode(

keyword

){


return generatedCodes.filter(

item=>

item.code.includes(

keyword

)

);


}



// --------------------------------------
// 情報
// --------------------------------------

export function getCodeGeneratorInfo(){


return {


name:

"GameForge Code Generator AI",



version:

"1.0",



generated:

generatedCodes.length


};


}
