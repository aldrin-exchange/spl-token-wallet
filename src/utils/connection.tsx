import React, { useContext, useEffect, useMemo } from 'react';
import {
  AccountInfo,
  clusterApiUrl,
  Connection,
  PublicKey,
} from '@solana/web3.js';
import tuple from 'immutable-tuple';
import { struct } from 'superstruct';
import assert from 'assert';
import { useLocalStorageState, useRefEqual } from './utils';
import { refreshCache, setCache, useAsyncData } from './fetch-loop';
import MultiEndpointsConnection from './MultiEndpointsConnection';

const ConnectionContext = React.createContext<{
  endpoint: string;
  setEndpoint: (string) => void;
  connection: Connection;
} | null>(null);

export const MAINNET_URL = 'https://api.mainnet-beta.solana.com';
const MAINNET_BETA_ENDPOINT = clusterApiUrl('mainnet-beta');
export const ENDPOINTS = [
  {
    name: 'mainnet-beta',
    endpoint: MAINNET_BETA_ENDPOINT,
  },
  { name: 'testnet', endpoint: clusterApiUrl('testnet') },
  { name: 'devnet', endpoint: 'https://api.devnet.solana.com' },
  { name: 'localnet', endpoint: 'http://127.0.0.1:8899' },
];

export function ConnectionProvider({ children }) {
  const [endpoint, setEndpoint] = useLocalStorageState(
    'connectionEndpoint',
    ENDPOINTS[0].endpoint,
  );

  const connection = useMemo(
    () =>
      endpoint === MAINNET_BETA_ENDPOINT
        ? // multi connection only for mainnet
          new MultiEndpointsConnection(
            [
              // { url: 'https://mango.rpcpool.com/', RPS: 10 },
              { url: 'https://solana-api.projectserum.com', RPS: 2 },
              { url: 'https://api.mainnet-beta.solana.com', RPS: 4 },
              // { url: 'https://raydium.rpcpool.com/', RPS: 10 },
              // { url: 'https://orca.rpcpool.com/', RPS: 10 },
              // { url: 'https://api.rpcpool.com', RPS: 10 },
            ],
            'recent',
          )
        : new Connection(
            ENDPOINTS.find((endpointInfo) => endpointInfo.endpoint === endpoint)
              ?.endpoint || MAINNET_BETA_ENDPOINT,
            'recent',
          ),
    [endpoint],
  );

  return (
    // @ts-ignore
    <ConnectionContext.Provider value={{ endpoint, setEndpoint, connection }}>
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection(): Connection {
  let context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  return context.connection;
}

export function useConnectionConfig() {
  let context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  return { endpoint: context.endpoint, setEndpoint: context.setEndpoint };
}

export function useIsProdNetwork() {
  let context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  return context.endpoint === MAINNET_URL;
}

export function useSolanaExplorerUrlSuffix() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  const endpoint = context.endpoint;
  if (endpoint === 'https://api.devnet.solana.com') {
    return '?cluster=devnet';
  } else if (endpoint === clusterApiUrl('testnet')) {
    return '?cluster=testnet';
  }
  return '';
}

export function useAccountInfo(publicKey?: PublicKey) {
  const connection = useConnection();
  const { endpoint } = useConnectionConfig()
  const cacheKey = tuple(connection, publicKey?.toBase58());
  const [accountInfo, loaded] = useAsyncData(
    async () => (publicKey ? connection.getAccountInfo(publicKey) : null),
    cacheKey,
  );

  useEffect(() => {
    if (!publicKey) {
      return;
    }

    // multi-connection only in mainnet beta, we should use same connection for removeAccountChange
    // @ts-ignore
    const rawConnection = endpoint === MAINNET_BETA_ENDPOINT ? connection.getConnection() : connection
    let previousInfo: AccountInfo<Buffer> | null = null;

    const id = rawConnection.onAccountChange(publicKey, (info) => {
      if (
        !previousInfo ||
        !previousInfo.data.equals(info.data) ||
        previousInfo.lamports !== info.lamports
      ) {
        previousInfo = info;
        setCache(cacheKey, info);
      }
    });

    return () => {
      rawConnection.removeAccountChangeListener(id).catch((e) => {
        console.log('remove account change error', cacheKey, connection);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, publicKey?.toBase58() ?? '', cacheKey, endpoint]);

  return [
    useRefEqual(
      accountInfo,
      (oldInfo, newInfo) =>
        !!oldInfo &&
        !!newInfo &&
        oldInfo.data.equals(newInfo.data) &&
        oldInfo.lamports === newInfo.lamports,
    ),
    loaded,
  ];
}

export function refreshAccountInfo(connection, publicKey, clearCache = false) {
  const cacheKey = tuple(connection, publicKey.toBase58());
  refreshCache(cacheKey, clearCache);
}

export function setInitialAccountInfo(connection, publicKey, accountInfo) {
  const cacheKey = tuple(connection, publicKey.toBase58());
  setCache(cacheKey, accountInfo, { initializeOnly: true });
}

export async function getMultipleSolanaAccounts(
  connection: Connection,
  publicKeys: PublicKey[],
): Promise<
  Array<null | { publicKey: PublicKey; account: AccountInfo<Buffer> }>
> {
  const args = [publicKeys.map((k) => k.toBase58()), { commitment: 'recent' }];
  // @ts-ignore
  const unsafeRes = await connection._rpcRequest('getMultipleAccounts', args);
  const res = GetMultipleAccountsAndContextRpcResult(unsafeRes);
  if (res.error) {
    throw new Error(
      'failed to get info about accounts ' +
        publicKeys.map((k) => k.toBase58()).join(', ') +
        ': ' +
        res.error.message,
    );
  }
  assert(typeof res.result !== 'undefined');
  const accounts: Array<null | {
    executable: any;
    owner: PublicKey;
    lamports: any;
    data: Buffer;
  }> = [];
  for (const account of res.result.value) {
    let value: {
      executable: any;
      owner: PublicKey;
      lamports: any;
      data: Buffer;
    } | null = null;
    if (res.result.value && account) {
      const { executable, owner, lamports, data } = account;
      assert(data[1] === 'base64');
      value = {
        executable,
        owner: new PublicKey(owner),
        lamports,
        data: Buffer.from(data[0], 'base64'),
      };
    }
    accounts.push(value);
  }
  return accounts.map((account, idx) => {
    return account === null
      ? null
      : {
          publicKey: publicKeys[idx],
          account,
        };
  });
}

function jsonRpcResult(resultDescription: any) {
  const jsonRpcVersion = struct.literal('2.0');
  return struct.union([
    struct({
      jsonrpc: jsonRpcVersion,
      id: 'string',
      error: 'any',
    }),
    struct({
      jsonrpc: jsonRpcVersion,
      id: 'string',
      error: 'null?',
      result: resultDescription,
    }),
  ]);
}

function jsonRpcResultAndContext(resultDescription: any) {
  return jsonRpcResult({
    context: struct({
      slot: 'number',
    }),
    value: resultDescription,
  });
}

const AccountInfoResult = struct({
  executable: 'boolean',
  owner: 'string',
  lamports: 'number',
  data: 'any',
  rentEpoch: 'number?',
});

export const GetMultipleAccountsAndContextRpcResult = jsonRpcResultAndContext(
  struct.array([struct.union(['null', AccountInfoResult])]),
);
