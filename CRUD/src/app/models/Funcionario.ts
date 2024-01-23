export interface Funcionario {
    id: string;
    nome: string;
    foto: Uint8Array | null;
    rg: string;
    departamentoId: string;
}