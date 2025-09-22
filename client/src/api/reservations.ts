const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export interface CreateReservationRequest {
  date: string; 
  time: string; 
  topic: string;
  description?: string;
}

export interface CreateCandidateReservationRequest {
  date: string;
  time: string;
  topic: string;
  description: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidatePesel: string;
  candidateEmail: string;
  candidatePhone: string;
}

export interface AttachmentResponse {
  id: number;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  downloadUrl: string;
}

export interface ReservationResponse {
  id: number;
  date: string;
  time: string;
  topic: string;
  description?: string;
  status: 'PENDING' | 'ASSIGNED' | 'CANCELLED' | 'COMPLETED';
  assignedEmployeeUsername?: string;
  attachments: AttachmentResponse[];
  userType: 'STUDENT' | 'CANDIDATE';
}

export const reservationsApi = {
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
  },

  createCandidateReservation: async (data: CreateCandidateReservationRequest): Promise<ReservationResponse> => {
    const response = await fetch(`${API_BASE}/api/reservations/candidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create candidate reservation');
    return response.json();
  },

  getUnassignedReservations: async (): Promise<ReservationResponse[]> => {
    const response = await fetch(`${API_BASE}/api/reservations/unassigned`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch unassigned reservations');
    return response.json();
  },

  assignReservation: async (id: number): Promise<ReservationResponse> => {
    const response = await fetch(`${API_BASE}/api/reservations/${id}/assign`, {
      method: 'POST',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to assign reservation');
    return response.json();
  },

  getMyAssignedReservations: async (): Promise<ReservationResponse[]> => {
    const response = await fetch(`${API_BASE}/api/reservations/admin/assigned`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch assigned reservations');
    return response.json();
  },

  uploadAttachment: async (reservationId: number, file: File): Promise<AttachmentResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE}/api/attachments/reservation/${reservationId}`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload attachment');
    return response.json();
  },

  downloadAttachment: async (attachmentId: number): Promise<Blob> => {
    const response = await fetch(`${API_BASE}/api/attachments/${attachmentId}/download`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to download attachment');
    return response.blob();
  },

  deleteAttachment: async (attachmentId: number): Promise<void> => {
    const response = await fetch(`${API_BASE}/api/attachments/${attachmentId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete attachment');
  }
};
