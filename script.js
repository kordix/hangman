function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

let app = new Vue({
    el:'#app',
    data:{
        addform:{
            question:''
        },
        password:'',
        section:'game',
        wordsData:[],
        word:'error asdf',
        word2:'',
        alphabet:['a','ą','b','c','ć','d','e','ę','f','g','h','i','j','k','l','ł','m','n','ń','o','ó','p','r','s','ś','t','u','w','y','z','ż','q'],
        looses:0,
        newhaslo:'',
        usedbadly:[],
        used:[],
        listbool:false,
        edit:false,
        message:'',
        messages:[],
        addhaslo:'',
        addbool:false,
        num:0,
        id:null,
    },
    watch:{
        looses:function(){
            if (this.looses >=10){
                console.log('przegrałeś');
                this.message='PRZEGRAŁEŚ';
                this.looses=10;
            }
        }

    },
    methods:{
        reveal(guess){
            let lost = true;
            for(let i=0;i<this.word.length;i++){
                if(this.word[i].toLowerCase()==guess.toLowerCase()){
                    this.word2 = setCharAt(this.word2,i,this.word[i]);
                    lost = false;
                    this.used.push(guess);
                }
            }
            if (lost == true){
                this.usedbadly.push(guess);
                this.looses++;
            }

        },
        deleteQuestion(elem){
            axios.post('api/delete.php',{haslo:elem}).then((res)=>console.log(res));

        },
        async add(){
            await axios.post('./api/add.php',this.addform);
            this.messages.push('Dodano pytanie \''+this.addform.question+'\'')
        },
        async getData(){
            let self = this;
            let idfetchstring = '';
            // await fetch('getId.php').then((res)=>res.json()).then((res)=>self.id = res);
            if(this.id){
                idfetchstring ='?id='+this.id
            }

            await fetch('./api/getData.php'+idfetchstring).then((res)=>res.json()).then((res)=>self.wordsData=res).then((res)=>self.getWord());
            // fetch('test.php').then((res)=>res.json()).then((res)=>self.wordsData=res);
        },
        getWord(){
            // let num = this.wordsData.length;
            this.looses=0;
            this.usedbadly=[];
            this.used=[];
            this.word = this.wordsData[this.num].question;
            this.prepareWord();
        },
        next(){
        this.num++;
        if(this.num >= this.wordsData.length){
            this.num=0;
        }

        this.getWord();
        },
        prepareWord(){
            let self = this;
            this.word2='';
            setTimeout(function(){
                for(let i=0;i<self.word.length;i++){
                    if(self.word[i]==' '){
                        self.word2 +=' ';
                    }else{
                        self.word2 +='_';
                    }


                }
            },200);
        }

    },
    mounted(){
        this.id = parseInt(document.querySelector('#questionidinput').value);
        this.getData();
        let self = this;
        document.addEventListener("keydown", event => {
            if(self.section == 'game'){
                if (event.key=="Control") {return}
                if (event.key=="AltGraph") {return}
                if (event.key == "F12") { return }
                if (event.key == "Tab") { return }

                if(self.alphabet.indexOf(event.key) === -1){
                    return;
                }


                console.log(event.key);
                this.reveal(event.key);
            }

        })


    }
})
