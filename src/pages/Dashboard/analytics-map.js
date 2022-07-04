import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap"
import DonutChart from '../AllCharts/DonutChart';
import MapsAll from './MapsAll';

import './Miniwidget.css';

const MonthlyEarnings = props => {

    const [selectImoveis, setSelectImoveis] = useState([]);
    const [selectImoveisActive, setSelectImoveisActive] = useState([]);
    const [selectImoveisInactive, setSelectImoveisInactive] = useState([]);
    const [selectAnalytics, setSelectAnalytics] = useState([]);
    const [content, setContent] = useState({
        lat: -27.006857468654108,
        lng: -48.64765317777967
    });
    useEffect((imovel) => {
        axios.get("https://sort.vps-kinghost.net/api/immobile/select/all")
            .then(response => {
                setSelectImoveis(response.data)
                response.data.forEach((imovel) => {
                    if (imovel.status == 1) {
                        selectImoveisActive.push(imovel)
                    }
                })
                response.data.forEach((imoveli) => {
                    if (imoveli.status == 0) {
                        selectImoveisInactive.push(imoveli)
                    }
                })
            }
            )
            .catch(function (error) { console.log(error); });
        axios.get('https://sort.vps-kinghost.net/api/analytic/select/all')
            .then(response =>
                setSelectAnalytics(response.data)
            )
    }, []);

    return (
        <React.Fragment>
            <Card>
                <CardBody className="box-access-height">
                    <CardTitle className="h4 mb-4">Locais de Acesso</CardTitle>
                    <MapsAll content={content} zoomLevel={13} />
                </CardBody>
            </Card>
        </React.Fragment>
    )

}

export default MonthlyEarnings
