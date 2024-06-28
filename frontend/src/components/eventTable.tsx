import React, { useEffect, useState } from 'react';

import { EventModel } from '../models/eventModel';
import { EventError } from '../models/eventError';
import EventRow from '../components/eventRow';
import EventForm from '../components/eventForm';

import { getEvents, getEventByName } from '../services/eventServices';

const EventTable: React.FC = () => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
  const [isViewMode, setIsViewMode] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.log(error);
      setError(`Failes to fetch events: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const isEventModel = (event: EventModel[] | EventError): event is EventModel[] => {
    return (event as EventModel[])[0].name !== undefined;
  };

  const handleViewDetails = (event: EventModel) => {
    setSelectedEvent(event);
    setIsViewMode(true);
  };

  const handleCreateNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedEvent({ id:0,  name: '', description: '', startDate: '', endDate: '' });
    setIsViewMode(false);
  };

  const handleSaveEvent = () => {
    fetchEvents();
    setSelectedEvent(null);
  };

  const handleCloseNewEvent = () => {
    setSearchTerm('');
    setSelectedEvent(null);
    fetchEvents();
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    if (!searchTerm) {
      fetchEvents();
      return;
    }
    try {
      const event = await getEventByName(searchTerm);
      if(isEventModel(event))
        setEvents(event);
      else {
        setEvents([]);
      }
    } catch (error) {
      setSearchError('Error searching for event');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="pb-4 bg-white ">
              <label htmlFor="table-search" className="sr-only">Search</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input type="text" id="table-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search for name" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" data-testid="btnSearch"
            >Search</button>
            <button onClick={handleCreateNewEvent} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                New event
            </button>
          </form>
          
        </div>
      </div>
      {searchError && <p className="text-red-500">{searchError}</p>}

      <table className="w-full text-sm text-left ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Start date
            </th>
            <th scope="col" className="px-6 py-3">
              End date
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <EventRow key={event.id} event={event} onViewDetails={handleViewDetails} />
          ))}
        </tbody>
      </table>
      {selectedEvent && (
        <EventForm event={selectedEvent} onSave={handleSaveEvent} onClose={handleCloseNewEvent} isViewMode={isViewMode} />
      )}
    </div>
  );

};

export default EventTable;