import React, { useState, useEffect, createContext, useContext } from 'react';

// ============================================================================
// Label
// ============================================================================
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, className = '', ...props }) => {
  return (
    <label className={`block text-xs font-heading font-semibold tracking-wider text-bronze uppercase mb-1.5 ${className}`} {...props}>
      {children}
    </label>
  );
};

// ============================================================================
// Input
// ============================================================================
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full bg-obsidian-light/50 border border-bronze-border/20 rounded-xl px-4 py-3 text-silver text-sm font-light placeholder:text-silver-dim/40 focus:border-bronze/50 focus:outline-none focus:ring-1 focus:ring-bronze/30 transition-all ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// ============================================================================
// Button
// ============================================================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', className = '', ...props }) => {
  const baseStyle = 'inline-flex items-center justify-center rounded-xl font-heading text-xs font-semibold tracking-widest uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'bg-bronze hover:bg-bronze-light text-obsidian shadow-md hover:shadow-lg shadow-bronze/10 px-6 py-3',
    outline: 'border border-bronze text-bronze hover:bg-bronze/10 px-6 py-3',
    ghost: 'text-silver hover:bg-bronze-dim/20 px-4 py-2',
    destructive: 'bg-destructive hover:bg-destructive/80 text-white px-6 py-3',
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ============================================================================
// InputOTP
// ============================================================================
interface OTPContextType {
  value: string;
  onChange: (val: string) => void;
}
const OTPContext = createContext<OTPContextType | undefined>(undefined);

export const InputOTP: React.FC<{
  maxLength: number;
  value: string;
  onChange: (val: string) => void;
  children: React.ReactNode;
  autoFocus?: boolean;
  autoComplete?: string;
}> = ({ maxLength, value, onChange, children }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanVal = e.target.value.replace(/[^0-9]/g, '').slice(0, maxLength);
    onChange(cleanVal);
  };

  return (
    <OTPContext.Provider value={{ value, onChange }}>
      <div className="relative inline-block">
        <input
          type="text"
          maxLength={maxLength}
          value={value}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-default"
          autoFocus
        />
        <div className="flex items-center gap-2 pointer-events-none">
          {children}
        </div>
      </div>
    </OTPContext.Provider>
  );
};

export const InputOTPGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const InputOTPSlot: React.FC<{ index: number }> = ({ index }) => {
  const context = useContext(OTPContext);
  if (!context) throw new Error('InputOTPSlot must be used inside InputOTP');
  
  const char = context.value[index] || '';
  const isFocused = context.value.length === index;

  return (
    <div
      className={`w-12 h-12 rounded-xl border flex items-center justify-center font-heading text-lg font-bold transition-all ${
        isFocused
          ? 'border-bronze bg-bronze/10 ring-1 ring-bronze/30'
          : char
          ? 'border-bronze-border text-silver'
          : 'border-bronze-border/20 text-silver-dim/40'
      }`}
    >
      {char || <span className="w-1.5 h-1.5 rounded-full bg-bronze-border/20" />}
    </div>
  );
};

// ============================================================================
// Toast notification system
// ============================================================================
interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

type ToastListener = (toasts: Toast[]) => void;
let listeners: ToastListener[] = [];
let toasts: Toast[] = [];

const notifyListeners = () => {
  listeners.forEach((l) => l([...toasts]));
};

export const toast = (t: Omit<Toast, 'id'>) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast = { id, ...t };
  toasts.push(newToast);
  notifyListeners();
  
  setTimeout(() => {
    toasts = toasts.filter((item) => item.id !== id);
    notifyListeners();
  }, 4000);
};

export const useToast = () => {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>(toasts);

  useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setCurrentToasts(newToasts);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return {
    toast,
    toasts: currentToasts,
  };
};

export const Toaster: React.FC = () => {
  const { toasts: list } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {list.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-xl border shadow-lg backdrop-blur-xl animate-slide-in flex flex-col gap-1 ${
            t.variant === 'destructive'
              ? 'bg-destructive/95 border-red-500/30 text-white'
              : 'bg-obsidian-surface/95 border-bronze-border/30 text-silver'
          }`}
        >
          <span className="font-heading text-xs font-bold uppercase tracking-wider">
            {t.title}
          </span>
          {t.description && (
            <span className="text-xs opacity-80 font-light">
              {t.description}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
