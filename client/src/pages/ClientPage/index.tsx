import React from 'react';
import { Button } from 'react-bootstrap';
import { socket } from '../../utils';

interface Params {
  color: string
}

function ClientPage() {
  const handeClick: any = async (color: string) => {
    let data: Params = { color: color };
    socket.emit('receive-click', data);
}

  return (
    <div>
      <Button className="w-25 p-2 m-2 rounded-pill" variant="primary" onClick={() => handeClick('blue')}>Blue</Button>
      <Button className="w-25 p-2 m-2 rounded-pill" variant="warning" onClick={() => handeClick('orange')}>Orange</Button>
    </div>
  );
}

export default ClientPage;
