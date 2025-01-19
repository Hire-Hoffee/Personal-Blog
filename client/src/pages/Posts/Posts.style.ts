import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const Container = styled(Box)`
  display: grid;
  justify-self: center;
  grid-template-columns: repeat(4, 300px);
  gap: 48px;
  margin-top: 48px;
  margin-bottom: 24px;
  align-items: flex-start;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(3, 300px);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 300px);
    gap: 32px;
  }

  @media (max-width: 970px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 660px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
`;
