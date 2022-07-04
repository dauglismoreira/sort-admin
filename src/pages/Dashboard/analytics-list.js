import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap"
import DonutChart from '../AllCharts/DonutChart';

import './Miniwidget.css';

const MonthlyEarnings = props => {

    const [selectImoveis, setSelectImoveis] = useState([]);
    const [selectImoveisActive, setSelectImoveisActive] = useState([]);
    const [selectImoveisInactive, setSelectImoveisInactive] = useState([]);
    const [selectAnalytics, setSelectAnalytics] = useState([]);
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
            .then(response => {
                setSelectAnalytics(response.data.sort((c1, c2) => (c1.count > c2.count) ? 1 : -1));
                console.log(response.data.sort((c1, c2) => (c1.count > c2.count) ? 1 : -1))
            }
            )
    }, []);

    return (
        <React.Fragment>
            <Card>
                <CardBody className="box-access-height">
                    <CardTitle className="h4 mb-4">Imóveis Mais Acessados</CardTitle>
                    <div className="immobile-access-list">
                        <div className="analytics-list">
                            <div className="access title">Acessos</div>
                            <div className="name title">Imóvel</div>
                        </div>
                        {selectImoveis.map((imovelName, i) => (
                            selectAnalytics.filter(imovelFilter => imovelName.code_product === imovelFilter.id_product)
                                .map((imovel, index) => (
                                    <div className="analytics-list items" key={index}>
                                        <div className="access">{Math.round(imovel.count / 2)}</div>
                                        <div className="name">({imovelName.sku}) {imovelName.name}</div>
                                    </div>
                                ))
                        ))}
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    )

}

export default MonthlyEarnings
