import React, {useEffect, useState} from "react";
import { connect } from 'react-redux'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import Web3 from 'web3'
import {
  registerUser,
  loginUser,
  setCurrentUser,
  logoutUser,
  getNonce,
  authenticateUser,
  logout
} from '../actions/authActions'
import setAuthToken from '../utils/setAuthToken'
import { formatAddress } from "../web3/helpers/format-string";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import {  useAccount, useNetwork  , useSignMessage , useConnect , useDisconnect } from 'wagmi';
import {useMediaQuery} from 'react-responsive';
import { useWeb3Modal } from "@web3modal/react";



function ConnectMetaMask({  isLoggedIn, setIsLoggedIn , signOutWallet}) {

  const [nonce_val , setNonce] = useState("");
  const { isConnected, isDisconnected , address , connector: activeConnector } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const {disconnect} = useDisconnect();
  const { chain: currentChain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const [show, setShow] = useState(false);
  const { open } = useWeb3Modal();


  const handleClose = () => setShow(false);
  const isTabletView = useMediaQuery({ maxWidth: 790 }); 

  const connectorsToDisplay = isTabletView
  ? connectors.filter((connector) => connector.name === 'WalletConnect') 
  : connectors;

  useEffect(() => {
    const token = window.localStorage.getItem('web3_japan_token');
    const isSigned = window.localStorage.getItem('isSigned');
    //When user connects with wrong network
    if(isConnected && currentChain?.unsupported){
      setShow(true)
      wrongNetwork();
    }

    //if user changes account or changes network , the current account will get logged out
    if (activeConnector && isConnected ) {
      activeConnector.on("change", disconnect);
    }

    // if no token/token expired then current logged in web3 wallet will logout automatic
    if((token==null || !token ) && signOutWallet && isConnected && isSigned ){
      // console.log('entered signOutWallet')
      disconnectWallet()
    }

    //obtaining nonce here for signing purpose
    if (isConnected && !token && token === null) {
      setTimeout(() => {
        obtainNonce()
      }, 3000);
    }
 
    //if no wallet is connected
    if(isDisconnected){
      setAuthToken(undefined)
      setIsLoggedIn(false);
      window.localStorage.removeItem('isSigned');
      window.localStorage.removeItem('web3_japan_token');
      window.localStorage.removeItem('jwtToken');
    }

  }, [isConnected , isDisconnected , currentChain?.unsupported , activeConnector , signOutWallet])


  const signMessage = async(nonce , address) => {
    try{
      if(!localStorage.isSigned || localStorage.isSigned == undefined){
        const message = `Nonce: ${nonce}`;
        const signature = await signMessageAsync({ message });
        if(signature){
          window.localStorage.setItem('isSigned',true);
          authenticate(address , signature);
        }
      } else {
        console.log('user logged in already');
      }
    }catch(err){
      await disconnect();
      setAuthToken(undefined)
      setIsLoggedIn(false);
      window.localStorage.removeItem('isSigned');
      window.localStorage.removeItem('web3_japan_token');
      window.localStorage.removeItem('jwtToken');
    }
  }


  async function obtainNonce(){
    const nonceVal = await getNonce(address);
    setNonce(nonceVal);
    if(nonceVal !== "" && !currentChain?.unsupported){
      signMessage(nonceVal , address);
    }
  }

  const disconnectWallet = async() => {
    await disconnect()
    setAuthToken(undefined)
    setIsLoggedIn(false);
    window.localStorage.removeItem('isSigned');
    window.localStorage.removeItem('web3_japan_token');
    window.localStorage.removeItem('jwtToken');
  }

  const wrongNetwork = async() => {
    await disconnect()
    setAuthToken(undefined)
    setIsLoggedIn(false);
    window.localStorage.removeItem('isSigned');
    window.localStorage.removeItem('web3_japan_token');
    window.localStorage.removeItem('jwtToken');
  }

  const authenticate = async (address , signature) => {
    try {
        var senData = {
          publicAddress : address,
          signature : signature
        }
        const authResult = await authenticateUser(senData);
  
        if (authResult) {
          const token = authResult?.token
          window.localStorage.setItem('isSigned',true);
          setAuthToken(token)
          setIsLoggedIn(true)
          // window.location.href="/dashboard"
        }
        else {
          await disconnect()
          setAuthToken(undefined)
          setIsLoggedIn(false)
        }
    }
    catch (error) {
      await disconnect()
      console.error(error);
      setAuthToken(undefined)
      setIsLoggedIn(false)
    }
  }


  return (
    <div className="d-flex flex-column align-items-center w-100">
     {!isConnected && !localStorage.isSigned && (
        <>
          <div className="d-flex justify-content-center align-items-center w-100 mt-2">
            <FiCircle color='#6d7175' />
            <h6 className="mb-0 ml-2" style={{ color: '#6d7175' }}>Not Connected. We Support Matic Network.</h6>
          </div>
          <div className="d-flex justify-content-center flex-wrap"> {/* Wrap buttons in a flex container */}
          <button
              className="btn btn-primary font-weight-bold mt-3 mx-2" 
              onClick={open}>Connect</button>
          </div>
        </>
      )}

      { isConnected && localStorage.isSigned && (
        <>
        <div className="d-flex justify-content-center align-items-center w-100">
          <FiCheckCircle color='#10c65f' />
          <h6 className="mb-0 ml-2" style={{ color: '#28be6a' }}>Connected: {formatAddress(address)}</h6>
        </div>
          <button
            className="btn btn-primary font-weight-bold mt-3"
            onClick={disconnect}
          >
             Disconnect
          </button> 
        </>
      )}

      {/* Modal to display wallets connections */}
     <Modal show={show}  aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
         <Modal.Header className="modal-header">
          <Modal.Title id="contained-modal-title-vcenter">Wrong Network Detected!</Modal.Title>
        </Modal.Header>
        <Modal.Body>The Application is compatible with Ethereum and Matic Mainnet. </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary font-weight-bold mt-3" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Pop up to display wrong network connected */}
      <Modal show={show}  aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
        <Modal.Header className="modal-header">
          <Modal.Title id="contained-modal-title-vcenter">Wrong Network Detected!</Modal.Title>
        </Modal.Header>
        <Modal.Body>The Application is compatible with Matic Mainnet. </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary font-weight-bold mt-3" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetNonce: (address) => dispatch(getNonce(address))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ConnectMetaMask);