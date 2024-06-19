import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import EventTable from './eventTable';
import * as eventServices from '../services/eventServices';

vi.mock('../services/eventServices');

describe('EvenTable component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    render(<EventTable />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays events on load', async () => {
    
    render(<EventTable />);

    expect(eventServices.getEvents).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Event 1')).toBeInTheDocument();
      expect(screen.getByText('Event 2')).toBeInTheDocument();
    });
  });

  it('displays error message when event fetch fails', async () => {
    (eventServices.getEvents as Mock).mockRejectedValueOnce(new Error('Failed to fetch events'));

    render(<EventTable />);

    await waitFor(() => {
      expect(screen.getByText(/Failes to fetch events/i)).toBeInTheDocument();
    });
  });

  it('should handle search functionality', async () => {
    
    render(<EventTable />);
    await waitFor(() => expect(eventServices.getEvents).toHaveBeenCalled());
    
      fireEvent.change(screen.getByPlaceholderText('Search for name'), { target: { value: 'Event 1' } });
      fireEvent.click(screen.getByTestId('btnSearch'));
    
    await waitFor(() => {
      expect(eventServices.getEventByName).toHaveBeenCalledWith('Event 1');
      expect(screen.getByTestId('row-Event 1')).toBeInTheDocument();
    });
  });

  it('should display no events found message', async () => {
    render(<EventTable />);

    await waitFor(() => expect(eventServices.getEvents).toHaveBeenCalled());

    fireEvent.change(screen.getByPlaceholderText('Search for name'), { target: { value: 'Event 3' } });
    fireEvent.click(screen.getByTestId('btnSearch'));

    await waitFor(() => expect(eventServices.getEventByName).toHaveBeenCalledWith('Event 3'));
    expect(screen.findAllByTestId('row-Event 3')).not;
    
  });

});
