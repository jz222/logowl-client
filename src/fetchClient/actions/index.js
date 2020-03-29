import { setup, signIn } from './auth';
import { getUser, deleteUser } from './user';
import { deleteError, getErrorById, getAllErrors, updateError } from './errors';
import { createService, deleteService } from './service';
import { deleteOrganization } from './organization';

export default {
    signIn,
    setup,
    getUser,
    deleteUser,
    getErrorById,
    getAllErrors,
    deleteError,
    updateError,
    createService,
    deleteService,
    deleteOrganization
};