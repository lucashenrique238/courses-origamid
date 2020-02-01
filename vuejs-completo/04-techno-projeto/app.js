const vm = new Vue({
    el:"#app",
    data:{
        produtos: [],
        produto: false,
        carrinho: [],
    },
    filters: {
        numeroPreco(valor){
            return valor.toLocaleString("pt-BR", {style: "currency", currency:"BRL" });
        }
    },
    computed:{
        carrinhoTotal(){
            let total = 0
            if(this.carrinho.length){
                this.carrinho.forEach(item => {
                    total += item.preco
                })
            }
            return total;
        }
    },
    methods:{
        fetchProdutos(){
            fetch("./api/produtos.json")
                .then(res => res.json())
                .then(data => {
                    this.produtos = data
                })
        },
        fetchProduto(id){
            fetch(`./api/produtos/${id}/dados.json`)
                .then(res => res.json())
                .then(data => {
                    this.produto = data;
                })
        },
        fecharModal({target, currentTarget}){
            if(target == currentTarget) this.produto = false;
        },
        abrirModal(id){
            this.fetchProduto(id);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        adicionarItem(){
            this.produto.estoque--;
            const {id, nome, preco} = this.produto
            this.carrinho.push({id, nome, preco})
        },
        removerItem(index){
            this.carrinho.splice(index, 1);
        },
        checarLocalStorage(){
            if(window.localStorage.carrinho){
                this.carrinho = JSON.parse(window.localStorage.carrinho);
            }
        }
    },
    watch:{
        carrinho(){
            window.localStorage.carrinho = JSON.stringify(this.carrinho);
        }
    },
    created(){
        this.fetchProdutos();
        this.checarLocalStorage();
    }
});