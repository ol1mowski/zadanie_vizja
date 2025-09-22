const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export interface CreateReservationRequest {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  topic: string;
  description?: string;
}

export interface ReservationResponse {
  id: number;
  date: string;
  time: string;
  topic: string;
  description?: string;
  status: 'PENDING' | 'ASSIGNED' | 'CANCELLED' | 'COMPLETED';
  assignedEmployeeUsername?: string;
}

export const reservationsApi = {
  // Student endpoints
  createStudentReservation: async (data: CreateReservationRequest): Promise<ReservationResponse> => {
    const response = await fetch(`${API_BASE}/api/reservations/student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create reservation');
    return response.json();
  },

  getStudentReservations: async (): Promise<ReservationResponse[]> => {
    const response = await fetch(`${API_BASE}/api/reservations/student`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch reservations');
    return response.json();
  },

  cancelReservation: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/api/reservations/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to cancel reservation');
  }
};
