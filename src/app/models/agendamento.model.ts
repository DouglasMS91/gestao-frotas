import { Veiculo } from "./veiculo.model";
import { Motorista } from "./motorista.model";

export interface Agendamento {
  id: number;
  veiculo: Veiculo;
  motorista: Motorista;
  data: Date; 
  status?: String;
  //hora: String;
  //destino: String;
  //justificativa: String;
  
}

/*
export interface Agendamento {
id: number;
dataInicio: string;
dataFim: string;
motorista: {
id: number;
nome: string;
};
status: 'PENDENTE' | 'EM_USO' | 'FINALIZADO';
veiculo: {
modelo: string;
placa: string;
};
}
*/