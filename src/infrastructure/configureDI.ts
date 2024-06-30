import { Container } from './container';
import { IEventService } from '../services/interfaces/IEventService';
import { EventService } from '../services/eventService';
import { IEventRepository } from '../repositories/interfaces/IEventRepository';
import { EventRepository } from '../repositories/eventRepository';
export function configureDI(): Container {
  const container = new Container();
  
  container.register<IEventRepository>('IEventRepository', new EventRepository());
  container.register<IEventService>('IEventService', new EventService(container.resolve<IEventRepository>('IEventRepository')));

  return container;
}