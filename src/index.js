import React from 'react';
import ReactDOM from 'react-dom/client';
import Rotas from './rotas';
import './style/global.css';

// import * as Sentry from '@sentry/react';

// Sentry.init({
//   enableInExpoDevelopment: true,
//   dsn: "https://76cab4f207161a649d922c8690e95e7f@o4505409112309760.ingest.sentry.io/4505697799897088",
//   tracesSampleRate: 1.0,
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
    <Rotas />
  </>
);
