const vm = new Vue({
    el:"#app",
    data:{
        produtos: []
    },
    filters: {
        numeroPreco(valor){
            return valor.toLocaleString("pt-BR", {style: "currency", currency:"BRL" });
        }
    },
    methods:{
        fetchProdutos(){
            fetch("./api/produtos.json")
                .then(res => res.json())
                .then(data => {
                    this.produtos = data
                })
        }
    },
    created(){
        this.fetchProdutos();
    }
});