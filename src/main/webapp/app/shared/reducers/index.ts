import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';
import parameters, { ParametersState } from './parameters';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly parameters: ParametersState;
  readonly applicationProfile: ApplicationProfileState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  parameters,
  applicationProfile
});

export default rootReducer;
