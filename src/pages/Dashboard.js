import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cover from "../assets/images/cover.jpg";
import ConnectMetaMask from "../components/ConnectMetaMask";
import { formatAddress } from "../web3/helpers/format-string";
import BlockchainLogo from "../assets/images/blockchain.jpg";
import { FiCheckCircle } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";
import { url } from '../actions/config'
import axios from 'axios'
import { chain, useAccount, useNetwork  } from 'wagmi';
import { tokenChecker } from "../utils/tokenChecker";
import setAuthToken from "../utils/setAuthToken";


export default function Dashboard({  isLoggedIn, setIsLoggedIn }) {

  // const { connected, address } = useWeb3Context();
  const [stats, setStats] = useState({})
  const [courses, setCourses] = useState({})
  const [myCourses, setMyCourses] = useState([])
  const [error, setError] = useState(null)
  const [signOutWallet , setSignOutWallet] = useState(false)
  const { isConnected, isDisconnected , address  } = useAccount();
  const { chain: currentChain } = useNetwork();

  const getDashboardStats = () => {
    axios.get(url() + 'api/users/stats').then(response => {
      if (response?.status == 200) {
        setStats(response?.data?.data || {})
      }
    }).catch(error => {
      console.error(error);
      setError(error?.response?.data?.msg)
    })
  }



  useEffect(() => {
    const storedToken = window.localStorage.getItem('web3_japan_token');
    // console.log('dashboard stored token : ',storedToken)
    const isTokenActive = tokenChecker(storedToken);

    if(isTokenActive && isConnected && localStorage.isSigned === 'true'){
      getDashboardStats()
    } else {
      setAuthToken(null)
      setIsLoggedIn(false)
      setSignOutWallet(true)
    }
  }, [isConnected , isLoggedIn])


  return (
    <div className="dashboard-view">
      <div className="wallet-connect-box bg-light">
        <ConnectMetaMask
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          signOutWallet = {signOutWallet}
        />
      </div>

      {isConnected && localStorage.isSigned === 'true' ? (
        <>
          <div className="x-home-check">
            <div className="continue-learning-box">
              <h1 className="continue-box-title">Continue Learning , You are Connected Successfully</h1>
            </div>

            <div className="row mt-4">
              <div className="col-12 col-md-6 mb-2">
                <div className="dashbord-data-box basic-card-lips p-4">
                  <div>
                    <h4 className="text-center mb-4">Certificates</h4>
                  </div>
                  <div className="data-box-value">
                    <h3>{stats?.certificates || 0}</h3>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-2">
                <div className="dashbord-data-box basic-card-green p-4">
                  <div>
                    <h4 className="text-center mb-4">Courses Completed</h4>
                  </div>
                  <div className="data-box-value">
                    <h3>{stats?.completedCourses || 0}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="col-12 rounded bg-light mt-3 p-4">
          { isConnected && !localStorage.isSigned ? (
            <p className="mb-0 text-center">Please Provide Your Signature Sent To Your Wallet.</p>
          ) : (
            <p className="mb-0 text-center">Please login by connecting your Web3 Wallet using the button above.</p>
          ) }
        </div>
      )}
    </div>
  );
}