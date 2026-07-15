'use client';
import { useState } from 'react';
import type {
  CSSProperties, InputHTMLAttributes, ReactNode,
  SelectHTMLAttributes, TextareaHTMLAttributes,
} from 'react';

/** Translucent parchment input; amber border + soft ring on focus. */
export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}
/** Multiline variant of Field (vertical resize). */
export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}
/** Select styled as Field; pass <option> children. */
export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

const fieldStyle = (focus: boolean): CSSProperties => ({
  background: 'rgba(239,230,211,.05)',
  border: `1px solid ${focus ? 'var(--amber)' : 'var(--border-parchment)'}`,
  borderRadius: 'var(--radius-input)', padding: 'var(--input-pad)',
  color: 'var(--text)', fontSize: 15, outline: 'none', fontFamily: 'var(--font-body)',
  boxShadow: focus ? 'var(--focus-ring)' : 'none', width: '100%',
  transition: 'border-color .15s ease, box-shadow .15s ease',
});

export function Field({ type = 'text', ...rest }: FieldProps) {
  const [focus, setFocus] = useState(false);
  return <input type={type} {...rest} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{ ...fieldStyle(focus), ...rest.style }} />;
}

export function TextArea({ rows = 4, ...rest }: TextAreaProps) {
  const [focus, setFocus] = useState(false);
  return <textarea rows={rows} {...rest} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{ ...fieldStyle(focus), resize: 'vertical', ...rest.style }} />;
}

export function SelectField({ children, ...rest }: SelectFieldProps) {
  const [focus, setFocus] = useState(false);
  return <select {...rest} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{ ...fieldStyle(focus), ...rest.style }}>{children}</select>;
}
