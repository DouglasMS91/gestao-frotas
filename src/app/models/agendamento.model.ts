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
