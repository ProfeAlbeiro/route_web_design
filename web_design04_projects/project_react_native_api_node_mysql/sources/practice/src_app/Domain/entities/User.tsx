/**
 * @interface User
 * Se usa para definir la estructura de un usuario
 * @param {string} id - User id
 * @param {string} name - User name
 * @param {string} lastname - User lastname
 * @param {string} phone - User phone
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} confirmPassword - User confirm password
 * @returns {void}
 */

export interface User {
    id?: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    session_token?: string;
}