'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { User, UserStatusEnum } from '@/interfaces/user';

interface Props {
  getUsers: () => Promise<User[]>;
}

interface Row {
  id: string;
  fullName: string;
  username: string;
  role: string | undefined;
  status: string;
  customer: string | undefined;
  note: string | undefined;
}

const columns: Array<{ id: keyof Row; label: string; minWidth: number }> = [
  { id: 'fullName', label: 'Name', minWidth: 170 },
  { id: 'username', label: 'Username', minWidth: 150 },
  { id: 'role', label: 'Role', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 150 },
  { id: 'customer', label: 'Customer', minWidth: 150 },
  { id: 'note', label: 'Note', minWidth: 150 },
];

export default function UserTableBody({ getUsers }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Row[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then((users) => {
      setRows(
        users.map((user) => ({
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          role: user.role?.name,
          status: UserStatusEnum[user.status],
          customer: user.customer?.name,
          note: user.note,
        }))
      );
      setLoading(false);
    });
  }, [getUsers]);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent) => {
    setRowsPerPage((event.target as unknown as { value: number }).value);
    setPage(0);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!rows.length) return <p>No user data</p>;

  return (
    <Box sx={{ width: '100%', flexShrink: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 50 }}>No.</TableCell>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align="right" style={{ width: 50 }}>
                    {index + 1}
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];

                    return <TableCell key={column.id}>{value || '--'}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ overflow: 'visible' }}
      />
    </Box>
  );
}
