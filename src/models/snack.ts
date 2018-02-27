import { Categoria } from './categoria';
import { DateTime } from 'ionic-angular';

export interface Snack{
    ativo: boolean;
    categoria: Categoria;
    categoriaId: number;
    codigo: string;
    criadoEm: DateTime;
    descricao: string;
    id: number;
    imagem: string;
    nome: string;
    observacao: string;
    preco: number;
    qrCode: string;
    quantidade: number;
    quantidadeAlterada: number;
}