function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

let app = new Vue({
    el:'#app',
    data:{
        word:'twojastaratolewara',
        word2:'',
        alphabet:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','w','y','z'],
        looses:0,
        newhaslo:'',
        edit:false
    },
    methods:{
        reveal(guess){
            let lost = true;
            for(let i=0;i<this.word.length;i++){
                console.log(this.word[i]);
                if(this.word[i]==guess){
                    console.log('działa');
                    this.word2 = setCharAt(this.word2,i,guess);
                    lost = false;
                }
            }
            if (lost == true){
                this.looses++;
            }

        },
        update(){
            let self = this;
            axios.post('update.php',{haslo:self.newhaslo}).then((res)=>console.log(res));
        }

    },
    mounted(){
        let self = this;
        fetch('test.php').then((res)=>res.json()).then((res)=>self.word=res);

        setTimeout(function(){
            for(let i=0;i<self.word.length;i++){
                self.word2 +='_';
            }
        },200);

    }
})
