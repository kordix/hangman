function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

let app = new Vue({
    el:'#app',
    data:{
        wordsData:[],
        word:'error asdf',
        word2:'',
        alphabet:['a','b','c','ć','d','e','ę','f','g','h','i','j','k','l','ł','m','n','ń','o','ó','p','r','s','ś','t','u','w','y','z','ż'],
        looses:0,
        newhaslo:'',
        usedbadly:[],
        used:[],
        listbool:false,
        edit:false,
        message:'',
        addhaslo:'',
        addbool:false,
        num:0
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
        update(){
            let self = this;
            axios.post('update.php',{haslo:self.newhaslo}).then((res)=>console.log(res));
        },
        deleteQuestion(elem){
            axios.post('delete.php',{haslo:elem}).then((res)=>console.log(res));

        },
        add(){
            fetch(`test.php?haslo=${this.addhaslo}`).then((res)=>console.log(res))
        },
        getData(){
            let self = this;
            fetch('getData.php').then((res)=>res.json()).then((res)=>self.wordsData=res).then((res)=>self.getWord());
            // fetch('test.php').then((res)=>res.json()).then((res)=>self.wordsData=res);
        },
        getWord(){
            // let num = this.wordsData.length;
            this.looses=0;
            this.usedbadly=[];
            this.used=[];
            this.word = this.wordsData[this.num];
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
        this.getData();
        let self = this;
        document.addEventListener("keydown", event => {
            if (event.key=="Control") {return}
            if (event.key=="AltGraph") {return}

            console.log(event.key);
            this.reveal(event.key);

        })


    }
})
