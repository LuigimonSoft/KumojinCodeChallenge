import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EventRow from '../components/eventRow';
import { EventModel } from '../models/eventModel';

describe('EventRow', () => {

  const convertToLocalDateTime = (isoString: string): string => {
    const localDate = new Date(isoString);

    const year = localDate.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[localDate.getMonth()];
    const day = localDate.getDate();

    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    const timeFormatter = new Intl.DateTimeFormat(undefined, options);
    const timeParts = timeFormatter.formatToParts(localDate);

    let formattedHours = '';
    let formattedMinutes = '';
    let ampm = '';
    for (const part of timeParts) {
        if (part.type === 'hour') {
            formattedHours = part.value;
        } else if (part.type === 'minute') {
            formattedMinutes = part.value;
        } else if (part.type === 'dayPeriod') {
            ampm = part.value;
        }
    }

    return `${month} ${day}, ${year} at ${formattedHours}:${formattedMinutes} ${ampm}`;
};

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
    expect(screen.getByText(convertToLocalDateTime('2024-07-20T09:00:00+09:00'))).toBeInTheDocument();
    expect(screen.getByText(convertToLocalDateTime('2024-07-20T17:00:00+09:00'))).toBeInTheDocument();
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