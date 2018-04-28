pragma solidity ^0.4.19;

import './Identity.sol';

contract Enroute {
  address public owner;
  mapping (bytes32 => uint) public shipments;
  Identity public identity;

  event ShipmentProcessed(bytes32 indexed hash, address processor);
  
  constructor(address _identity) {
    owner = msg.sender;  
    identity = Identity(_identity);
  }
  
  function confirmShipment(bytes32 _shipment) canShip(_shipment) {
    shipments[_shipment] += 1; 
    emit ShipmentProcessed(_shipment, msg.sender);
  }


  modifier canShip(bytes32 _shipment) {
    uint state = shipments[_shipment];
    require(identity.getAccess(this, msg.sender, state));
    _;
  }
}
