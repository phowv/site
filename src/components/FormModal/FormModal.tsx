import React from 'react';
import cl from './FormModal.module.css'

interface FormModalProps {
	children: React.ReactNode;
	visible: boolean;
	close: () => void;
}

const FormModal = ({ children, visible, close }: FormModalProps) => {
  const rootClasses = [cl.formModal]
  if (visible) {
    rootClasses.push(cl.active)
  }  

  return (
    <div className={rootClasses.join(' ')} onClick={() => close()}>
      <div className={cl.formModalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default FormModal;
