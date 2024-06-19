import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import EventForm from '../components/eventForm';
import { EventModel } from '../models/eventModel';
import { createEvent } from '../services/eventServices';

vi.mock('../services/eventServices');

const mockCreateEvent = createEvent as Mock;

describe('EventForm', () => {
  const mockEvent: EventModel = {
    id: 1,
    name: 'Event 1',
    description: 'Description 1',
    startDate: '2024-07-20T09:00:00+09:00',
    endDate: '2024-07-20T17:00:00+09:00',
  };

  const mockEventUTC: EventModel = {
    id: 1,
    name: 'Event 1',
    description: 'Description 1',
    startDate: '2024-07-19T20:00',
    endDate: '2024-07-20T04:00',
  };

  const mockOnSave = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form fields correctly', () => {
    render(<EventForm event={mockEvent} onSave={mockOnSave} onClose={mockOnClose} isViewMode={false} />);

    expect(screen.getByLabelText('Name')).toHaveValue(mockEvent.name);
    expect(screen.getByLabelText('Description')).toHaveValue(mockEvent.description);
    expect(screen.getByLabelText('Start date')).toHaveValue('2024-07-19T20:00');
    expect(screen.getByLabelText('End date')).toHaveValue('2024-07-20T04:00');
  });

  it('should handle input changes', () => {
    render(<EventForm event={mockEvent} onSave={mockOnSave} onClose={mockOnClose} isViewMode={false} />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Event' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Updated Description' } });

    expect(screen.getByLabelText('Name')).toHaveValue('Updated Event');
    expect(screen.getByLabelText('Description')).toHaveValue('Updated Description');
  });

  it('should call onSave when form is submitted', async () => {
    mockCreateEvent.mockResolvedValue(mockEvent);

    render(<EventForm event={mockEvent} onSave={mockOnSave} onClose={mockOnClose} isViewMode={false} />);

    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => expect(mockCreateEvent).toHaveBeenCalledWith(mockEventUTC));
    await waitFor(() => expect(mockOnSave).toHaveBeenCalledWith(mockEvent));
  });

  it('should call onClose when close button is clicked', () => {
    render(<EventForm event={mockEvent} onSave={mockOnSave} onClose={mockOnClose} isViewMode={false} />);

    fireEvent.click(screen.getByTestId('btnClose'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not allow input changes in view mode', () => {
    render(<EventForm event={mockEvent} onSave={mockOnSave} onClose={mockOnClose} isViewMode={true} />);

    expect(screen.getByLabelText('Name')).toHaveAttribute('readonly');
    expect(screen.getByLabelText('Description')).toHaveAttribute('readonly');
    expect(screen.getByLabelText('Start date')).toHaveAttribute('readonly');
    expect(screen.getByLabelText('End date')).toHaveAttribute('readonly');
  });
});