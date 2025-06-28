import * as React from "react";
import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import AgreementsTable from "./AgreementsTable";
import DisputesTabPanel from "./DisputesTabPanel";
import AgreementDetailView from "./AgreementDetailView";
import { useNavigate } from "react-router-dom";
import ViewAgreementPage from "./ViewAgreementPage";
import { WalletContext } from "../../context/WalletContext";

const customTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0E1218",
      paper: "#0E1218",
    },
    text: {
      primary: "#FFFFFF",
    },
    primary: {
      main: "#FFFFFF",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
          "&.Mui-focused": {
            outline: "none",
          },
        },
        input: {
          border: "none",
          "&:focus": {
            border: "none",
          },
        },
      },
    },
  },
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ account }) {
  const [value, setValue] = React.useState(0);
  const [selectedAgreement, setSelectedAgreement] = React.useState(null);
  const navigate = useNavigate();
  const { walletAddress } = useContext(WalletContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    console.log(walletAddress, "Hello World");

    if (!walletAddress) return;
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/agreement/wallet/${walletAddress}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAgreements(data.agreements);
      })
      .catch((err) => console.error("Failed to load agreements", err));
  }, [walletAddress]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleViewAgreement = (agreement) => {
    setSelectedAgreement(agreement);
  };

  const handleCloseDetailView = () => {
    setSelectedAgreement(null);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ width: "100%", bgcolor: "#0E1218" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: 1,
            borderColor: "divider",
            pr: 2,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              color: "#FFFFFF",
              "& .MuiTabs-indicator": {
                backgroundColor: "#FFFFFF",
              },
            }}
          >
            <Tab
              label="View Agreement"
              {...a11yProps(0)}
              sx={{ color: "#FFFFFF" }}
            />
            <Tab
              label="Manage Agreements"
              {...a11yProps(1)}
              sx={{ color: "#FFFFFF" }}
            />
            <Tab label="Disputes" {...a11yProps(2)} sx={{ color: "#FFFFFF" }} />
          </Tabs>

          {/* Create Agreement Button */}
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "#FFFFFF",
              borderColor: "#FFFFFF",
              textTransform: "none",
              fontFamily: "Clash Grotesk",
            }}
            onClick={() => navigate("/create-agreement")}
          >
            + Create Agreement
          </Button>
        </Box>
        <CustomTabPanel value={value} index={0} sx={{ height: "100vh" }}>
          <ViewAgreementPage />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} sx={{ height: "100vh" }}>
          {!selectedAgreement ? (
            <>
              <h1 className="tabs-title">Manage Agreements</h1>
              <br />
              <br />
              <AgreementsTable
                agreements={agreements}
                onView={handleViewAgreement}
                currentWalletAddress={walletAddress} // Make sure this is passed
              />
            </>
          ) : (
            <AgreementDetailView
              agreement={selectedAgreement}
              open={true}
              onClose={handleCloseDetailView}
              currentWalletAddress={walletAddress}  
            />
          )}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2} sx={{ height: "100vh" }}>
          <h1 className="tabs-title">Manage Disputes</h1>
          <br />
          <br />
          <DisputesTabPanel currentWalletAddress={walletAddress}/>
        </CustomTabPanel>
      </Box>
    </ThemeProvider>
  );
}
