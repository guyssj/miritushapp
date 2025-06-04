import services from './services';
import users, { usersQuery } from './users';
import calendar from './calendar';
import { calendarQuery } from './calendar'
import customers, { customerQuery } from './customer';
import transactions, { transactionsQuery } from './transactions';
import products, { productsQuery } from './products';
import serviceTypes, { serviceTypesQuery } from './serviceTypes';


export default {
    calendarQuery,
    services,
    users,
    usersQuery,
    calendar,
    customers,
    customerQuery,
    serviceTypesQuery,
    transactions,
    transactionsQuery,
    products,
    productsQuery,
    serviceTypes
};
