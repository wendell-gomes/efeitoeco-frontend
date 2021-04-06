import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../models/Categoria';
import { Produto } from '../models/Produto';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoServiceService } from '../service/produto-service.service';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent implements OnInit {

  produto: Produto = new Produto();
  usuario: Usuario = new Usuario();
  categoria: Categoria = new Categoria();
  meuId: number = environment.id;
  categoriaLista: Categoria[];
  categoriaId: number

  constructor(
    private auth: AuthService,
    private produtoService: ProdutoServiceService,
    private categoriaService: CategoriaService
  ){ }

  ngOnInit(): void {
    this.findByIdUsuario();
    this.verTodasCategorias();
  }

  findByIdUsuario() {
    this.auth.getByIdUsuario(this.meuId).subscribe((resp: Usuario) => {
      this.usuario = resp;
    })
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.categoria.id).subscribe((resp: Categoria) => {
      this.categoria = resp;
      console.log(this.categoria.id) 
    })
  }

  cadastrarProduto(){
    this.usuario.id = this.meuId
    this.produto.criadoPor = this.usuario
    this.categoria.id = this.categoriaId
    this.produto.categoria = this.categoria
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      alert("Vossa Alteza, tu conseguiu cadastrar esse produto. Boa sorte nas vendas!!!")
      this.produto = new Produto()
    })
  }

  verTodasCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) =>{
      this.categoriaLista = resp;
    })
  }

}
