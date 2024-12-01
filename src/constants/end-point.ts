const rootRoutes = '/api/v1';
const rootAuthRoute = `${rootRoutes}/auth`;
const rootClassScheduleRoute = `${rootRoutes}/class-schedule`;
const rootBookingRoute = `${rootRoutes}/booking`;

const rootWebSiteInfoRoutes = `${rootRoutes}/website-info`;
const rootCanonicalRoutes = 'get-canonicalUrl';
const rootMailRoutes = `${rootRoutes}/mail/`;
export const websiteInfoRoutes = {
    get: rootWebSiteInfoRoutes
};

export const MAIL_ENDPOINTS = {
    SEND_CONTACT: `${rootMailRoutes}/send-contact`,
    VERIFY_EMAIL: `${rootMailRoutes}/verify-email`,
    SUBSCRIBE: `${rootMailRoutes}/subscribe`
};

export const rootCanonicalUrlRoutes = {
    get: `${rootCanonicalRoutes}`
};

//auth
export const authRoutes = {
    login: `${rootAuthRoute}/login`,
    register: `${rootAuthRoute}/register`,
    get_all_user: `${rootAuthRoute}/get-all-user`,
    delete_user: (id: string) => `${rootAuthRoute}/delete-user/${id}`,
    update_user: (id: string) => `${rootAuthRoute}/update-user/${id}`,
    getById: (id: string) => `${rootAuthRoute}/single-user/${id}`
};

//class schedule
export const classScheduleRoutes = {
    getAll: rootClassScheduleRoute,
    create: rootClassScheduleRoute,
    delete: (id: string) => `${rootClassScheduleRoute}/${id}`,
    getById: (id: string) => `${rootClassScheduleRoute}/${id}`,
    update: (id: string) => `${rootClassScheduleRoute}/${id}`
};

//booking
export const bookingRoutes = {
    create: rootBookingRoute,
    get: rootBookingRoute,
    updateById: (id: string) => `${rootBookingRoute}/${id}`,
    deleteById: (id: string) => `${rootBookingRoute}/${id}`
};
