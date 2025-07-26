import { useState } from 'react';
import './AddressDialog.css';

const AddressDialog = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    state: '',
    country: '',
    pinCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div style={{ display: isOpen ? 'flex' : 'none' }} className="dialog-overlay">
      <div className="dialog-box">
        <h2>Add Address</h2>
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          value={formData.addressLine1}
          onChange={handleChange}
        />
        <input
          type="text"
          name="addressLine2"
          placeholder="Address Line 2"
          value={formData.addressLine2}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pinCode"
          placeholder="PIN Code"
          value={formData.pinCode}
          onChange={handleChange}
        />
        <div className="dialog-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddressDialog;
