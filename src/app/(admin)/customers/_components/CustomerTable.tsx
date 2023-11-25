'use client';

import { ChangeEvent, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Customer, CustomerStatusEnum } from '@/interfaces/customer';

// import UserAction from './UserAction';

interface Props {
  customers: Customer[];
}

const columns: Array<{ id: keyof Customer; label: string; minWidth: number }> = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'taxNumber', label: 'Tax number', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'phoneNumber', label: 'Phone number', minWidth: 150 },
  { id: 'address', label: 'Address', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 150 },
  { id: 'note', label: 'Note', minWidth: 150 },
];

export default function CustomersPage({ customers }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent) => {
    setRowsPerPage((event.target as unknown as { value: number }).value);
    setPage(0);
  };

  if (!customers.length) return <p>No customer data</p>;

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 50 }}>No.</TableCell>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ width: 100 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align="right" style={{ width: 50 }}>
                    {index + 1}
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];

                    return (
                      <TableCell className="truncate" key={column.id} style={{ maxWidth: 300 }}>
                        {value || '--'}
                      </TableCell>
                    );
                  })}
                  <TableCell style={{ width: 100 }}>
                    {/* <UserAction user={row.user} customers={customers} roles={roles} /> */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[10, 25, 100]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ alignSelf: 'end', overflow: 'visible' }}
      />
    </>
  );
}
