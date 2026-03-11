import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useModal } from '../useModal';

describe('useModal Hook', () => {
  it('initializes with closed state', () => {
    const { result } = renderHook(() => useModal());
    
    expect(result.current.isOpen).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('abre el modal sin datos', () => {
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.open();
    });
    
    expect(result.current.isOpen).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it('abre el modal con datos', () => {
    const { result } = renderHook(() => useModal<{ id: string; name: string }>());
    const testData = { id: '1', name: 'Test' };
    
    act(() => {
      result.current.open(testData);
    });
    
    expect(result.current.isOpen).toBe(true);
    expect(result.current.data).toEqual(testData);
  });

  it('cierra el modal y limpia los datos', () => {
    const { result } = renderHook(() => useModal<{ id: string }>());
    const testData = { id: '1' };
    
    act(() => {
      result.current.open(testData);
    });
    
    expect(result.current.isOpen).toBe(true);
    expect(result.current.data).toEqual(testData);
    
    act(() => {
      result.current.close();
    });
    
    expect(result.current.isOpen).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it('maneja múltiples ciclos de abrir/cerrar', () => {
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
    
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
    
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
  });
});
