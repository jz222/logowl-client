import { setup, signIn, signUp } from './auth';
import { deleteUserAccount, deleteUserById, getUser, inviteUser } from './user';
import { deleteError, getAllErrors, getErrorById, updateError } from './errors';
import { createService, deleteService } from './service';
import { deleteOrganization } from './organization';

export default {
    setup,
    signUp,
    signIn,
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