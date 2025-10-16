import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  TableContainer,
  Paper,
} from "@mui/material";
import SectionCard from "../SectionCard.jsx";

export default function TransactionsTab() {
  const tx = [
    { id: "TX-0001", date: "2025-01-10", type: "Allotment", particulars: "Initial fund release under GAA 2025", amount: "PHP 20,000,000.00", hash: "0x7a9c...1f" },
    { id: "TX-0002", date: "2025-01-15", type: "Obligation", particulars: "Project mobilization and site clearance", amount: "PHP 1,250,000.00", hash: "0x4b22...7c" },
    { id: "TX-0003", date: "2025-02-10", type: "Disbursement", particulars: "Payment for survey and staking works", amount: "PHP 1,000,000.00", hash: "0x3c91...2f" },
    { id: "TX-0004", date: "2025-02-25", type: "Disbursement", particulars: "Procurement of reinforcing steel bars", amount: "PHP 2,000,000.00", hash: "0x1bc2...a3" },
    { id: "TX-0005", date: "2025-03-05", type: "Disbursement", particulars: "Concrete pouring for foundation block A", amount: "PHP 3,000,000.00", hash: "0x8ef3...91" },
    { id: "TX-0006", date: "2025-03-20", type: "Obligation", particulars: "Formworks and rebar assembly", amount: "PHP 2,300,000.00", hash: "0xa3b1...5e" },
    { id: "TX-0007", date: "2025-04-02", type: "Disbursement", particulars: "Supply of ready-mix concrete", amount: "PHP 2,500,000.00", hash: "0xc2dd...9f" },
    { id: "TX-0008", date: "2025-04-16", type: "Allotment", particulars: "2nd quarter budget release", amount: "PHP 15,000,000.00", hash: "0xda11...6b" },
    { id: "TX-0009", date: "2025-05-03", type: "Disbursement", particulars: "Riprap materials and boulder delivery", amount: "PHP 4,750,000.00", hash: "0x991e...f4" },
    { id: "TX-0010", date: "2025-05-19", type: "Obligation", particulars: "Labor cost for concrete works", amount: "PHP 1,900,000.00", hash: "0xfe41...0b" },
    { id: "TX-0011", date: "2025-06-07", type: "Disbursement", particulars: "Payment for gravel and aggregates", amount: "PHP 1,650,000.00", hash: "0x3da4...be" },
    { id: "TX-0012", date: "2025-06-22", type: "Disbursement", particulars: "Equipment rental for backhoe and compactor", amount: "PHP 2,150,000.00", hash: "0x6fc1...0a" },
    { id: "TX-0013", date: "2025-07-03", type: "Obligation", particulars: "Procurement of cement and sand", amount: "PHP 2,600,000.00", hash: "0x2c54...e3" },
    { id: "TX-0014", date: "2025-07-24", type: "Disbursement", particulars: "Contractor billing #2 — partial accomplishment", amount: "PHP 5,500,000.00", hash: "0x84c9...91" },
    { id: "TX-0015", date: "2025-08-09", type: "Allotment", particulars: "3rd quarter fund release", amount: "PHP 10,000,000.00", hash: "0x7e5b...e4" },
    { id: "TX-0016", date: "2025-08-18", type: "Disbursement", particulars: "Payment for hauling of materials", amount: "PHP 950,000.00", hash: "0x99a1...14" },
    { id: "TX-0017", date: "2025-09-05", type: "Disbursement", particulars: "Perimeter fence construction", amount: "PHP 1,300,000.00", hash: "0xbb21...7f" },
    { id: "TX-0018", date: "2025-09-25", type: "Disbursement", particulars: "Drainage and spillway excavation", amount: "PHP 2,700,000.00", hash: "0xd44c...42" },
    { id: "TX-0019", date: "2025-10-11", type: "Obligation", particulars: "Administrative and inspection expenses", amount: "PHP 400,000.00", hash: "0xa63e...51" },
    { id: "TX-0020", date: "2025-10-29", type: "Disbursement", particulars: "Final concrete curing and demobilization", amount: "PHP 2,200,000.00", hash: "0xee7b...f2" },
  ];

  return (
    <SectionCard title="Transactions (Blockchain Ledger)">
      <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
        All project transactions are time-stamped and hashed for verification in the SANDATA blockchain ledger.
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400, // adjust as needed
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          overflowY: "auto",
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f7f7f7" }}>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Particulars</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tx.map((t) => (
              <TableRow key={t.id} hover>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>{t.particulars}</TableCell>
                <TableCell>{t.amount}</TableCell>
                <TableCell>
                  <code>{t.hash}</code>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SectionCard>
  );
}
