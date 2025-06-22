import { Veiculo } from "./veiculo.model";
import { Motorista } from "./motorista.model";

export interface Abastecimento {
    id?: number; 
    veiculo: Veiculo;
    dataAbastecimento: String; // mudar depois para date
    tipoCombustivel: String;
    valorAbastecimento: String; //mudar para double
    quilometragem: number;
    motorista: Motorista;
}