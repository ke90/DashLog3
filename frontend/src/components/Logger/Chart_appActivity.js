import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Chart_appActivity({ data }) {


  if (!data) {
    return <div>Warte auf Daten...</div>;
  }

  return (
    <Container fluid>
      <Card className="shadow">
        <Card.Body>
          <Card.Title>Aktuelle Aktivität</Card.Title>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="Anzahl" stroke="#ffae00" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Container>
  );

}

export default Chart_appActivity;
