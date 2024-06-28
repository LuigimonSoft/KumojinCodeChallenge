import React, { useState } from "react";

import { EventModel } from "../models/eventModel";
import { createEvent } from "../services/eventServices";

interface EventFormProps {
  event: EventModel | null;
  onSave: (event: EventModel) => void;
  onClose: () => void;
  isViewMode: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onClose, isViewMode }) => {
  const convertToLocalDateTime = (isoString: string): string => {
    const localDate = new Date(isoString);

    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  const [formData, setFormData] = useState<EventModel>({
    id: event?.id || 0,
    name: event?.name || '',
    description: event?.description || '',
    startDate: convertToLocalDateTime(event?.startDate || '') || '',
    endDate: convertToLocalDateTime(event?.endDate || '') || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isViewMode) {
      try {
        const createdEvent = await createEvent(formData);
        onSave(createdEvent);
      } catch (error) {
        console.error('Failed to create event:', error);
      }
    }
  };

  const handleClose = async (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  

  return (
    <div id="editEventModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex" role="dialog">
      <div className="relative w-full max-w-2xl max-h-full">
        <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow " data-testid="form">

          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Event
            </h3>
            <button type="button" data-testid="btnClose"  onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="editEventModal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Name
                </label>
                <input type="text" name="name" id="name" maxLength={32}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                  placeholder="Event 1" required
                  value={formData.name} onChange={handleChange}
                  readOnly={isViewMode}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <input type="text" name="description" id="description"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="event description" required
                  value={formData.description} onChange={handleChange}
                  readOnly={isViewMode}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Start date
                </label>
                <input type="datetime-local" name="startDate" id="startDate"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                  required
                  value={formData.startDate} onChange={handleChange}
                  readOnly={isViewMode}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 ">
                  End date
                </label>
                <input type="datetime-local" name="endDate" id="endDate"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                  required
                  value={formData.endDate} onChange={handleChange}
                  readOnly={isViewMode}
                />
              </div>
            </div>
          </div>

          {!isViewMode && (
            <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
              <button type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Save</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EventForm;

