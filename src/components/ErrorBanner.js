import React from 'react';
import './ErrorBanner.scss';

const ErrorBanner = ({ message, onClose }) => (
  <div className="errorBanner">
    <span>{message}</span>
    <button onClick={onClose} className="closeButton">X</button>
  </div>
);

export default ErrorBanner;
