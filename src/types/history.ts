export type HistoryObj = {
  id: string,
  data(): HistoryData
};

export type HistoryData = {
  attempt: number,
  miss: number
}