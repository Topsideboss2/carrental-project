import React, { FormEvent, useContext, useState } from 'react';
import { InvoiceContext } from '../context';
import Modal from 'react-modal';
import { requests } from '../../../../utils/api';
import { getToken, getUser } from '../../../../utils/useToken';
import Swal from 'sweetalert2';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '100%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)', // add shadow
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)', // make overlay darker
  },
};

function PayModal() {
  const { payModal, setPayModal, invoiceId } = useContext(InvoiceContext)!;

  function closeModal() {
    setPayModal(false);
  }

  const user = getUser();
  const token = getToken();

  const [loading, setLoading] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const makePayment = async () => {
    const data = {
      mpesaNumber,
      amount: 1,
      invoiceId,
      paymentMethod,
      userId: user.id,
    };
    setLoading(true);
    await requests
      .post<any>(`payments/create/`, data ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log('user dashboard error =>', error as string);
      });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this process!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Pay!',
    }).then((result) => {
      if (result.isConfirmed) {
        setPayModal(false)
        Swal.fire({
          title: 'Processing Payment',
          text: `We are processing your payment, kindly wait`,
          // timer: 20000,
          // timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            makePayment()
          }
        })
      }
    });
  };
  return (
    <div>
      <Modal
        isOpen={payModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 style={{color: "#000"}}>Invoice Payment</h3>
        <form className="form-border">
          <div className="field-set">
            <select
              className="form-control"
              onChange={(event) => setPaymentMethod(event.target.value)}
            >
              <option>Select your payment method</option>
              <option value="MPESA">MPESA</option>
            </select>
          </div>
          <div className="field-set">
            <input
              type="text"
              name="mpesaNumber"
              id="name"
              className="form-control"
              placeholder="Mpesa Number"
              onChange={(event) => setMpesaNumber(event.target.value)}
              value={mpesaNumber}
            />
          </div>

          <div id="submit">
            <input
              type="submit"
              id="send_message"
              value="Make Payment"
              className="btn-main btn-fullwidth rounded-3"
              onClick={(event) => handleSubmit}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PayModal;
