import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Chip } from "@mui/material";


function DisputesTable({ disputes = [], onViewDetails, onSubmitProof, currentWalletAddress }) {

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'success';
      case 'InProcess':
        return 'warning';
      case 'DisputeRaised':
        return 'info';
      case 'Awaiting Response':
        return 'warning';
      default:
        return 'default';
    }
  };

  // const getStatusDisplayName = (status) => {
  //   switch (status) {
  //     case 'DisputeRaised':
  //       return 'Awaiting Response';
  //     case 'InProcess':
  //       return 'In Discussion';
  //     case 'Resolved':
  //       return 'Resolved';
  //     default:
  //       return status;
  //   }
  // };

  const columns = [
    {
      field: 'disputeId',
      headerName: 'Dispute ID',
      width: 120,
      renderCell: (params) => `#${params.value || 'N/A'}`
    },
    {
      field: 'agreementId',
      headerName: 'Agreement ID',
      width: 180
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        const status = params.row.status;  // Get status from the row data
        const evidence = params.row.evidence;
        const type = currentWalletAddress === params.row.payerWalletAddress ? "Payer" : "Receiver";

        let isEvidenceUploaded = true;
        if (type === "Payer" && evidence.payerEvidence.length === 0) {
          isEvidenceUploaded = false; // Evidence not uploaded by Payer
        } else if (type === "Receiver" && evidence.receiverEvidence.length === 0) {
          isEvidenceUploaded = false; // Evidence not uploaded by Receiver
        }

        // Determine the status based on conditions
        let displayStatus;
        if (status === "DisputeRaised") {
          displayStatus = isEvidenceUploaded ? "Awaiting Response" : "DisputeRaised";
        } else if (status === "InProcess") {
          displayStatus = "InProcess";
        } else if (status === "Resolved") {
          displayStatus = "Resolved";
        }

        return (
          <Chip
            label={displayStatus}
            color={getStatusColor(displayStatus)}
            size="small"
          />
        );
      }
    },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   width: 150,
    //   renderCell: (params) => (
    //     <Chip
    //       label={getStatusDisplayName(params.value)}
    //       color={getStatusColor(params.value)}
    //       size="small"
    //     />
    //   )
    // },
    {
      field: 'disputeCategory',
      headerName: 'Dispute Category',
      width: 200
    },
    {
      field: 'disputeCreator',
      headerName: 'Raised By',
      width: 150
    },
    {
      field: 'createdAt',
      headerName: 'Raised On',
      width: 150,
    },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   width: 300,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params) => (
    //     <Box sx={{ display: 'flex', gap: 1 }}>
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         size="small"
    //         sx={{ outline: 'none', boxShadow: 'none' }}
    //         onClick={() => onViewDetails && onViewDetails(params.row)}
    //       >
    //         View Details
    //       </Button>
    //       {params.row.status !== 'Resolved' && (
    //         <Button
    //           variant="outlined"
    //           color="secondary"
    //           size="small"
    //           sx={{ outline: 'none', boxShadow: 'none' }}
    //           onClick={() => onSubmitProof && onSubmitProof(params.row)}
    //         >
    //           Submit Proof
    //         </Button>
    //       )}
    //     </Box>
    //   ),
    // },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const evidence = params.row.evidence;
        const type = currentWalletAddress === params.row.payerWalletAddress ? "Payer" : "Receiver";

        let isEvidenceUploaded = true;
        if (type === "Payer" && evidence.payerEvidence.length === 0) {
          isEvidenceUploaded = false; // Evidence not uploaded by Payer
        } else if (type === "Receiver" && evidence.receiverEvidence.length === 0) {
          isEvidenceUploaded = false; // Evidence not uploaded by Receiver
        }

        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ outline: 'none', boxShadow: 'none' }}
              onClick={() => onViewDetails && onViewDetails(params.row)}
            >
              View Details
            </Button>

            {(() => {
              const status = params.row.status;
              const evidence = params.row.evidence;
              const type = currentWalletAddress === params.row.payerWalletAddress ? "Payer" : "Receiver";

              let isEvidenceUploaded = true;
              if (type === "Payer" && evidence.payerEvidence.length === 0) {
                isEvidenceUploaded = false;
              } else if (type === "Receiver" && evidence.receiverEvidence.length === 0) {
                isEvidenceUploaded = false;
              }

              return (
                status === "DisputeRaised" &&
                isEvidenceUploaded
              );
            })() && (
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  sx={{ outline: 'none', boxShadow: 'none' }}
                  onClick={() => onSubmitProof && onSubmitProof(params.row)}
                >
                  Respond To Dispute
                </Button>
              )}

          </Box>
        );
      },
    }

  ];

  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      <DataGrid
        rows={disputes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id || row.disputeId || row._id}
        disableSelectionOnClick
        sx={{
          cursor: "pointer",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#333",
          },
          "& .MuiDataGrid-cell": {
            color: "#fff",
            outline: "none",
          },
        }}
      />
    </Box>
  );
}

export default DisputesTable;