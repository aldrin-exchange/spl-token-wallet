import { getMarketsData } from '../utils/ccai';
import { sleep } from '../utils/utils';

interface Map<K, V> {
  clear(): void;
  delete(key: K): boolean;
  entries(): IterableIterator<[K, V]>;
  forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V;
  has(key: K): boolean;
  keys(): IterableIterator<K>;
  set(key: K, value?: V): Map<K, V>;
  size: number;
  values(): IterableIterator<V>;
  [Symbol.iterator]():IterableIterator<[K,V]>;
  [Symbol.toStringTag]: string;
}

type Key = string
type Value = {
  amount?: number;
  closePrice?: number | undefined | null;
  dataFromBonfidaLoaded: boolean
}

export class MarketsDataSingleton {
  public static isDataLoading = false;
  public static forceUpdateCounter = 0;
  private static marketsDataMap: Map<Key, Value> = new Map();

  private static async requestData(): Promise<Map<Key, Value>> {
    this.isDataLoading = true;

    await getMarketsData().then((data) => {
      this.isDataLoading = false;
      this.marketsDataMap = data;
    });

    return this.marketsDataMap;
  }

  public static async getData(): Promise<Map<Key, Value>> {
    if (this.isDataLoading) {
      // add trials
      await sleep(1000);
      return this.getData();
    }

    if (this.marketsDataMap.size === 0) {
      return await this.requestData();
    }

    return this.marketsDataMap;
  }

  public static hasDataBySymbol(symbol: string): boolean {
    return this.marketsDataMap.has(symbol);
  }

  public static getDataBySymbol(symbol: string): Value {
    return this.marketsDataMap.get(symbol);
  }

  public static setDataBySymbol(
    symbol: string,
    price: number | null,
    amount: number,
    callback?: () => void
  ): void {
    const prevData = this.hasDataBySymbol(symbol)
      ? this.getDataBySymbol(symbol)
      : {};

    this.forceUpdateCounter++;
    console.log('forceUpdateCounter', this.forceUpdateCounter)

    this.marketsDataMap.set(symbol, {
      ...prevData,
      dataFromBonfidaLoaded: true,
      ...(!!price ? { closePrice: price } : {}),
      amount,
    });

    callback && callback()
  }

  public static async getTotalBalance(): Promise<number> {
    const data = await this.getData();

    const result = [...data.values()].reduce((acc, pairData) => {
      const amount = pairData.amount || 0;
      const price = pairData.closePrice || 0;

      return acc + amount * price
    }, 0)


    return result
  }
}
