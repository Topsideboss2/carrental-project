import { useEffect, useState } from 'react';
import { SideBar } from '../../../shared/sidebar';
import SubHeader from '../../../shared/subheader';
import { requests } from '../../../utils/api';
import { getToken, getUser } from '../../../utils/useToken';
import { Reservations } from './reservations';
import { UserReport } from '@carrental/constants';

export function Dashboard() {
  const user = getUser();
  const token = getToken();
  const [report, setReport] = useState<UserReport>({} as UserReport)
  const fetchUserReport = async() => {
    await requests.get<any>(`/reports/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setReport(response)
    }).catch((error) => {
      console.log('user dashboard error =>', error as string);
    })
  }

  useEffect(() => {
    fetchUserReport()
  }, [])

  return (
    <div className="no-bottom no-top zebra" id="content">
      <SubHeader title="Dashboard" />
      <section id="section-cars" className="bg-gray-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb30">
              <SideBar />
            </div>

            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-3 col-6 mb25 order-sm-1">
                  <div className="card p-4 rounded-5">
                    <div className="symbol mb40">
                      <i className="fa id-color fa-2x fa-calendar"></i>
                    </div>
                    <span className="h1 mb0">{report.totalReservations}</span>
                    <span className="text-gray">Total Reservations</span>
                  </div>
                </div>
                <div className="col-lg-3 col-6 mb25 order-sm-1">
                  <div className="card p-4 rounded-5">
                    <div className="symbol mb40">
                      <i className="fa id-color fa-2x fa-calendar-check-o"></i>
                    </div>
                    <span className="h1 mb0">{report.completeReservations}</span>
                    <span className="text-gray">Completed Reservations</span>
                  </div>
                </div>

                <div className="col-lg-3 col-6 mb25 order-sm-1">
                  <div className="card p-4 rounded-5">
                    <div className="symbol mb40">
                      <i className="fa id-color fa-2x fa-tags"></i>
                    </div>
                    <span className="h1 mb0">{report.pendingReservations}</span>
                    <span className="text-gray">Pending Reservations</span>
                  </div>
                </div>

                <div className="col-lg-3 col-6 mb25 order-sm-1">
                  <div className="card p-4 rounded-5">
                    <div className="symbol mb40">
                      <i className="fa id-color fa-2x fa-calendar-times-o"></i>
                    </div>
                    <span className="h1 mb0">{report.rejectedReservations}</span>
                    <span className="text-gray">Rejected Reservations</span>
                  </div>
                </div>
              </div>

              <Reservations />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
