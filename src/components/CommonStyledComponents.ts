import styled from 'styled-components';
import { EXTENSION_WIDTH } from './config';
import Background from '../images/background.png';
import { BORDER_RADIUS, COLORS, FONTS, FONT_SIZES } from './variables';

export const Wrapper = styled.div`
  width: 369px;
  height: 600px;
  max-width: ${EXTENSION_WIDTH}px;
  max-height: 100%;
  background-image: url(${Background});
  background-color: ${COLORS.bodyBackground};
  background-size: cover;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const XlHeader = styled.p`
  color: ${COLORS.main};
  font-family: ${FONTS.main};
  font-weight: bold;
  font-size: ${FONT_SIZES.xl};
  text-align: center;
`;

export const LgTitle = styled.p`
  color: ${COLORS.main};
  font-family: ${FONTS.main};
  font-weight: bold;
  font-size: ${FONT_SIZES.lg};
  text-align: center;
  margin: ${(props) => props.margin || '0'};
`;

export const MdDescription = styled.p`
  color: ${COLORS.main};
  font-family: ${FONTS.main};
  font-weight: bold;
  font-size: ${FONT_SIZES.md};
  text-align: center;
`;

export const ContainerWithCenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const RowWithStrechedContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: ${(props) => props.margin || '0'};
`;

export const RowWithCenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const VioletBox = styled.div`
  width: calc(50% - 0.75rem);
  height: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem 1rem;
  background-color: ${COLORS.primary};
  border-radius: ${BORDER_RADIUS.lg};
  margin: ${(props) => props.margin || '0'};
`;
