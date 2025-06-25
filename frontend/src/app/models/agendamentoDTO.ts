export interface AgendamentoCreateDTO {
  data: Date;
  status?: string;
  destino: string;
  motoristaId: number;
  veiculoId: number;
}
