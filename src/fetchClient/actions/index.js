import { setup, signIn } from './auth';
import { getUser } from './user';
import { deleteError, getAllErrors } from './errors';
import { createService, deleteService } from './service';
import { deleteOrganization } from './organization';

export default { signIn, setup, getUser, getAllErrors, deleteError, createService, deleteService, deleteOrganization };