import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, vi, describe, it, expect } from 'vitest';

vi.mock('../../../../../api/reservations', () => ({
  reservationsApi: {
    uploadAttachment: vi.fn(),
  },
}));

import { reservationsApi } from '../../../../../api/reservations';
import { useAttachmentUpload } from './useAttachmentUpload.hook';

describe('useAttachmentUpload', () => {
  const originalAlert = window.alert;
  beforeEach(() => {
    window.alert = vi.fn();
  });
  afterEach(() => {
    vi.clearAllMocks();
    window.alert = originalAlert;
  });

  it('wysyła plik i wywołuje onUploadSuccess', async () => {
    const onUploadSuccess = vi.fn();
    const { result } = renderHook(() => useAttachmentUpload(5, onUploadSuccess, false));

    const file = new File(['data'], 'test.txt', { type: 'text/plain' });
    (reservationsApi.uploadAttachment as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ id: 1, name: 'test.txt' });

    await act(async () => {
      await result.current.handleFileInput({ target: { files: [file], value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(reservationsApi.uploadAttachment).toHaveBeenCalledWith(5, file);
    expect(onUploadSuccess).toHaveBeenCalledWith({ id: 1, name: 'test.txt' });
  });

  it('odrzuca zbyt duży plik', async () => {
    const onUploadSuccess = vi.fn();
    const { result } = renderHook(() => useAttachmentUpload(5, onUploadSuccess, false));
    const bigFile = new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'big.bin');

    await act(async () => {
      result.current.handleDrop({ 
        preventDefault: () => {}, 
        dataTransfer: { files: [bigFile] } 
      } as unknown as React.DragEvent);
    });

    expect(window.alert).toHaveBeenCalled();
    expect(onUploadSuccess).not.toHaveBeenCalled();
  });
});


