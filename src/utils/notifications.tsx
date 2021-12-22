/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../components/commonStyledComponents/Buttons'
import { useConnection, useSolanaExplorerUrlSuffix } from './connection'
import { confirmTransaction } from './utils'

export function useSendTransaction(): [any, boolean] {
  const connection = useConnection()
  const [sending, setSending] = useState(false)

  async function sendTransaction(
    signaturePromise,
    {
      onSuccess = (e) => { console.log(e) },
      onError = (e) => {
        console.error(e)
      },
    } = {},
  ) {
    let id = toast('Sending transaction...', {
      type: 'info',
    }) || ''
    setSending(true)
    try {
      const signature = await signaturePromise
      id = toast('Confirming transaction...', {
        type: 'info',
      }) || ''
      await confirmTransaction(connection, signature)
      setSending(false)
      toast('Transaction confirmed', {
        type: 'success',
      })
      if (onSuccess) {
        onSuccess(signature)
      }
    } catch (e:any) {
      setSending(false)

      let { message } = e

      if (
        message.includes(
          'Error processing Instruction 0: custom program error: 0x1',
        )
      ) {
        message = 'Insufficient SOL balance for this transaction'
      }

      console.warn(message)
      toast(message, { type: 'error' })
      if (onError) {
        onError(e)
      }
    }
  }

  return [sendTransaction, sending]
}

// eslint-disable-next-line react/prop-types
const ViewTransactionOnExplorerButton = ({ signature }) => {
  const urlSuffix = useSolanaExplorerUrlSuffix()
  return (
    <a
      style={{ color: '#fff' }}
      target="_blank"
      rel="noopener noreferrer"
      href={`https://explorer.solana.com/tx/${signature}${urlSuffix}`}
    >
      View on Solana Explorer
    </a>
  )
}

export function useCallAsync() {
  return async function callAsync(promise: any, notificationObj?: any) {
    const {
      progressMessage = 'Submitting...',
      successMessage = 'Success',
      onSuccess = () => {},
      onError = (e) => {
        console.error(e)
      },
    } = notificationObj || {}

    let id = ''

    if (progressMessage) {
      id = String(toast(progressMessage, {
        type: 'info',
      })) || ''
    }

    try {
      const result = await promise
      if (successMessage) {
        toast(successMessage, { type: 'success' })
      }
      if (onSuccess) {
        onSuccess(result)
      }
    } catch (e: any) {
      console.warn(e)
      let { message } = e

      if (
        message.includes(
          'Error processing Instruction 0: custom program error: 0x1',
        )
      ) {
        message = 'Insufficient SOL balance for this transaction'
      }

      toast(message, { type: 'error' })
      if (onError) {
        onError(e)
      }
    }
  }
}
