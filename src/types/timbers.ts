export default interface ITimberList {
  id: string;
  paymentStatus: "Добавить в сделки" | "Оплатить" | "Оплачено";
  type: "Аукцион" | "Разовая продажа";
  name: string;
  location: string;
  seller: string;
  productType: "стройматериалы";
  descr: string;
  cost: string;
  amount: string;
}
export interface IInitialStateTypes {
  type: "all types" | "Разовая продажа" | "Аукцион";
}
export interface IInitialTimberState {
  loading: string;
  timbers: {
    timber: ITimberList[];
    search: string;
    favorites: number[];
    deal: number[];
    paid: number[];
  };
  selector: "warehouse" | "favorite" | "deal";
}
