import { setup, signIn } from './auth';
import { getUser, deleteUser } from './user';
import { deleteError, getAllErrors, updateError } from './errors';
import { createService, deleteService } from './service';
import { deleteOrganization } from './organization';

export default {
    signIn,
    setup,
    getUser,
    deleteUser,
    getAllErrors,
    deleteError,
    updateError,
    createService,
    deleteService,
    deleteOrganization
};