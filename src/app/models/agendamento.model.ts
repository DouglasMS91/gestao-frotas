import { Veiculo } from "./veiculo.model";
import { Motorista } from "./motorista.model";

export interface Agendamento {
  id?: number;
  veiculo: Veiculo;
  motorista: Motorista;
  data: String; //mudar depois para Date
  hora: String;
  destino: String;
  Justificativa: String;
  //dataInicio: string;
  //dataFim: string;
  status?: String;
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