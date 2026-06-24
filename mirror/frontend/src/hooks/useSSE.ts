import { useEffect, useRef, useCallback } from 'react';

type SSEEventHandler = (event: MessageEvent) => void;

export function useSSE(url: string | null, onEvent: SSEEventHandler, onError?: () => void) {
  const sourceRef = useRef<EventSource | null>(null);
  const reconnectAttempt = useRef(0);
  const MAX_RECONNECT = 5;

  const connect = useCallback(() => {
    if (!url) return;

    const source = new EventSource(url);
    sourceRef.current = source;

    source.onmessage = (event) => {
      reconnectAttempt.current = 0;
      onEvent(event);
    };

    source.onerror = () => {
      source.close();
      if (reconnectAttempt.current < MAX_RECONNECT) {
        reconnectAttempt.current++;
        setTimeout(connect, 2000 * reconnectAttempt.current);
      } else {
        onError?.();
      }
    };
  }, [url, onEvent, onError]);

  useEffect(() => {
    connect();
    return () => {
      sourceRef.current?.close();
      sourceRef.current = null;
    };
  }, [connect]);
}
