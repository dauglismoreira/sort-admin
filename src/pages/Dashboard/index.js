import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import axios from 'axios';
import { connect } from "react-redux";
import {
  Row,
  Col,
} from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings";
import EmailSent from "./email-sent";
import MonthlyEarnings2 from "./montly-earnings2";
import Inbox from "./inbox";
import RecentActivity from "./recent-activity";
import WidgetUser from "./widget-user";
import YearlySales from "./yearly-sales";
import LatestTransactions from "./latest-transactions";
import LatestOrders from "./latest-orders";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

const Dashboard = (props) => {

  const [selectImoveis, setSelectImoveis] = useState([]);
  useEffect((imovel) => {
    axios.get("https://sort.vps-kinghost.net/api/select/immobile/all")
      .then(response => {
        setSelectImoveis(response.data)
      }
      )
      .catch(function (error) { console.log(error); });
  }, []);

  const breadcrumbItems = [
    { title: "Sort", link: "#" },
    { title: "Dashboard", link: "#" }
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Dashboard', breadcrumbItems)
  })

  const reports = [
    { title: "Imóveis", iconClass: "cube-outline", total: selectImoveis.length },
    { title: "Canal Pro", iconClass: "buffer", total: "0" },
    { title: "Chaves na Mão", iconClass: "tag-text-outline", total: "0" },
    { title: "DWV", iconClass: "briefcase-check", total: "0" },
  ]

  return (
    <React.Fragment>

      <MetaTags>
        <title>Dashboard | Sort Investimentos</title>
      </MetaTags>

      <Miniwidget reports={reports} />

      <Row>
        <Col xl="3">
          <MonthlyEarnings />
        </Col>

        {/* <Col xl="6">
          <EmailSent />
        </Col>

        <Col xl="3">
          <MonthlyEarnings2 />
        </Col> */}

      </Row>
      {/* <Row>

        <Col xl="4" lg="6">
          <Inbox />
        </Col>
        <Col xl="4" lg="6">
          <RecentActivity />

        </Col>
        <Col xl="4">
          <WidgetUser />

          <YearlySales />
        </Col>
      </Row>

      <Row>
        <Col xl="6">
          <LatestTransactions />
        </Col>

        <Col xl="6">
          <LatestOrders />
        </Col>
      </Row> */}

    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard);