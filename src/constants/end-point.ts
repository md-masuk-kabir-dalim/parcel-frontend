const rootRoutes = '/api/v1';
const rootAuthRoute = `${rootRoutes}/auth`;
const rootUserRoute = `${rootRoutes}/users`;
const rootParcelRoute = `${rootRoutes}/parcel`;
const rootAdminRoute = `${rootRoutes}/admin`;

//auth
export const authRoutes = {
    login: `${rootAuthRoute}/login`,
    verifyOtp: `${rootAuthRoute}/otp/verify`,
    sendOtp: `${rootAuthRoute}/otp/send`,
    get_all_user: `${rootAuthRoute}/get-all-user`,
    delete_user: (id: string) => `${rootAuthRoute}/delete-user/${id}`,
    update_user: (id: string) => `${rootAuthRoute}/update-user/${id}`,
    getById: (id: string) => `${rootAuthRoute}/single-user/${id}`
};

export const usersRoutes = {
    create: rootUserRoute,
    getAllUsers: rootUserRoute
};

//parcel
export const parcelRoutes = {
    create: rootParcelRoute,
    getParcelList: rootParcelRoute,
    updateParcel: (id: string) => `${rootParcelRoute}/${id}`,
    deleteParcel: (id: string) => `${rootParcelRoute}/${id}`,
    getSingleParcel: (id: string) => `${rootParcelRoute}/${id}`
};

//admin
export const adminRoutes = {
    summary: `${rootAdminRoute}/summary`,
    monthlyRevenue: `${rootAdminRoute}/monthly-revenue`,
    topCustomers: `${rootAdminRoute}/top-customers`,
    topAgents: `${rootAdminRoute}/top-agents`
};
