/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import './button.css';

const variantClasses = {
  default: 'btn--primary',
  primary: 'btn--primary',
  destructive: 'btn--destructive',
  outline: 'btn--outline',
  secondary: 'btn--secondary',
  ghost: 'btn--ghost',
  link: 'btn--link',
};

const sizeClasses = {
  default: 'btn--default',
  sm: 'btn--sm',
  lg: 'btn--lg',
  icon: 'btn--icon',
};

export const Button = forwardRef(function Button(
  {
    className = '',
    variant = 'default',
    size = 'default',
    href,
    type = 'button',
    disabled,
    children,
    ...restProps
  },
  ref,
) {
  const classNames = [
    'btn',
    variantClasses[variant] || 'btn--primary',
    sizeClasses[size] || 'btn--default',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        ref={ref}
        data-slot="button"
        className={classNames}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        role={disabled ? 'link' : undefined}
        tabIndex={disabled ? -1 : undefined}
        {...restProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      data-slot="button"
      className={classNames}
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...restProps}
    >
      {children}
    </button>
  );
});