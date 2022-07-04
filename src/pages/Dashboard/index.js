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
import AnalyticsList from "./analytics-list";
import AnalyticsMap from "./analytics-map";
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
import './Miniwidget.css';

const Dashboard = (props) => {

  const [selectImoveis, setSelectImoveis] = useState([]);
  const [selectIntegration, setSelectIntegration] = useState([]);
  const [selectIntegrationZap, setSelectIntegrationZap] = useState([]);
  const [selectDwv, setSelectIDwv] = useState([]);
  const [selectAnalytics, setSelectAnalytics] = useState([]);
  useEffect((imovel) => {
    axios.get("https://sort.vps-kinghost.net/api/immobile/select/all")
      .then(response => {
        response.data.forEach((imovel) => {
          if (imovel.integration === '1') {
            selectIntegration.push(imovel)
          }
          if (imovel.integration_zap === '1') {
            selectIntegrationZap.push(imovel)
          }
          if (imovel.id_extern) {
            selectDwv.push(imovel)
          }
        })
        setSelectImoveis(response.data)

      }
      )
      .catch(function (error) { console.log(error); });

    console.log(selectIntegration)
  }, []);

  const breadcrumbItems = [
    { title: "Sort", link: "#" },
    { title: "Dashboard", link: "#" }
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Dashboard', breadcrumbItems)
  })


  const reports = [
    { title: "Imóveis", iconClass: "sorti", total: selectImoveis.length },
    { title: "Canal Pro", iconClass: "canal", total: selectIntegrationZap.length },
    { title: "Chaves na Mão", iconClass: "chaves", total: selectIntegration.length },
    { title: "DWV", iconClass: "dwn", total: selectDwv.length },
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

        <Col xl="5">
          <AnalyticsList />
        </Col>

        <Col xl="4">
          <AnalyticsMap />
        </Col>

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