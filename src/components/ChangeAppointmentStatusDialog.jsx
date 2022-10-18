import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ChangeAppointmentStatusDialog = ({
  openStatusChangeDialog,
  setOpenStatusChangeDialog,
  statusValue,
  setStatusValue,
  isValueSelected,
  setIsValueSelected,
  updateAppointmentRequestStatus,
  selectedAptId,
  customerName,
  setCustomerName,
}) => {
  return (
    <>
      <div className="change-apt-status-dialog">
        <div className="change-apt-status-dialog__container">
          <div className="change-apt-status-dialog__container__header">
            <h3>Change Appointment Status</h3>
          </div>
          <div className="change-apt-status-dialog__container__body">
            <select name="apt-status" id="apt-status"
              defaultValue={statusValue}
              onChange={(e) => {
                setStatusValue(e.target.value);
                setIsValueSelected(true);
              }}
            >
              <option defaultValue="" disabled selected hidden>Choose Appointment Status</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="change-apt-status-dialog__container__footer">
            <button
              style={{
                opacity: isValueSelected ? 1 : 0.5,
                pointerEvents: isValueSelected ? 'auto' : 'none',
              }}
              onClick={() => {
                updateAppointmentRequestStatus(selectedAptId, statusValue);
                toast.success(`Appointment with ${customerName} set to ${statusValue}`, {
                  position: "top-center",
                });
                setOpenStatusChangeDialog(false);
              }}
            >Update</button>
            <button
              style={{
                backgroundColor: "red",
              }}
              onClick={() => {
                setOpenStatusChangeDialog(!openStatusChangeDialog);
                setIsValueSelected(false);
                setStatusValue(null);
                setCustomerName("");
              }}
            >Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
};