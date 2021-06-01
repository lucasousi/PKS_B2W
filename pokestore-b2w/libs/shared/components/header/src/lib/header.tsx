import './header.scss';

import { Grid } from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';

export interface HeaderProps {
  pageTitle: string;
}

export const Header = ({ pageTitle }: HeaderProps) => {
  return (
    <header className="header-container flex items-center">
      <div className="container mx-auto">
        <Grid container spacing={1} className="flex items-center">
          <Grid item xs={4}>
            <h2>{pageTitle}</h2>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={2} className="flex justify-end">
            <IconButton
              iconName="shopping_cart"
              iconType="two-tone"
              className="cart-icon"
              tooltipDescription="Carrinho"
              onClick={() => alert('Falta implementar')}
            />
          </Grid>
        </Grid>
      </div>
    </header>
  );
};

export default Header;
