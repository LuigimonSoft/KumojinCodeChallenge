import React from 'react';

import { EventModel } from '../models/eventModel';

interface EventRowProps {
  event: EventModel;
  onViewDetails: (event: EventModel) => void;
}

const EventRow: React.FC<EventRowProps> = ({ event, onViewDetails }) => {

  const handleDoubleClick = () => {
    onViewDetails(event);
  };

  const handleViewDetailsClick = () => {
    onViewDetails(event);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <tr onDoubleClick={handleDoubleClick} className="odd:bg-white even:bg-gray-50 border-b">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{event.name}</th>
      <td className="px-6 py-4 whitespace-nowrap">{event.description}</td>
      <td className="px-6 py-4 whitespace-nowrap">{formatDate(event.startDate)}</td>
      <td className="px-6 py-4 whitespace-nowrap">{formatDate(event.endDate)}</td>
      <td className="px-6 py-4 ">
        <a href="#" onClick={handleViewDetailsClick} type="button" className="font-medium text-blue-600 hover:underline">
          View
        </a>
      </td>
    </tr>
  );
};

export default EventRow;