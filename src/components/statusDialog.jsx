import React, { useState } from 'react';
import { updateBarberStatus } from '../service/srBarber';

export const StatusDialog = ({setOpenStatusChangeDialog, u_id}) => {
  const [statusValue, setStatusValue] = useState();
  return (
    <>
      <div className="status-dialog">
        <div className="status-dialog__header">
          <h3>Update Status</h3>
        </div>
        <div className="status-dialog__body">
          <select name="status" id="status" value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
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
            <option value="available">Available</option>
            <option value="busy">Busy</option>
          </select>
        </div>
        <div className="status-dialog__footer">
          <button
            onClick={() => {
              const resp = updateBarberStatus(u_id, statusValue);
              console.log(resp);
              alert("Status Updated");
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