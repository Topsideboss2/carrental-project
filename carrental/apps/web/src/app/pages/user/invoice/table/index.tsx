import { useContext } from 'react';
import { InvoiceContext } from '../context';
import {Invoice} from '@carrental/constants';

export function Table({ data }: {data: Invoice[]}) {
  const invoiceContext = useContext(InvoiceContext)!;
  const { setPayModal, setViewModal, setInvoiceId } = invoiceContext

  return (
    <table className="table de-table">
      <thead>
        <tr>
          <th scope="col">
            <span className="text-uppercase fs-12 text-gray">
              Reservation Number
            </span>
          </th>
          <th scope="col">
            <span className="text-uppercase fs-12 text-gray">Invoice Item</span>
          </th>
          <th scope="col">
            <span className="text-uppercase fs-12 text-gray">Amount</span>
          </th>
          <th scope="col">
            <span className="text-uppercase fs-12 text-gray">Status</span>
          </th>
          <th scope="col" className="text-center">
            <span className="text-uppercase fs-12 text-gray">Action</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr key={index}>
              <td>
                <span className="d-lg-none d-sm-block">Reservation Number</span>
                <div className="badge bg-gray-100 text-dark">{`RN00${item.reservation.id}`}</div>
              </td>
              <td>
                <span className="d-lg-none d-sm-block">Invoice Item</span>
                <span className="bold">{item.reservation.car.model}</span>
              </td>
              <td>
                <span className="d-lg-none d-sm-block">Amount</span>
                {item.amount}
              </td>
              <td>
                <div
                  className={`badge rounded-pill ${
                    item.status === 'PAID' ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  {item.status}
                </div>
              </td>
              <td className="text-center">
                {item.status === 'UNPAID' && (
                  <span
                    style={{ marginRight: '10px', cursor: 'pointer' }}
                    onClick={() => {
                      setInvoiceId(item.id);
                      setPayModal((prevState: boolean) => !prevState);
                    }}
                  >
                    Pay
                  </span>
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
