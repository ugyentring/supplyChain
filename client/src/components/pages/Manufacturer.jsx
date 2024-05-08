import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button as Btn } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "../Button";

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async (setCurrentAccount, setWalletConnected) => {
  try {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      setWalletConnected(true);
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Manufacturer = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    // Function to check Metamask account
    const checkMetaMaskAccount = async () => {
      await findMetaMaskAccount(setCurrentAccount, setWalletConnected);
    };

    // Check Metamask account when component mounts or updates
    checkMetaMaskAccount();

    // Add event listener for account changes
    const ethereum = getEthereumObject();
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          console.log("Account changed:", accounts[0]);
          setCurrentAccount(accounts[0]);
          setWalletConnected(true);
        } else {
          console.log("No authorized account found");
          setCurrentAccount("");
          setWalletConnected(false);
        }
      });
    }

    // Clean up the event listener
    return () => {
      if (ethereum) {
        ethereum.removeAllListeners("accountsChanged");
      }
    };
  }, []);

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="role-container">
      <div className="role-container-box">
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
          }}
        >
          <Btn
            href="/login"
            endIcon={<LogoutIcon />}
            style={{ color: "#F1B749" }}
          >
            Logout
          </Btn>
        </Box>

        <h2>Welcome:</h2>
        <h1>Manufacturer</h1>

        {/* If wallet is not connected, show the Connect Wallet button */}
        {!walletConnected && (
          <Button
            className="btns"
            buttonStyle="btn--long"
            buttonSize="btn--large"
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        )}

        <Link to="/profile">
          <Button
            className="btns"
            buttonStyle="btn--long"
            buttonSize="btn--large"
          >
            Check Profile
          </Button>
        </Link>

        <Link to="/add-product">
          <Button
            className="btns"
            buttonStyle="btn--long"
            buttonSize="btn--large"
          >
            Add Product
          </Button>
        </Link>

        <p>{currentAccount}</p>
      </div>
    </div>
  );
};

export default Manufacturer;
