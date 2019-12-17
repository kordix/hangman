function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

let app = new Vue({
    el:'#app',
    data:{
        word:'twojastaratolewara',
        word2:'',
        alphabet:['a','b','c','ć','d','e','ę','f','g','h','i','j','k','l','ł','m','n','ń','o','ó','p','r','s','ś','t','u','w','y','z'],
        looses:0,
        newhaslo:'',
        usedbadly:[],
        used:[],
        edit:false,
        message:''
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
                console.log(this.word[i]);
                if(this.word[i].toLowerCase()==guess.toLowerCase()){
                    console.log('działa');
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
        }

    },
    mounted(){
        console.log('asdf  adsf'.replace(/ /g,''));

        let self = this;
        fetch('test.php').then((res)=>res.json()).then((res)=>self.word=res);

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
})
