import { setup, signIn, signUp } from './auth';
import { deleteUserAccount, deleteUserById, getUser, inviteUser } from './user';
import { deleteError, getAllErrors, getErrorById, updateError, getAnalytics } from './events';
import { createService, updateService, deleteService } from './service';
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
    getAnalytics,
    createService,
    updateService,
    deleteService,
    deleteOrganization
};