import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';
import 'moment/locale/ar-sa';
import 'moment/locale/en-gb';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
  DateTimePicker,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import InfoComponent from '../info.Component/info.Component';

const datePickerPrimeReact = props => (
  <div className={`datePickerComponent ${props.class}`}>
    <div className="form-group">
      {props.Tkey && (
        <label className="control-label">
          <Translate contentKey={props.Tkey} />
          {/* {translate('foreignLicenseDetails.licenseIssueDate')} */}
        </label>
      )}
      <Calendar
        inputId={props.id}
        className="form-control"
        autoZIndex={true}
        value={props.value}
        onChange={props.changed}
        monthNavigator={props.monthNav !== undefined ? props.monthNav : true}
        yearNavigator={props.yearNav !== undefined ? props.yearNav : true}
        showIcon={props.showIcon !== undefined ? props.showIcon : true}
        dateFormat={props.format !== undefined ? props.format : 'dd/mm/yy'}
        yearRange={props.yearrange !== undefined ? props.yearrange : '2020:2030'}
        disabledDays={props.disableDays !== undefined ? props.disableDays : []} // [0,6] disable col 0 and col 6
        selectionMode={props.selectionmode !== undefined ? props.selectionmode : 'single'} // single - multiple - range
        showButtonBar={props.showBar !== undefined ? props.showBar : false}
        showTime={props.showtime !== undefined ? props.showtime : false}
        showSeconds={props.showseconds !== undefined ? props.showseconds : false}
        timeOnly={props.timeonly !== undefined ? props.timeonly : false}
        hourFormat={props.hourformat !== undefined ? props.hourformat : '12'} // 12 - 24
        numberOfMonths={props.numofmonths !== undefined ? props.numofmonths : 1}
        disabled={props.disabled !== undefined ? props.disabled : false}
        readOnlyInput={props.readonlyinput !== undefined ? props.readonlyinput : false}
        placeholder={props.placeholder !== undefined ? props.placeholder : 'DD/MM/YYYY'}
        // locale={props.locale || 'en-US'}
      />
    </div>
  </div>
);

const datePickerMatrial = props => (
  <MuiPickersUtilsProvider
    libInstance={moment}
    utils={MomentUtils}
    locale={props.currentLocale === 'ar' ? moment.locale('ar-sa') : moment.locale('en-gb')}
  >
    <div className={`datePickerComponent ${props.class}`}>
      <div className="form-group">
        {props.Tkey && (
          <label className="control-label">
            <Translate contentKey={props.Tkey} />
            {/* {translate('validationMessage.invalidDateMessage')} */}
            {props.classInfo && <InfoComponent classInfo={props.classInfo} />}
          </label>
        )}
        <KeyboardDatePicker
          autoOk
          id={props.id}
          value={props.value}
          // openTo="date"
          views={['month', 'date']}
          onChange={e => props.changed(e ? moment(e['_d']).locale('en-gb') : moment(e).locale('en-gb'))}
          minDate={props.mindate}
          variant="inline"
          format="DD/MM/YYYY"
          placeholder={translate('validationMessage.placeholder')} // "يوم/شهر/سنة"
          // label="With keyboard"
          mask="__/__/____"
          invalidDateMessage={translate('validationMessage.invalidDateMessage')}
          maxDateMessage={translate('validationMessage.maxDateMessage')}
          minDateMessage={translate('validationMessage.minDateMessage')}
        />
      </div>
    </div>
  </MuiPickersUtilsProvider>
);

const datePickerComponent = props => datePickerMatrial(props);

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale
});

export default connect(mapStateToProps)(datePickerComponent);
