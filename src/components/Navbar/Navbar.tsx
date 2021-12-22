/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */

import React from 'react'
import { RowWithStrechedContent } from '../commonStyledComponents/Containers'
import { Button } from '../commonStyledComponents/Buttons'
import { NavbarContainer } from './Navbar.styles'
import { SwapLink, WalletLink, FeedbackLink } from './NavbarIcons'

export const Navbar = ({
  submit,
  disabled,
  needLinks = false,
  buttonText = 'Confirm',
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit?: any;
  disabled?: boolean;
  needLinks?: boolean;
  buttonText?: string;
}) => (
  <NavbarContainer>
    {/* {isCreatePage && (
        <Button
          disabled={disabled && currentStep === 2}
          onClick={async () => {
            if (currentStep === 3) {
              submit()
              await navigate('/wallet')
            }
            await goNext()
          }}
        >
          {currentStep === 1 ? 'Next' : currentStep === 3 ? 'Finish' : 'Confirm'}
        </Button>
      )} */}
    {/* {isRestorePage && (
        <Button
          disabled={disabled && currentStep === 2}
          onClick={async () => {
            if (currentStep === 1) {
              submit()
            }

            if (currentStep === 2) {
              await submit()
              await navigate('/wallet')
            }
            await goNext()
          }}
        >
          {currentStep === 1 ? 'Restore Wallet' : 'Import Selected Accounts'}
        </Button>
      )} */}
    {/* {isManageTokensPage && (
      <Button
        disabled={disabled && currentStep === 2}
        onClick={() => {
          if (currentStep === 1) {
            navigate('/wallet')
          }
          goNext()
          // eslint-disable-next-line no-constant-condition
          if (false) { submit() }
        }}
      >
        Confirm
      </Button>
      )} */}
    {/* {isExportSeedPhrase && currentStep === 1 && (
      <Button
        disabled={disabled}
        onClick={() => {
          goNext()
          // eslint-disable-next-line no-constant-condition
          if (false) { submit() }
        }}
      >
        Confirm
      </Button>
      )} */}

    {needLinks ? (
      <RowWithStrechedContent margin="0 3rem">
        <WalletLink />
        <SwapLink />
        <FeedbackLink />
      </RowWithStrechedContent>
    ) : (
      <Button
        disabled={disabled}
        onClick={() => {
          submit()
        }}
      >
        {buttonText}
      </Button>
    )}
  </NavbarContainer>
)
