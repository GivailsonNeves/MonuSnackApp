import { Categoria } from './categoria';
import { DateTime } from 'ionic-angular';

export interface Snack{
    Ativo: boolean;
    Categoria: Categoria;
    CategoriaId: number;
    Codigo: string;
    CriadoEm: DateTime;
    Descricao: string;
    Id: number;
    Imagem: string;
    Nome: string;
    Observacao: string;
    Preco: number;
    QrCode: string;
    Quantidade: number;
    QuantidadeAlterada: number;
}