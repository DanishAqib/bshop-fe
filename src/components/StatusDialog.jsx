import React, { useState } from 'react';
import { updateBarberStatus } from '../service/srBarber';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StatusDialog = ({setOpenStatusChangeDialog, u_id}) => {
  const [statusValue, setStatusValue] = useState();
  const [isValueSelected, setIsValueSelected] = useState(false);
  return (
    <>
      <div className="status-dialog">
        <div className="status-dialog__header">
          <h3>Update Status</h3>
        </div>
        <div className="status-dialog__body">
          <select name="status" id="status"
            defaultValue={statusValue}
            onChange={(e) => {
              setStatusValue(e.target.value);
              setIsValueSelected(true);
            }}
            style={{
              marginTop: '10px',
              width: '10rem',
              height: '2.5rem',
              marginBottom: '1rem',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              cursor: 'pointer',
              color: 'rgb(43, 43, 43)',
              outline: 'none'
            }}
          >
            <option defaultValue="" disabled selected hidden>Select Status</option>
            <option value="available">Available</option>
            <option value="not available">Not Available</option>
            <option value="busy">Busy</option>
          </select>
        </div>
        <div className="status-dialog__footer">
          <button
            style={{
              opacity: isValueSelected ? 1 : 0.5,
              pointerEvents: isValueSelected ? 'auto' : 'none',
            }}
            onClick={() => {
              updateBarberStatus(u_id, statusValue);
              toast.success(`Status updated to ${statusValue}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
              setOpenStatusChangeDialog(false);
            }}
          >Update</button>
          <button
          onClick={() => setOpenStatusChangeDialog(false)}>Cancel</button>
        </div>
      </div>
    </>
  )
}