import { setup, signIn } from './auth';
import { getUser } from './user';
import { deleteError, getAllErrors, updateError } from './errors';
import { createService, deleteService } from './service';
import { deleteOrganization } from './organization';

export default {
    signIn,
    setup,
    getUser,
    getAllErrors,
    deleteError,
    updateError,
    createService,
    deleteService,
    deleteOrganization
};