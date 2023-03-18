<?php

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    echo '<input type="hidden" id="questionidinput" value="'.$id.'">';
} else {
    echo '<input type="hidden" id="questionidinput" value="0">'; //echo 0;
}



?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Szubienica</title>
    <link rel="stylesheet" href="css/mybootstrap.css">

    <style>
        body {
            font-family: Arial;
        }

        .letter {
            padding: 4px;
            width: 15px;
            margin-right: 4px;
            border: 1px black solid;
            border-radius: 10%;
            cursor: pointer;
        }

        .letter:hover {
            background: rgb(100, 200, 100);
            border-radius: 10%;

        }

        .usedbad {
            background: rgb(200, 100, 100) !important;
            cursor: none;

        }

        .used {
            background: rgb(100, 100, 100) !important;
            cursor: none;

        }

        td {
            padding:5px;
        }
    </style>
</head>

<body>
    <div id="app" class="container mt-2">

        <div class="mb-2">
            <button class="btn btn-primary" @click="section='game'">Gra</button>
            <button class="btn btn-primary" @click="section='lista'">Lista</button>
            <button class="btn btn-primary" @click="section='add'">Dodaj</button>
        </div>


        <div v-if="section=='game'">
            <hr>

            <p>Pytanie numer {{num+1}} / {{wordsData.length}} <button @click="next">Dalej</button></p>

            <span id="pytanie" style="font-size:30px;margin-right:5px" v-for="(elem,index) in word2">
                <span>{{elem}}</span>
            </span>

            <br><br>


            <div style="display:flex">

                <div id="column1" style="width:600px;float:left">


                    <div id="alfabet" style="display:flex;flex-wrap:wrap;width:420px">
                        <div v-for="elem in alphabet" @click="reveal(elem)">
                            <p v-if="usedbadly.indexOf(elem)>=0" class="letter usedbad">{{elem}}</p>
                            <p v-else-if="used.indexOf(elem)>=0" class="letter used">{{elem}}</p>
                            <p v-else class="letter" class="used">{{elem}}</p>
                        </div>
                    </div>
                    <div id="lista" v-if="listbool">
                        <p v-for="elem in wordsData">{{elem}} <button @click="deleteQuestion(elem)">x</button></p>
                    </div>


                    <p id="message" style="font-size:20px">{{message}}</p>
                    <p style="font-size:20px" v-if="word == word2">WYGRAŁEŚ!!!</p>


                    <p style="font-size:20px">Skuchy:{{looses}}</p>

                </div>

                <div id="column2" style="float:left;width:300px">
                    <div style="width:300px;height:400px;background-repeat:no-repeat;"
                        :style="{background:'url(images/'+looses+'.png) no-repeat'}"></div>
                </div>
            </div>
        </div>

        <div v-if="section=='lista'">

     <table>
        <tr>
            <td>
                question
            </td>
            <td>id</td>
        </tr>
        <tr v-for="elem in wordsData">
            <td>{{elem.question}}</td>
            <td><a :href="'?id='+elem.id">szubienica.kordi.com.pl?id={{elem.id}} </a></td>

        </tr>
     </table>

        </div>


        <div id="dodaj" v-if="section=='add'">
            <hr>

            <input type="text" v-model="addform.question" style="width:400px;height:35px" >
            <button @click="add" class="btn btn-success">dodaj</button>


        </div>


    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.js"></script>
    <script src="script.js"></script>


</body>

</html>