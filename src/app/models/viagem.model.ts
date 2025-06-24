export interface Viagem{
    id?: number;
    veiculoId: number,
    motoristaId: number,
    agendamentoId: number,
    data: Date,
    hora: string,
    destino: string,
    justificativa: string
}