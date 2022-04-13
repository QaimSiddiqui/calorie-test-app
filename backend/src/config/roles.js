const commonRoles = ['manageFoodEntries', 'getFoodEntries', 'manageUser', 'getUser'];
const allRoles = {
  user: [...commonRoles],
  admin: ['getUsers', 'manageUsers', ...commonRoles],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
