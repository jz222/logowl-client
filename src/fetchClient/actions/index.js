import { setup, signIn } from './auth';
import { getUser, deleteUserAccount, deleteUserById, inviteUser } from './user';
import { deleteError, getErrorById, getAllErrors, updateError } from './errors';
import { createService, deleteService } from './service';
import { deleteOrganization } from './organization';

export default {
    signIn,
    setup,
    getUser,
    deleteUserAccount,
    deleteUserById,
    inviteUser,
    getErrorById,
    getAllErrors,
    deleteError,
    updateError,
    createService,
    deleteService,
    deleteOrganization
};