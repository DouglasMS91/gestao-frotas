import { Veiculo } from "./veiculo.model";

export interface Manutencao {
    id?: number; 
    veiculoId: number;
    dataManutencao: Date; 
    valorManutencao: number; 
    tipoManutencao: 'preventiva' | 'corretiva';
    quilometragemAtual: number;
    descricao: string;
}