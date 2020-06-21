import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MapComponent from 'app/ocic-modules/map/map';

const Routes = () => (
  <div className="view-routes">
    <Switch>
      {/* Common routes */}
      <ErrorBoundaryRoute exact path="/" component={MapComponent} />
    </Switch>
  </div>
);

export default Routes;
