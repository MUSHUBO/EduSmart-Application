import { renderHook, act } from '@testing-library/react';
import { useOnlineStatus } from './useOnlineStatus';

describe('useOnlineStatus', () => {
  // Store original navigator.onLine descriptor
  const originalOnLine = Object.getOwnPropertyDescriptor(navigator, 'onLine');

  // Helper to set online status for tests
  const setOnlineStatus = (isOnline) => {
    Object.defineProperty(navigator, 'onLine', {
      value: isOnline,
      writable: true,
    });
    window.dispatchEvent(new Event(isOnline ? 'online' : 'offline'));
  };

  afterEach(() => {
    // Restore original navigator.onLine
    Object.defineProperty(navigator, 'onLine', originalOnLine);
  });

  it('should return true when browser is online', () => {
    setOnlineStatus(true);
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);
  });

  it('should return false when browser is offline', () => {
    setOnlineStatus(false);
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(false);
  });

  it('should update the status when the browser goes offline and online', () => {
    setOnlineStatus(true);
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);

    act(() => setOnlineStatus(false));
    expect(result.current).toBe(false);

    act(() => setOnlineStatus(true));
    expect(result.current).toBe(true);
  });
});