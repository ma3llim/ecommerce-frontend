import React from "react";
import { Route } from "react-router-dom";

const ClientRoutes = () => {
    return <Route path="*" element={<div>Client Application</div>} />;
};

export default ClientRoutes;
