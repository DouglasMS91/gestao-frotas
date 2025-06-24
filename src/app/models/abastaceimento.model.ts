import { Veiculo } from "./veiculo.model";
import { Motorista } from "./motorista.model";

export interface Abastecimento {
    id?: number; 
    veiculo: Veiculo;
    dataAbastecimento: Date; // mudar depois para date
    tipoCombustivel: String;
    valorAbastecimento: number; //mudar para double
    quilometragem: number;
    motorista: Motorista;
}