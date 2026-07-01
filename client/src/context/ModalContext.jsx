import React, { createContext, useState, useContext } from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, X } from 'lucide-react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info', // 'success' | 'error' | 'info' | 'confirm'
    onConfirm: null,
    onCancel: null,
  });

  const showPopup = ({ title, message, type = 'info', onConfirm = null, onCancel = null }) => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
      onConfirm,
      onCancel,
    });
  };

  const closePopup = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    if (modal.onConfirm) {
      modal.onConfirm();
    }
    closePopup();
  };

  const handleCancel = () => {
    if (modal.onCancel) {
      modal.onCancel();
    }
    closePopup();
  };

  const getIcon = () => {
    switch (modal.type) {
      case 'success':
        return <CheckCircle2 className="h-14 w-14 text-emerald-500" />;
      case 'error':
        return <AlertTriangle className="h-14 w-14 text-error" />;
      case 'confirm':
        return <HelpCircle className="h-14 w-14 text-accent" />;
      default:
        return <CheckCircle2 className="h-14 w-14 text-primary" />;
    }
  };

  return (
    <ModalContext.Provider value={{ showPopup, closePopup }}>
      {children}
      
      {/* Central Modal Popup DOM */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-300">
          <div className="relative p-6 sm:p-8 rounded-[32px] border border-base-300/40 bg-base-100 max-w-sm w-full shadow-2xl glass-card text-center space-y-5">
            
            {/* Close cross for non-confirm popups */}
            {modal.type !== 'confirm' && (
              <button 
                onClick={closePopup}
                className="absolute top-5 right-5 btn btn-ghost btn-circle btn-sm text-base-content/65 hover:bg-base-200"
              >
                <X size={18} />
              </button>
            )}

            {/* Icon */}
            <div className="flex justify-center pt-2">
              <div className="p-3.5 rounded-full bg-primary/10 flex items-center justify-center">
                {getIcon()}
              </div>
            </div>

            {/* Texts */}
            <div className="space-y-1.5">
              <h3 className="text-2xl font-extrabold text-base-content font-heading tracking-tight leading-tight">
                {modal.title}
              </h3>
              <p className="text-sm text-base-content/75 leading-relaxed">
                {modal.message}
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              {modal.type === 'confirm' ? (
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleCancel}
                    className="btn btn-ghost hover:bg-base-200 h-11 rounded-xl text-sm font-semibold border border-base-300"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirm}
                    className="btn btn-primary h-11 rounded-xl btn-premium text-sm font-semibold shadow-md"
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleConfirm}
                  className="btn btn-primary w-full h-11 rounded-xl btn-premium text-sm font-semibold shadow-md"
                >
                  Okay
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
