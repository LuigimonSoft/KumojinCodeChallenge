import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import EventRow from '../components/eventRow';
import { EventModel } from '../models/eventModel';

describe('EventRow', () => {
  const mockEvent: EventModel = {
    id: 1,
    name: 'Event 1',
    description: 'Description 1',
    startDate: '2024-07-20T09:00:00+09:00',
    endDate: '2024-07-20T17:00:00+09:00',
  };

  const mockOnViewDetails = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render event details correctly', () => {
    render(<EventRow event={mockEvent} onViewDetails={mockOnViewDetails} />);

    expect(screen.getByTestId('row-Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('July 19, 2024 at 8:00 p.m.')).toBeInTheDocument();
    expect(screen.getByText('July 20, 2024 at 4:00 a.m.')).toBeInTheDocument();
  });

  it('should call onViewDetails when the row is double-clicked', () => {
    render(<EventRow event={mockEvent} onViewDetails={mockOnViewDetails} />);

    const row = screen.getByTestId('row-Event 1');
    fireEvent.doubleClick(row);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockEvent);
  });

  it('should call onViewDetails when the view link is clicked', () => {
    render(<EventRow event={mockEvent} onViewDetails={mockOnViewDetails} />);

    const viewLink = screen.getByText('View');
    fireEvent.click(viewLink);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockEvent);
  });
});