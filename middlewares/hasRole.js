const hasRole = (...roles) => (req, res, next) => {

    const {id} = req.params;
    const {role, _id} = req.user;

    if (roles.includes("self") && id === _id.toString() ) {

    next();
    return;
    }

    if (role.includes(role)) {
    next();
    return;
    }

    throw new Error("Forbidden", { cause: 403 });
};

export default hasRole;
