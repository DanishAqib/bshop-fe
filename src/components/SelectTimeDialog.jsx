import { useNavigate } from "react-router-dom"

export const SelectTimeDialog = ({
  appointmentTime,
  setAppointmentTime,
  setSelectTimeDialog,
  selectTimeDialog,
  u_info,
  selectedBarber,
  setSelectedBarber
}) => {
  const navigate = useNavigate()
  const availableTimeSlots = [
    '9:00 AM',
    '11:00 AM',
    '1:00 PM',
    '3:00 PM',
    '5:00 PM',
    '7:00 PM',
  ];
  return (
    <div className="make-appointment-page__select-time-dialog">
      <h3 className="make-appointment-page__select-time-dialog__title">Select Time</h3>
      <div className="make-appointment-page__select-time-dialog__time-list">
      {
        availableTimeSlots.map((time) => {
          return (
            <div className="make-appointment-page__select-time-dialog__time-list__item"
            key={time}
            >
              <input type="radio"
                name="time"
                id={time}
                value={time}
                onChange={(e) => {
                  setAppointmentTime(e.target.value);
                }}
                />
              <label htmlFor={time}>{time}</label>
            </div>
          )
        })
      }
      </div>
      <div className="make-appointment-page__select-time-dialog__button">
        <button type="button" className={`${appointmentTime ? "" : "disable-btn"}`}
          onClick={() => {
            if (appointmentTime) {
              setSelectTimeDialog(!selectTimeDialog);
              navigate('/select-services', { state: {u_info: u_info, appointmentTime: appointmentTime, selectedBarber: selectedBarber} });
            }
          }}
        >Continue</button>
        <button type="button" style={{background: "red"}}
          onClick={() => {
            setSelectTimeDialog(!selectTimeDialog);
            setAppointmentTime('');
            setSelectedBarber({});
          }}
        >Cancel</button>
      </div>
    </div>
  )
};
