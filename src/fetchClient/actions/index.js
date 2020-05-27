import { resetPassword, setNewPassword, setup, signIn, signUp } from './auth';
import { deleteUserAccount, deleteUserById, getUser, inviteUser } from './user';
import { deleteError, deleteErrors, getAllErrors, getAnalytics, getErrorById, updateError } from './events';
import { createService, deleteService, updateService } from './service';
import { deleteOrganization, updateOrganization } from './organization';

export default {
    setup,
    signUp,
    signIn,
    resetPassword,
    setNewPassword,
    getUser,
    deleteUserAccount,
    deleteUserById,
    inviteUser,
    getErrorById,
    getAllErrors,
    deleteError,
    deleteErrors,
    updateError,
    getAnalytics,
    createService,
    updateService,
    deleteService,
    deleteOrganization,
    updateOrganization
};