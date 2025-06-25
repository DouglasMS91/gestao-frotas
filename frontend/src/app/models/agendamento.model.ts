import { Veiculo } from "./veiculo.model";
import { Motorista } from "./motorista.model";

export interface Agendamento {
  id: number;
  veiculo: Veiculo;
  motorista: Motorista;
  data: Date; 
  destino: String,
  status?: String;

  
}
