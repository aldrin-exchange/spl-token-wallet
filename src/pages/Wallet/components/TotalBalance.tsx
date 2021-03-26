import React, { useCallback, useState, useMemo, useEffect } from 'react';

import { useBalanceInfo, useWalletPublicKeys } from '../../../utils/wallet';
import { pairsIsLoaded } from './AssetsTable';
import { formatNumberToUSFormat, stripDigitPlaces } from '../../../utils/utils';
import { MarketsDataSingleton } from '../../../components/MarketsDataSingleton';
import { priceStore, serumMarkets } from '../../../utils/markets';
import { useConnection } from '../../../utils/connection';

const usdValues: any = {};

const Item = ({
  publicKey,
  setUsdValue,
  marketsData,
}: {
  publicKey: string;
  setUsdValue: (publicKey: any, usdValue: null | number) => void;
  marketsData: any;
}) => {
  const balanceInfo = useBalanceInfo(publicKey);

  let { amount, decimals, tokenSymbol } = balanceInfo || {
    amount: 0,
    decimals: 8,
    mint: null,
    tokenName: 'Loading...',
    tokenSymbol: '--',
  };

  const [price, setPrice] = useState<number | null | undefined>(undefined);
  const connection = useConnection();

  useEffect(() => {
    if (balanceInfo) {
      if (balanceInfo.tokenSymbol) {
        const coin = balanceInfo.tokenSymbol.toUpperCase();
        // Don't fetch USD stable coins. Mark to 1 USD.
        if (
          coin === 'USDT' ||
          coin === 'USDC' ||
          coin === 'WUSDC' ||
          coin === 'WUSDT'
        ) {
          setPrice(1);
        }
        // A Serum market exists. Fetch the price.
        else if (serumMarkets[coin]) {
          let m = serumMarkets[coin];
          priceStore
            .getPrice(connection, m.name)
            .then((price) => {
              setPrice(price || 0);
            })
            .catch((err) => {
              console.error(err);
              setPrice(null);
            });
        }
        // No Serum market exists.
        else {
          setPrice(null);
        }
      }
      // No token symbol so don't fetch market data.
      else {
        setPrice(null);
      }
    }
  }, [price, balanceInfo, connection]);

  let { closePrice } = (!!marketsData &&
    (marketsData.get(`${tokenSymbol?.toUpperCase()}_USDT`) ||
      marketsData.get(`${tokenSymbol?.toUpperCase()}_USDC`))) || {
    closePrice: 0,
    lastPriceDiff: 0,
  };

  let priceForCalculate = !price
    ? !closePrice
      ? price
      : closePrice
    : price;

  // console.log('priceForCalculate', priceForCalculate, 'price', price)

  const usdValue =
    price === undefined // Not yet loaded.
      ? undefined
      : price === null // Loaded and empty.
      ? null
      : ((amount / Math.pow(10, decimals)) * price).toFixed(2); // Loaded.

  useEffect(() => {
    if (setUsdValue && usdValue !== undefined) {
      setUsdValue(publicKey, usdValue === null ? null : parseFloat(usdValue));
    }
  }, [setUsdValue, usdValue, publicKey]);

  return null;
};

const TotalBalance = ({ isNavbar = true }) => {
  const [totalUSD, setTotalUSD] = useState(0);

  const getTotal = async () => {
    const total = await MarketsDataSingleton.getTotalBalance();
    console.log('isNavbar total', isNavbar, total)
    setTotalUSD(total)
  }

  useEffect(() => {
    console.log('MarketsDataSingleton.forceUpdateCounter', MarketsDataSingleton.forceUpdateCounter)
    getTotal()
  }, [MarketsDataSingleton.forceUpdateCounter, setTotalUSD]);

  return (
    <>
      <span>${formatNumberToUSFormat(stripDigitPlaces(totalUSD, 2))}</span>
    </>
  );
};

export default TotalBalance;
