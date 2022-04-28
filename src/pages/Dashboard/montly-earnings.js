import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap"
import DonutChart from '../AllCharts/DonutChart';

const MonthlyEarnings = props => {

    const [selectImoveis, setSelectImoveis] = useState([]);
    const [selectImoveisActive, setSelectImoveisActive] = useState([]);
    const [selectImoveisInactive, setSelectImoveisInactive] = useState([]);
    useEffect((imovel) => {
        axios.get("https://sort.vps-kinghost.net/api/select/immobile/all")
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
    }, []);

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="h4 mb-4">Imóveis Cadastrados</CardTitle>

                    <Row className="text-center mt-4">
                        <div className="col-6">
                            <h5 className="font-size-20">{selectImoveisActive.length}</h5>
                            <p className="text-muted">Ativos</p>
                        </div>
                        <div className="col-6">
                            <h5 className="font-size-20">{selectImoveisInactive.length}</h5>
                            <p className="text-muted">Inativos</p>
                        </div>
                    </Row>
                    <div dir="ltr">
                        <DonutChart />
                    </div>

                </CardBody>
            </Card>
        </React.Fragment>
    )

}

export default MonthlyEarnings
