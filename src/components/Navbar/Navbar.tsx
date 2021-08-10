import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  GridContainer,
  RowContainer,
  Row,
  WhiteButton,
} from '../../pages/commonStyles';
import { Theme } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/styles';
import Lock from '../../images/lock.svg';
import NetworkDropdown from './NetworkDropdown';

import { useWallet } from '../../utils/wallet';
import {
  reloadWallet,
  useHasLockedMnemonicAndSeed,
} from '../../utils/wallet-seed';
import LogoComponent from '../Logo';
import { extensionUrl } from '../../utils/utils';

import TwitterIcon from './TwitterIcon';
import TelegramIcon from './TelegramIcon';
import DiscordIcon from './DiscordIcon';
import { FeedbackPopup } from '../UsersFeedBackPopup/UsersFeedbackPopup';

// const ButtonsContainer = styled(Row)`
//   @media (max-width: 1200px) {
//     display: none;
//   }
// `;

const StyledButton = styled(Button)`
  font-size: 12px;

  @media only screen and (max-width: 1100px) {
    font-size: 9px;
  }
  @media only screen and (min-width: 2367px) {
    font-size: 1rem;
  }
`;

// const StyledLink = styled.a`
//   height: 100%;
// `;

const SButton = styled(
  ({
    isActivePage,
    type,
    white,
    black,
    style,
    borderColor,
    btnWidth,
    ...rest
  }) => <StyledButton {...rest} />,
)`
  && {
    color: ${(props) => (props.isActivePage ? props.dark : props.grey)};
    background: ${(props) =>
      props.isActivePage ? props.borderColor : props.theme.palette.grey.main};
    font-family: Avenir Next Demi;
    letter-spacing: 0.05rem;
    font-size: 1.2rem;
    transition: 0.35s all;
    width: 10rem;
    margin-right: 1rem;
    height: 100%;
    padding: 0;
    border-radius: 0.6rem;
    text-transform: capitalize;

    @media only screen and (max-width: 1100px) {
      margin: 0;
    }

    &:hover {
      color: ${(props) => props.dark};
      background: ${(props) => props.borderColor};
    }

    ${(props) => props.style}
  }
`;

const NavLinkButton = ({
  component,
  children,
  pathname,
  theme,
  theme: { customPalette },
  page,
  style,
  onClick,
}: {
  component?: any;
  children: React.ReactChild;
  pathname: string;
  theme: Theme;
  page: string;
  style?: CSSProperties;
  onClick?: () => void;
}) => {
  const isActivePage = new RegExp(page, 'i').test(pathname);

  return (
    <SButton
      theme={theme}
      pathname={pathname}
      component={component}
      isActivePage={isActivePage}
      grey={customPalette.grey.light}
      dark={customPalette.white.main}
      borderColor={customPalette.grey.border}
      btnWidth={'14rem'}
      size="medium"
      color="default"
      variant="text"
      style={style}
      onClick={onClick}
    >
      {children}
    </SButton>
  );
};

const LinksContainer = styled(RowContainer)`
  padding: 1rem 4rem 1rem 4rem;
  height: 100%;
  margin: 0 0 0 4rem;
  border-right: ${(props) => props.theme.customPalette.border.main};
  border-left: ${(props) => props.theme.customPalette.border.main};
  @media (max-width: 540px) {
    display: none;
  }
`;

const WalletLoginContainer = styled(Row)`
  height: 100%;
  margin-left: 4rem;
  @media (max-width: 540px) {
    display: none;
  }
`;

const StyledLink = styled.a`
  height: 100%;
`;

const WalletLoginButtonContainer = styled(Row)`
  display: none;
  @media (max-width: 540px) {
    height: 100%;
    display: flex;
    width: ${(props) => (props.wallet ? '45%' : 'auto')};
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 12%;
  padding: 0.5rem 0;
  @media (max-width: 540px) {
    width: 100%;
  }
`;
const Socials = styled(Row)`
  margin: 1rem 0 0 0;
  & a:hover {
    svg {
      g {
        path {
          fill: #4679f4;
        }
      }
    }
  }
`;

const HeaderContainer = styled(RowContainer)`
  height: 100%;
  justify-content: end;
  @media (max-width: 540px) {
    width: 40%;
  }
`;

const TokenLink = styled.a`
  font-family: Avenir Next Demi;
  text-transform: capitalize;
  text-decoration: none;
  font-size: 1.4rem;
  background: linear-gradient(
    106.89deg,
    rgba(94, 181, 168, 0.8) 17.87%,
    rgba(56, 98, 193, 0.8) 82.13%
  );
  display: flex;
  align-items: center;
  padding: 0 2rem;
  height: 100%;
  border-radius: 0.6rem;
  color: #f8faff;
`;

const FeedbackButtonContainer = styled(Row)`
  border-left: ${(props) => props.theme.customPalette.border.new};
  margin: 0 0 0 4rem;
  justify-content: flex-end;
  padding: 0 0rem 0 4rem;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const wallet = useWallet();
  const [hasLockedMnemonicAndSeed] = useHasLockedMnemonicAndSeed();
  const [isFeedBackPopupOpen, setIsFeedBackPopupOpen] = useState(false);
  const showButtons = !hasLockedMnemonicAndSeed || !!wallet;

  return (
    <GridContainer
      wallet={!!wallet}
      theme={theme}
      style={{ paddingRight: !showButtons && '3rem' }}
    >
      <RowContainer justify={'space-between'} height={'100%'}>
        <HeaderContainer theme={theme}>
          <LogoLink to={'/'}>
            <LogoComponent width="100%" height="auto" margin="0" />
          </LogoLink>
          <FeedbackButtonContainer theme={theme}>
            <WhiteButton
              style={{
                borderRadius: '1.7rem',
                width: 'auto',
                padding: '0 2rem',
                whiteSpace: 'nowrap',
              }}
              theme={theme}
              onClick={() => setIsFeedBackPopupOpen(true)}
            >
              Leave feedback
            </WhiteButton>
          </FeedbackButtonContainer>
          <LinksContainer theme={theme}>
            <StyledLink href={`https://dex.cryptocurrencies.ai/`}>
              <NavLinkButton
                theme={theme}
                data-tut="farming"
                pathname={location.pathname}
                page={'home'}
              >
                Home
              </NavLinkButton>
            </StyledLink>

            <Link to={`/`} style={{ height: '100%' }}>
              <NavLinkButton
                theme={theme}
                pathname={location.pathname}
                page={''}
              >
                Wallet
              </NavLinkButton>
            </Link>
            <StyledLink
              href={`https://dex.cryptocurrencies.ai/chart${
                !!wallet ? '#connect_wallet' : ''
              }`}
            >
              <NavLinkButton
                theme={theme}
                pathname={location.pathname}
                page={'chart'}
              >
                Trading
              </NavLinkButton>
            </StyledLink>
            <StyledLink href={`https://dex.cryptocurrencies.ai/analytics`}>
              <NavLinkButton
                theme={theme}
                page={'analytics'}
                pathname={location.pathname}
              >
                Analytics
              </NavLinkButton>
            </StyledLink>
            <StyledLink href={`https://dex.cryptocurrencies.ai/addressbook`}>
              <NavLinkButton
                theme={theme}
                page={'addressbook'}
                pathname={location.pathname}
              >
                Addressbook
              </NavLinkButton>
            </StyledLink>
            <TokenLink
              href="https://ccai.cryptocurrencies.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Token
            </TokenLink>
          </LinksContainer>
        </HeaderContainer>
        <FeedbackPopup
          theme={theme}
          open={isFeedBackPopupOpen}
          onClose={() => setIsFeedBackPopupOpen(false)}
        />
        <WalletLoginContainer>
          {/* {!!wallet ? (
            <NetworkDropdown width={'10rem'} popupPage={false} />
          ) : ( */}
          <a
            href={extensionUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              whiteSpace: 'nowrap',
              fontSize: '1.3rem',
              color: '#fbf2f2',
              textTransform: 'none',
              fontFamily: 'Avenir Next medium',
            }}
          >
            Install Extension
          </a>
          {/* )} */}
          {/* {!!wallet ? (
            <RowContainer>
              <img
                src={WalletIcon}
                alt="wallet icon"
                style={{ margin: '0 2rem', height: '100%' }}
              />
              <Row direction="column" align="flex-start">
                <Title fontSize="1rem" fontFamily="Avenir Next">
                  <span style={{ fontFamily: 'Avenir Next Demi' }}>
                    CCAI Wallet Connected
                  </span>
                </Title>
                <Title
                  fontFamily="Avenir Next"
                  color={theme.customPalette.grey.dark}
                  fontSize="1rem"
                  style={{ paddingBottom: '1rem' }}
                >
                  {wallet?.publicKey.toBase58()}
                </Title>
              </Row>
              <RedButton
                width="10rem"
                height="2rem"
                theme={theme}
                fontSize="1.2rem"
                onClick={() => {
                  sessionStorage.removeItem('unlocked');
                  reloadWallet();
                }}
                style={{
                  position: 'absolute',
                  right: '0',
                  bottom: '.5rem',
                  fontFamily: 'Avenir Next Demi',
                }}
              >
                Lock Wallet
              </RedButton>
            </RowContainer>
          ) : !hasLockedMnemonicAndSeed ? (
            <ButtonsContainer>
              <Link style={{ textDecoration: 'none' }} to={'/restore_wallet'}>
                <VioletButton
                  theme={theme}
                  width={'14rem'}
                  height={'3.5rem'}
                  borderRadius=".6rem"
                  margin={'0 0 0 3rem'}
                  padding="1rem"
                >
                  Restore Wallet
                </VioletButton>
              </Link>
              <Link style={{ textDecoration: 'none' }} to={'/create_wallet'}>
                <VioletButton
                  theme={theme}
                  width={'14rem'}
                  height={'3.5rem'}
                  color={theme.customPalette.blue.serum}
                  borderColor={theme.customPalette.blue.serum}
                  background={'transparent'}
                  margin={'0 0 0 3rem'}
                >
                  Create Wallet
                </VioletButton>
              </Link>
            </ButtonsContainer>
          ) : ( */}
          <RowContainer>
            <Socials justify={'space-around'} height="100%" width={'auto'}>
              <StyledLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/CCAI_Official"
              >
                <TwitterIcon />
              </StyledLink>
              <StyledLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/CryptocurrenciesAi"
              >
                <TelegramIcon />
              </StyledLink>
              <StyledLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.gg/2EaKvrs"
              >
                <DiscordIcon />
              </StyledLink>
            </Socials>
          </RowContainer>
          {/* )} */}
        </WalletLoginContainer>

        <WalletLoginButtonContainer wallet={wallet}>
          <NetworkDropdown width={'10rem'} popupPage={false} />
          {!!wallet ? (
            <img
              style={{ cursor: 'pointer' }}
              onClick={() => {
                sessionStorage.removeItem('unlocked');
                reloadWallet();
              }}
              src={Lock}
              width={'20%'}
              alt={'lock wallet'}
            />
          ) : null}
        </WalletLoginButtonContainer>
      </RowContainer>
    </GridContainer>
  );
};

export default Navbar;
