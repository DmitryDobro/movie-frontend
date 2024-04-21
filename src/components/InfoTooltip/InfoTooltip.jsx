import React from 'react';
import iconError from '../../img/registr_error.svg';
import iconOk from '../../img/registr_ok.svg';

function InfoTooltip({tooltipIcon, noticeText, isOpen, onclosePopup}) {
  return (
    <div className={`infoTooltip ${isOpen && 'infoTooltip_active'}`}>
      <div className='infoTooltip__content'>
        <button onClick={onclosePopup} type='button' className='infoTooltip__close btn'></button>
        <div className='infoTooltip__icon'>
          {tooltipIcon === 'success' && <img src={iconOk} alt='Статус Ок' />}
          {tooltipIcon === 'error' && <img src={iconError} alt='Статус Error' />}
        </div>
        <h2 className='infoTooltip__notice'>{noticeText}</h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
