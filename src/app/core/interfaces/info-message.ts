import { Message } from './message';
import { User } from './user';

export interface InfoMessage extends Message {
    user: User;
}
