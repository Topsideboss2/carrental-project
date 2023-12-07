import { useEffect, useState } from 'react';
import { SideBar } from '../../../shared/sidebar';
import SubHeader from '../../../shared/subheader';
import { getToken, getUser } from '../../../utils/useToken';
import { requests } from '../../../utils/api';
import Table from './table';
import { InvoiceContext } from './context';
import { Invoice as InvoiceSchema } from '@carrental/constants';
import PayModal from './modal/pay';

export function Invoice() {
  const user = getUser();
  const token = getToken();

  const [invoices, setInvoices] = useState<InvoiceSchema[]>([]);
  const [payModal, setPayModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [invoiceId, setInvoiceId] = useState(1)

  const fetchUserInvoices = async () => {
    await requests
      .get<any>(`invoices/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        setInvoices(response);
      })
      .catch((error) => {
        console.log('user invoices error =>', error as string);
      });
  };
  useEffect(() => {
    fetchUserInvoices();
  }, []);
  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        setInvoices,
        payModal,
        setPayModal,
        viewModal,
        setViewModal,
        invoiceId,
        setInvoiceId
      }}
    >
      <div className="no-bottom no-top zebra" id="content">
        <SubHeader title="Invoices" />
        <section id="section-settings" className="bg-gray-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 mb30">
                <SideBar />
              </div>
              <div className="col-lg-9">
                <PayModal />

                <div className="tab-default">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active"
                        id="nav-unpaid-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-unpaid"
                        type="button"
                        role="tab"
                        aria-controls="nav-unpaid"
                        aria-selected="true"
                      >
                        Unpaid
                      </button>
                      <button
                        className="nav-link"
                        id="nav-paid-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-paid"
                        type="button"
                        role="tab"
                        aria-controls="nav-paid"
                        aria-selected="false"
                      >
                        Paid
                      </button>
                    </div>
                  </nav>

                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-unpaid"
                      role="tabpanel"
                      aria-labelledby="nav-unpaid-tab"
                    >
                      <div className="card p-4 rounded-5 mb25">
                        <h4>Unpaid Invoices</h4>
                        <Table
                          data={invoices.filter(
                            (item) => item.status === 'UNPAID'
                          )}
                        />
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-paid"
                      role="tabpanel"
                      aria-labelledby="nav-paid-tab"
                    >
                      <div className="card p-4 rounded-5 mb25">
                        <h4>Paid Invoices</h4>

                        <Table
                          data={invoices.filter(
                            (item) => item.status === 'PAID'
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </InvoiceContext.Provider>
  );
}

export default Invoice;
