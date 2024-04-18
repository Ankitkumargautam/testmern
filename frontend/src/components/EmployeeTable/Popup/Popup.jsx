import { useRef } from 'react';
import styles from './Popup.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ContextState } from '../../../Context/ContextProvider';
import { toast } from 'react-toastify';

const Popup = ({
  onClose,
  setShowEditPopup,
  create,
  setEmployeeData,
  employeeData,
  currentId,
  setCurrentId,
  updateEmployeeData,
  // setUpdateEmployeeData,
  itemsPerPage,
}) => {
  const popupRef = useRef(null);

  const { user } = ContextState();

  const closePopupBlur = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowEditPopup(false);
    }
  };

  const initialValues = create
    ? {
        name: '',
        email: '',
        phone: '',
      }
    : {
        name: updateEmployeeData.name,
        email: updateEmployeeData.email,
        phone: updateEmployeeData.phone,
      };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must contain only digits')
      .length(10, 'Phone number must be exactly 10 character')
      .required('Phone number is required'),
  });

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // console.log(values, ' == values');
    setSubmitting(false);
    try {
      if (create) {
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASEURL}/api/createEmployee`,
          values,
          config
        );
        if (employeeData.length < itemsPerPage) {
          setEmployeeData([data?.data, ...employeeData]);
        } else {
          setEmployeeData([data?.data, ...employeeData.slice(0, -1)]);
        }
        toast(data.message);
        setShowEditPopup(false);
      } else {
        const { data } = await axios.put(
          `${process.env.REACT_APP_BASEURL}/api/updateEmployee/${currentId}`,
          values,
          config
        );
        setEmployeeData(
          employeeData.map((emp) => {
            if (emp._id === currentId) {
              return data?.data;
            } else {
              return emp;
            }
          })
        );
        setCurrentId(0);
        toast(data.message);
        setShowEditPopup(false);
      }
    } catch (error) {
      toast(error?.response?.data?.message || 'Internal error');
    }
  };

  return (
    <div className={styles.overlay} onClick={closePopupBlur}>
      <div className={styles.popup} ref={popupRef}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{create ? 'Create an' : 'Edit'} Employee</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <Field name="name" placeholder="name" type="text" />
              </div>
              <ErrorMessage
                name="name"
                component="span"
                className={styles.errorMessage}
              />
              <div className={styles.formGroup}>
                <label htmlFor="email">Email:</label>
                <Field name="email" placeholder="email" type="email" />
              </div>
              <ErrorMessage
                name="email"
                component="span"
                className={styles.errorMessage}
              />
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone:</label>
                <Field
                  name="phone"
                  placeholder="phone"
                  type="text"
                  maxLength={10}
                  onKeyPress={(e) => {
                    // Prevent typing characters other than numbers
                    const isValidKey = /^\d$/.test(e.key);
                    if (!isValidKey) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <ErrorMessage
                name="phone"
                component="span"
                className={styles.errorMessage}
              />
              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={isSubmitting}
                >
                  {create
                    ? isSubmitting
                      ? 'Creating...'
                      : 'Create'
                    : isSubmitting
                    ? 'Editing...'
                    : 'Edit'}
                </button>
                <button onClick={onClose} className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Popup;
