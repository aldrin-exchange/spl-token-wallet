import styled from 'styled-components';
import { EXTENSION_WIDTH } from './config';
import Background from '../images/background.png';
import { COLORS, FONTS, FONT_SIZES } from './variables';

export const Wrapper = styled.div`
  width: 500px;
  height: 800px;
  max-width: ${EXTENSION_WIDTH}px;
  max-height: 100%;
  background-image: url(${Background});
  background-color: ${COLORS.blockBackground};
  background-size: cover;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Header = styled.h3`
  color: ${COLORS.main};
  font-family: ${FONTS.main};
  font-weight: medium;
  font-size: ${FONT_SIZES.xl};
`;
