import type { DebateSession } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '';

export class ApiError extends Error {
  public code?: string;
  public status?: number;

  constructor(
    message: string,
    code?: string,
    status?: number
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

export async function createDebate(question: string, numRounds: number = 3): Promise<DebateSession> {
  const response = await fetch(`${API_BASE}/api/debate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, num_rounds: numRounds }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new ApiError(
      error.message || 'Failed to start debate',
      error.error,
      response.status
    );
  }

  return response.json();
}
