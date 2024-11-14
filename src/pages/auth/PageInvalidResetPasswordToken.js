import React from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";

const PageInvalidToken = () => (
  <div className="text-center">
    <p className="h1">Invalid Link.</p>
    <p className="h2 font-weight-normal mt-3 mb-4">
      The link has expired.
    </p>
    <Link to="/auth/reset-password">
      <Button color="primary" size="lg">
        Return to Reset Password page.
      </Button>
    </Link>
  </div>
);

export default PageInvalidToken;
