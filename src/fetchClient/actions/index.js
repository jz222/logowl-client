import { resetPassword, setup, signIn, signUp } from './auth';
import { deleteUserAccount, deleteUserById, getUser, inviteUser } from './user';
import { deleteError, getAllErrors, getAnalytics, getErrorById, updateError } from './events';
import { createService, deleteService, updateService } from './service';
import { deleteOrganization } from './organization';

export default {
    setup,
    signUp,
    signIn,
    resetPassword,
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