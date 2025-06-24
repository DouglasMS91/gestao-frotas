import { Veiculo } from "./veiculo.model";
import { Motorista } from "./motorista.model";

export interface Abastecimento {
    id?: number; 
    veiculoId: number;
    dataAbastecimento: Date;
    tipoCombustivel: String;
    valor: number; 
    quilometragem: number;
    motoristaId: number;
}