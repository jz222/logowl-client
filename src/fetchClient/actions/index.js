import { setup, signIn } from './auth';
import { getUser, deleteUser, inviteUser } from './user';
import { deleteError, getErrorById, getAllErrors, updateError } from './errors';
import { createService, deleteService } from './service';
import { deleteOrganization } from './organization';

export default {
    signIn,
    setup,
    getUser,
    deleteUser,
    inviteUser,
    getErrorById,
    getAllErrors,
    deleteError,
    updateError,
    createService,
    deleteService,
    deleteOrganization
};