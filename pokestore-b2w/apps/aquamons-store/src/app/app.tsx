import './app.scss';
import '../styles/custom-global-styles.scss';

import { ToastContainer } from 'react-toastify';

import { CartDrawer, Header } from '@shared/components';

import { Routes } from '../routes/routes';

export const App = () => {
  return (
    <>
      <ToastContainer pauseOnFocusLoss position="bottom-right" draggable={false} rtl={false} autoClose={5000} />
      <div className="app-root grid-cols-1">
        <Header pageTitle="Aquamons Store" />
        <main className="app-main">
          <CartDrawer />
          <Routes />
        </main>
      </div>
    </>
  );
};