import { Veiculo } from "./veiculo.model";

export interface Manutencao {
    id?: number; 
    veiculo: Veiculo;
    dataManutencao: String; // mudar depois para date
    valorManutencao: String; //mudar para double
    tipoManutencao: String;
    quilometragemAtual: number;
    descricao: String;
}